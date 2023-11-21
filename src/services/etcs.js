import {query} from "/db.js"

import {dbCC} from "/db.js"

//Função para retornar Etcs da Encomenda
export async function gridETCs(body) {
  let etcs = [];
  try {    
      etcs = await query({
        query: "SELECT "
		+ "A.id, A.codETC,	A.revisao as Revisao, "
		+ "B.familia as Familia, A.idFamilia as IdFamilia, "
		+ "DATE_FORMAT(A.data_em,'%Y-%m-%d') as DataEmi, "
		+ "A.responsavel as Responsavel, "
		+ "CASE WHEN A.emitida = 1 THEN 'Emitida' ELSE 'Pendente' END AS Status, "
		+ "A.local as Local, A.observacoes as Observacoes, A.prazo as Prazo, "
		+ "A.guiadoc as GRD "
        + "FROM "
		+ "tb_guiaetc A LEFT JOIN tb_familias B ON A.idFamilia = B.id "
        + "WHERE "
		+ "A.idEncomenda = ? "
        + "ORDER BY A.codETC " ,
        values: [body.idEncomenda]
      });

      if (!etcs){
          throw new Error('Não tem ETCs cadastradas!')
      }  
  } catch (error) {
      throw Error(error.message);
  }
  return etcs
}

//Função para retornar os itens da GRD
export async function itensGRD(body) {
    let itens = [];
    try {    
        itens = await query({
            query: "SELECT "
            + "item as Item, desenho as NumeroTMSA, desclifor as NumeroCliente, "
            + "titulo as Titulo, revdes as Rev "
            + "FROM itens_rd "
            + "WHERE  enc = ? and guia = ? "
            + "ORDER BY item ",
            values: [body.codEncomenda, body.GRD]
        });
  
        if (!itens){
            throw new Error('Não tem itens cadastrados!')
        }  
    } catch (error) {
        throw Error(error.message);
    }
    return itens
  }

//Função para retornar os itens da ETC
export async function itensETC(body) {
    let itens = [];
    let filtro = "";
    try {    
        itens = await query({
            query: "SELECT B.id as idItem, A.codETC as Etc,	B.item as Item, "
            + "B.elemento as Elemento,	B.desenho as Desenho, B.revdes as Revisao, "
            + "B.grpos as GrPos, C.tag as TAG,	B.esp as Descricao,	B.codigo as Codigo, "
            + "B.qtd as Qtd, B.unid as Unid, B.peso_unit as PesoUnit, B.peso_total as PesoTot, "
            + "B.fdrtet as CWP, (false) as selItem "
            + "FROM tb_guiaetc as A LEFT JOIN tb_itensetc as B	ON A.id = B.idEtc "
            + "LEFT JOIN tb_tags as C ON B.idTag = C.id "
            + "WHERE A.id = ?	ORDER BY B.item ",
            values: [body.idEtc]
        });
  
        if (!itens){
            throw new Error('Não tem itens cadastrados na ETC!')
        }  
    } catch (error) {
        throw Error(error.message);
    }
    return itens
  }

  //Função para retornar os itens Pendentes para incluir na ETC
  export async function itensPendentesETC(body) {
    let itens = [];
    let filtro = "";
    if(body.idTag > 0 ){
        filtro = `and idTag = ${body.idTag}`
    }
    try {
        itens = await query({
            query: "SELECT A.id as ElementoID, A.elemento as Elemento, A.esp as Descricao, A.desenho as Desenho,  "
            + "A.revdes as Rev, A.grpos as GrPos, A.qtd as Qtd, A.unid as Unid, A.peso_unit as PesoUnit, A.peso_total as PesoTot, "
            + "A.fdrtet as CWP, A.codigo as Codigo, A.idTag as TagID, A.idFamilia as FamiliaID, "
            + "A.etc as ETC, B.familia as Familia, C.tag as Tag "
            + "FROM tb_estcontrole A LEFT JOIN tb_familias B ON A.idFamilia = B.id "
            + "LEFT JOIN tb_tags C ON A.idTag = C.id "
            + "WHERE A.idEncomenda = ? and idFamilia = ? and (etc is null or etc = 0) and (etcSelecionada is null or etcSelecionada = 0)"
            + filtro,
            values: [body.idEncomenda, body.idFamilia]
        });
        if (!itens){
            throw new Error('Não tem elementos pedentes para a ETC!')
        }       
    } catch (error) {
        throw Error(error.message);
    }
    return itens
  }
  
  export async function selTags(body) {
    let tags = [];
    try {    
        tags = await query({

            query:  "  SELECT "
                    + "     a.idTag as value, "
                    + "     b.tag as label "
                    + "FROM "
                    + "     tb_estcontrole a LEFT JOIN tb_tags b   ON a.idTag = b.id  "
                    + "WHERE a.idEncomenda = ? and a.idFamilia = ? and (etc is null or etc = 0) "
                    + "GROUP BY a.idTag, b.tag "
                    + "ORDER BY label",
            values: [body.idEncomenda, body.idFamilia]
        });
  
        if (!tags){
            throw new Error('Não tem tags cadastradas!')
        }  
    } catch (error) {
        throw Error(error.message);
    }
    return tags
}

