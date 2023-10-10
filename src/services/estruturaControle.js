import {query} from "/db.js"

import {dbCC} from "/db.js"

//Função para retornar um objeto com 
//o status do elemento e um menssagem
//sendo possiveis retorno:
// status: 0, menssagem: "Erro na execução da função"
// status: 1  menssagem: "Pode excluir, o elemento não é do tipo Pai e não tem uma ETC associada!"
// status: 2  menssagem: "Não pode ser excluido, é um elemento PAI!"
// status: 3  menssagem: "Não pode ser excluido está associado a uma ETC!"
export async function statusElemento(body){
    let retorno = { status: 0, menssagem: ""};
    try {
        const EC = await query({
            query: "SELECT "
            +"elemento as pElemento, "
            +"idEncomenda as pIdEncomenda, "
            +"ifNull(ETC,0) as pETC "
            +"FROM tb_estcontrole "
            +"WHERE id = ?",
            values: [   
                        body.idElemento,
                    ]
        });
        console.log("RETORNO", EC[0])
        if(EC[0].pETC > 0) {
            retorno.status = 3;
            retorno.menssagem = "Não pode ser excluido, está associado a uma ETC!";
        }else{
            const PAI = await query({
                query: "SELECT "
                +"count(*) as filhos "
                +"FROM tb_estcontrole "
                +"WHERE idEncomenda = ? "
                +"AND pai = ?",
                values: [   
                            EC[0].pIdEncomenda,
                            EC[0].pElemento
                        ]
            })
            if(PAI[0].filhos > 0){
                retorno.status = 2;
                retorno.menssagem = "Não pode ser excluido, é um elemento PAI!";
            }else{
                retorno.status = 1;
                retorno.menssagem = "Pode excluir, o elemento não é do tipo Pai e não tem uma ETC associada!";               
            }
        } 
    } catch (error) {
        retorno.status = 0;
        retorno.menssagem = error.message;
    }
    return retorno;
}

//Regra para validar se o elemento pode ser excluido
async function podeExcluir(codigo){
    const body = {idElemento: codigo};

    const statusItem = await statusElemento(body);

    return statusItem.status;

}

//Função para incluir um novo elemento na encomenda
export async function cadastro(body){
    let novoElemento = 0;
    let aviso = ""
    let resposta = {menssagem: "", elemento: 0};
    let myQuery = "";
    let valores = [];
    let abortar = false;

    try 
    {

        await dbCC.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED")
        //Inicia a transação
        await dbCC.beginTransaction();
        //Busca o novo numero para o elemento
        myQuery = "SELECT (MAX(elemento) + 1) as novoNumero FROM tb_estcontrole WHERE idEncomenda = ?"
        const [rows,] = await dbCC.execute( myQuery,[body.idEncomenda]);
        novoElemento = rows[0].novoNumero

        if(novoElemento === null || novoElemento === 0){
            abortar = true;
        }
        else
        {
            //Efetua o Insert na tabela tb_estcontrole
            myQuery = "INSERT INTO tb_estcontrole (idEncomenda, elemento, idTag, pai, desenho, "
                    + " grpos, idFamilia, esp, qtd, unid, peso_unit, peso_total, tipo, codigo, fdrtet )"
                    + " Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            valores = [
            body.idEncomenda,
            novoElemento, 
            body.idTag,
            body.pai,
            body.desenho,
            body.grpos,
            body.idFamilia,
            body.esp,
            body.qtd,
            body.unid,
            body.peso_unit,
            body.peso_total,
            body.tipo,
            body.codigo,
            body.codigoCWP
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
            novoElemento = 0;
        }

    } catch (error) {
        dbCC.rollback();
        aviso = "Erro ao incluir registro! Erro: " + error.message
        novoElemento = 0;
    }


    resposta.menssagem = aviso;
    resposta.elemento = novoElemento;  
    return resposta

}


