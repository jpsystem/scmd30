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
            + "A.revdes as Rev, A.grpos as GrPos, A.qtd as Qtd, A.peso_total as PesoTot, "
            + "A.fdrtet as CWP, A.idTag as TagID, A.idFamilia as FamiliaID, "
            + "A.etc as ETC, B.familia as Familia, C.tag as Tag "
            + "FROM tb_estcontrole A LEFT JOIN tb_familias B ON A.idFamilia = B.id "
            + "LEFT JOIN tb_tags C ON A.idTag = C.id "
            + "WHERE A.idEncomenda = ? and idFamilia = ? and (etc is null or etc = 0) "
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