//Função para incluir uma nova etc na encomenda
export async function cadastro(body){
    console.log("BODY: ",body)
    let novoNumero = 0;
    let aviso = ""
    let resposta = {menssagem: "", etc: 0};
    let myQuery = "";
    let valores = [];
    let abortar = false;

    try 
    {
        await dbCC.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED")
        //Inicia a transação
        await dbCC.beginTransaction();
        //Busca o novo numero para a ETC
        myQuery = "SELECT (IFNULL(MAX(codETC),0) + 1) as novoNumero FROM tb_guiaetc WHERE idEncomenda = ?"
        const [rows,] = await dbCC.execute( myQuery,[body.idEncomenda]);
        novoNumero = rows[0].novoNumero

        if(novoNumero === null || novoNumero === 0){
            abortar = true;
        }
        else
        {
            //Efetua o Insert na tabela tb_guiaetc
            myQuery = "INSERT INTO tb_guiaetc ( "
                    + " idEncomenda, codEtc, idFamilia, observacoes, emitida, "
                    + " revisao, data_em, responsavel, prazo, local, enc) "
                    + " Values (?,?,?,?,?,?,?,?,?,?,?)",
            valores = [
            body.idEncomenda,
            novoNumero, 
            body.idFamilia,
            body.observacoes,
            0,
            0,
            body.data_em,
            body.responsavel,
            body.prazo,
            body.local,
            body.enc
            ];
            await dbCC.execute( myQuery,valores); 
            aviso = "Registro incluido com sucesso!";
        }

        if(!abortar)
        {
            await dbCC.commit();
        }
        else
        {
            dbCC.rollback();
            aviso = "Inclusão do registro cancelada!";
            novoNumero = 0;
        }

    } catch (error) {
        dbCC.rollback();
        aviso = "Erro ao incluir registro! Erro: " + error.message
        novoNumero = 0;
    }
    resposta.menssagem = aviso;
    resposta.etc = novoNumero;  
    return resposta
}