//Função para incluir o primeiro elemento da Encomenda
export async function primeiroCadastro(body){
    let novoElemento = 1;
    let descricao = "";
    let aviso = ""
    let resposta = {menssagem: "", elemento: 0};
    let myQuery = "";
    let valores = [];
    let abortar = false;

    try 
    {

        await dbCC.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED")
        //Inicia a transação
        await dbCC.beginTransaction();
        //Busca o novo numero para o elemento
        myQuery = "SELECT CONCAT(codEncomenda, ' - ' , cliente) as espec FROM tb_encomenda WHERE id = ?"
        const [rows,] = await dbCC.execute( myQuery,[body.idEncomenda]);
  
        descricao = rows[0].espec

        if(descricao === null){
            abortar = true;
        }
        else
        {
            //Efetua o Insert na tabela tb_estcontrole
            myQuery = "INSERT INTO tb_estcontrole (idEncomenda, elemento, pai, esp, qtd, unid, peso_unit, peso_total ) "
                    + " Values (?,?,?,?,?,?,?,?)";
            valores = [
                body.idEncomenda, 1, 0, descricao, 1, "CJ", 0, 0
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
            novoElemento = 0;
        }

    } catch (error) {
        console.log("ERROR", error)
        dbCC.rollback();
        aviso = "Erro ao incluir registro! Erro: " + error.message
        novoElemento = 0;
    }


    resposta.menssagem = aviso;
    resposta.elemento = novoElemento;  
    return resposta

}


//Função para editar um elemento
export async function edicao(body){
    let retorno = 0;

    try {
        const elemento = await query({
            query:  "UPDATE tb_estcontrole SET "
            + "idTag = ?, pai = ?, desenho = ?, "
            + "grpos = ?, idFamilia = ?, esp = ?, "
            + "qtd = ?, unid = ?, peso_unit = ?, "
            + "peso_total = ?,	tipo = ?, codigo = ?, "
            + "fdrtet = ? WHERE id = ? ",
            values: [    
                body.idTag,
                body.pai,
                body.desenho,
                body.grpos,
                body.idFamilia,
                body.esp,
                body.qtd,
                body.unid,
                body.peso_unit,
                body.peso_total,
                body.tipo,
                body.codigo,
                body.codigoCWP,
                body.id
            ]
        });

        if(elemento.affectedRows > 0){
            retorno = elemento.affectedRows;
        }
        else{
            throw new Error('Não foi possivel alterar o elemento')
        } 
    } catch (error) {
        throw Error(error.message);
    }
    return retorno;
}

//Função para excluir um elemento
export async function exclusao(codigo){
    let retorno = 0;
    try {
        retorno = await podeExcluir(codigo);
        if( retorno === 1){

            const elemento = await query({
                query:  "DELETE FROM tb_estcontrole WHERE id = ?",
                values: [   
                            codigo
                        ]
            });
            if(elemento.affectedRows > 0){
                retorno = elemento.affectedRows;
            }
            else{
                throw new Error('Não foi possivel excluir o elemento')
            }
        }
        else {
            if(retorno === 0){
                throw new Error("Erro ao pesquisar o elemento");
            }
            if(retorno === 2){
                throw new Error("Não pode excluir um elemento Pai");
            }
            if(retorno === 3){
                throw new Error("Não pode excluir elemento que tem ETC");
            }
        }
    } catch (error) {
        throw Error(error.message);
    }
    return retorno;
}

//Função para retornar o titulo do desenho
export async function retTitulo(body) {
    let tit = [];
    try {    
        tit = await query({
            query:  "SELECT TRIM(titulo) as titulo FROM desenhos WHERE desenho = ?",
            values: [body.desenho]
        });
  
        if (!tit){
            throw new Error('Esse desenho não está cadastrado.')
        }  
    } catch (error) {
        
        throw Error(error.message);

    }
    return tit
}

//Função para verificar se já existe item com mesmo desenho gropo/posicao
// Status de retorno
// 0 - No tem item como os mesmos dados
// 1 - Existe Item é não tem ETC
// 2 - Existe Item mais já tem ETC
export async function verificaItem(body) {
    let statusItem = -1;
    let menssagem = ""
    const retorno = {statusItem: statusItem, menssagem: menssagem}
    try {
        const resposta = await query({
            // query:  "CALL verificaItem(?, ?, ?)",
            query: "SELECT	count(*) as qtd, ifnull(max(etc),0) as etc "
            + "FROM tb_estcontrole "
            + "WHERE idEncomenda = ? and pai = ? and "
            + "ifnull(Desenho,'') = ifnull(?,'') and "
            + "ifnull(grpos,'')   = ifnull(?,'') and "
            + "ifnull(fdrtet,'')  = ifnull(?,'')",
            values: [
                body.idEncomenda, 
                body.pai,
                body.desenho, 
                body.grpos,
                body.codigoCWP
            ]
        })
        if(resposta[0].qtd === 0){
            statusItem = 0;
            menssagem = "Não tem item com os mesmos dados chave!"
        }
        else{
            if(resposta[0].etc > 0){
                statusItem = 2;
                menssagem = "Item cadastrado e travado na ETC!"
            }else{
                statusItem = 1;
                menssagem = "Item cadastrado mais sem ETC!"
            }
        }
    } catch (error) {
        throw Error(error.message);
    }
    retorno.statusItem = statusItem;
    retorno.menssagem = menssagem ;
    return retorno
}
    