//Função excluir uma ETC
//RECEBE OS PARAMETROS idETC, idEncomenda e codigoETC
//Primeiro passo excluir o numero da ETC de todos os elementos da Estrutura de Controle conforme o numero da Encomenda
//Segundo excluir todos os itens da ETC comforme id da ETC
//Terceiro excluir a ETC conforme id
export async function exclusao(body){
    let myQuery = ""
    let abortar = false;
    let aviso = ""
    let valores = [];
    let resposta = {menssagem: "", etc: 0};

    try {
        await dbCC.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED")
        //Inicia a transação
        await dbCC.beginTransaction();

        //PASSO 1 apagar o numero da ETC dos elementos da Estrutura de controle
        myQuery = "UPDATE tb_estcontrole SET "
                + "etc = null, "
                + "etc_data = null, "
                + "etc_rev = null, "
                + "etcSelecionada = null "
                + "WHERE (etc = ? or etcSelecionada = ?) and idEncomenda = ? "
        valores = [
            body.codEtc,
            body.codEtc,
            body.idEncomenda
        ]
        const resultado1 = await dbCC.execute( myQuery,valores);
        //PASSO 2 excluir todos os itens da ETC conforme id da ETC
        myQuery = "DELETE FROM tb_itensetc WHERE idEtc = ? "
        valores = [
            body.idEtc
        ]
        const resultado2 = await dbCC.execute( myQuery,valores);
        await dbCC.execute( myQuery,valores);

        //PASSO 3 Excluir a ETC conforme id
        myQuery = "DELETE FROM tb_guiaetc WHERE id = ? "
        valores = [
            body.idEtc
        ]
        const resultado3 = await dbCC.execute( myQuery,valores);
  
        if(resultado3[0].affectedRows === 1)
        {
            resposta.etc = 1;
            aviso = "ETC excluida com sucesso!";
        }
        else{
            resposta.etc = 0;
            aviso = "ETC não encontrada!";
        }
        
        if(!abortar)
        {
            await dbCC.commit();
        }

    } catch (error) {
        dbCC.rollback();
        resposta.etc = -1;
        aviso = "Erro ao excluir a ETC! Erro: " + error.message       
    }

    resposta.menssagem = aviso;
    return resposta
}

//Função para incluir os itens da ETC
//RECEBE ARRAY COM OS ITENS QUE SERAO INCLUIDOS
//Primeiro verifica se já tem algum item e retorna a posição final
//Segundo fazer um loop para incluir todos os itens na tabela tb_itensetc
//Terceiro atualizar o campo etcSelecionada da tabela tb_estcontrole com o numero da etc atual
export async function incluirItens(body){
    let itemInicial = 0;
    let aviso = "";
    let resposta = {menssagem: "", itens:0};
    let myQuery = "";
    let valores = [];
    let abortar = false;
    let pIdEtc = body[0].IdEtc;
    let pCodEtc = body[0].CodEtc;
    let qtdItens = 0;

    try {
        await dbCC.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED")
        //Inicia a transação
        await dbCC.beginTransaction();
        //PASSO 1 - Buscar a sequencia dos itens
        myQuery = "SELECT (ifnull(MAX(item),0) + 1) as Item FROM tb_itensetc WHERE idEtc = ?"
        const [rows,] = await dbCC.execute( myQuery,[pIdEtc]);
        itemInicial = rows[0].Item;
        if(itemInicial === null || itemInicial === 0){
            abortar = true;
        }
        else
        {
            for(let i = 0; i < body.length; i++){
                const linha = body[i];
                //Passo 2 Efetuar laço para inclusão dos Itens da ETC
                myQuery = "INSERT INTO tb_itensetc "
                    + "(idEtc, item, elemento, desenho, revdes, grpos, esp, qtd, "
                    + "unid, peso_unit, peso_total, idTag, codigo, fdrtet) "
                    + "Values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                valores = [
                    pIdEtc,
                    itemInicial,
                    linha.Elemento,
                    linha.Desenho,
                    linha.Rev,
                    linha.GrPos,
                    linha.Descricao,
                    linha.Qtd,
                    linha.Unid,
                    linha.PesoUnit,
                    linha.PesoTot,
                    linha.TagID,
                    linha.Codigo,
                    linha.CWP
                ];
                await dbCC.execute( myQuery,valores);
                //Passo 3 atualizar o campo etcSelecionada com o numero da Etc
                myQuery = "UPDATE tb_estcontrole SET etcSelecionada = ? "
                    + "WHERE id = ? "
                valores = [
                    pCodEtc,
                    linha.ElementoID
                ];
                await dbCC.execute( myQuery,valores);
                //Incrementa os contadores
                itemInicial ++;
                qtdItens ++;
            }
            if( qtdItens > 0){
                aviso = "Itens incluidos com sucesso!";
            }else{
                aviso = "Não foi possivel incluir os itens";
                abortar = true
            }

            if(!abortar)
            {
                await dbCC.commit();
            }
            else
            {
                dbCC.rollback();
                aviso = "Inclusão dos itens cancelada!";
                qtdItens = 0;
            }            
        }
    } catch (error) {
        dbCC.rollback();
        aviso = "Erro ao incluir os itens! Erro: " + error.message
        qtdItens = 0; 
    }

    resposta.menssagem = aviso;
    resposta.itens = qtdItens;  
    return resposta
}

//Função Para excluir os Itens da ETC
//RECEBE ARRAY COM OS ITENS QUE SERÃO EXCLUIDOS
//incia um laço para ler todos os itens do array recebido no body
//Primeiro limpar os campos etc, etc_data, etc_rev e etcSelecionada do elemento especifico do item na tabela tb_estcontrole
//Segundo excluir o item da tabela tb_itensetc
export async function excluirItens(body){
    let aviso = "";
    let resposta = {menssagem: "", itens:0};
    let myQuery = "";
    let valores = [];
    let abortar = false;
    let qtdItens = 0;
    try {
        await dbCC.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED")
        //Inicia a transação
        await dbCC.beginTransaction();
        //Incia um laço para ler todos os itens do Array
        for(let i = 0; i < body.length; i++) {
            const linha = body[i];
            //Passo 1 limpa os campos etc, etc_data, etc_rev e etcSelecionada do elemento especifico
            myQuery = "UPDATE tb_estcontrole SET "
                + "etc = null, "
                + "etc_data = null, "
                + "etc_rev = null, "
                + "etcSelecionada = null "
                + "WHERE elemento = ? and idEncomenda= ? ";
            valores = [
                linha.Elemento,
                linha.ID_Encomenda
            ];
            await dbCC.execute( myQuery,valores);
            //Passo 2 excluir o item da tabela tb_itensetc
            myQuery = "DELETE FROM tb_itensetc WHERE id = ? ";
            valores = [
                linha.ID_ItemETC
            ];
            await dbCC.execute( myQuery,valores);
            qtdItens ++;
        }
        if( qtdItens > 0){
            aviso = "Itens excluidos com sucesso!";
        }else{
            aviso = "Não foi possivel excluir os itens";
            abortar = true
        }  
        if(!abortar)
        {
            await dbCC.commit();
        }
        else
        {
            dbCC.rollback();
            aviso = "Exclusão dos itens cancelada!";
            qtdItens = 0;
        }              

    } catch (error) {
        dbCC.rollback();
        aviso = "Erro ao excluir os itens! Erro: " + error.message
        qtdItens = 0;        
    }

    resposta.menssagem = aviso;
    resposta.itens = qtdItens;  
    return resposta

}

//função para editar uma ETC
//Recebe o objeto Body com os dados da ETC
//Atualiza os dados na Guia ETC sem alterar dados dos elementos
//nem revisão da ETC esse processo só será feito na emisão da ETC
export async function edicao(body){
    let retorno = 0
    //observacoes, responsavel, prazo, local
    try {
        const etc = await query({
            query: "UPDATE tb_guiaetc SET "
            +"observacoes = ?, responsavel = ?, prazo = ?, local = ? , data_em = ? "
            +"WHERE id = ? ",
            values:[
                body.observacoes,
                body.responsavel,
                body.prazo,
                body.local,
                body.data_em,
                body.IDguiaETC
            ]
        });
        if(etc.affectedRows > 0){
            retorno = etc.affectedRows;
        }
        else{
            throw new Error('Não foi possivel alterar a ETC!')
        } 
    } catch (error) {
        throw Error(error.message);
    }
    return retorno;    

}