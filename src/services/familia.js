import {query} from "/db.js"

import {dbCC} from "/db.js"

//Regra para validar se a familia pode ser excluida
async function podeExcluir(codigo){
    let retorno = false;
    try {
        const familia = await query({
            query:  "SELECT count(*) as qtd FROM tb_estcontrole WHERE idFamilia = ?",
            values: [   
                        codigo,
                    ]
        });
        if(familia[0].qtd > 0){
            retorno = false;
        }else{
            retorno = true;
        }
    } catch (error) {
        throw Error(error.message);
    }
    return retorno;
}

//Verifica se já existe uma familia cadastrada com esse nome na encomenda
async function achou(pEncomendaID, pFamilia){
    let retorno = false;
    try {
        const familia = await query({
            query:  "SELECT count(*) as codigo FROM tb_familias WHERE idEncomenda = ? and familia = ?",
            values: [   
                        pEncomendaID,
                        pFamilia
                    ]
        });
        if(familia[0].codigo > 0){
            retorno = true;
        }else{
            retorno = false;
        }

    } catch (error) {
        throw Error(error.message);
    }

    return retorno;

}

//Verifica se já existe uma familia cadastrada com esse nome na familia diferente
async function podeAlterar(pEncomendaID, pFamilia, pId){
    let retorno = false;

    try {
        const familia = await query({
            query:  "SELECT count(*) as codigo FROM tb_familias WHERE idEncomenda = ? and familia = ? and id != ?",
            values: [   
                        pEncomendaID,
                        pFamilia,
                        pId
                    ]
        });
        if(familia[0].codigo > 0){
            retorno = false;
        }else{
            retorno = true;
        }

    } catch (error) {
        throw Error(error.message);
    }

    return retorno;

}

//Função para retornar os itens das Familias da Encomenda
export async function listaFamilias(body) {
    let fams = [];
    try {    
        fams = await query({

            query:  "  SELECT "
                    + "     A.id, "
                    + "     A.idEncomenda, "
                    + "     B.codEncomenda, "
                    + "     A.familia, "
                    + "     A.espcificacao As especificacao , "
                    + "     A.cod_erp As cod_Erp "
                    + "FROM "
                    + " tb_familias A Left Join tb_encomenda B "
                    + " ON A.idEncomenda = B.id"
                    + " WHERE idEncomenda = ?"
                    + " ORDER BY familia",
            values: [body.idEncomenda]
        });
  
        if (!fams){
            throw new Error('Não tem familias cadastradas!')
        }  
    } catch (error) {
        throw Error(error.message);
    }
    return fams
}

//Função para incluir uma nova Familia na Encomenda
export async function cadastro(body){
    let novaFamiliaID = 0;
    let aviso = ""
    let resposta = {menssagem: "", familiaID: 0};
    let myQuery = "";
    let valores = [];

    try 
    {
        const verifica = await achou(body.idEncomenda, body.familia);
        if(verifica){
            aviso = "Já existe uma familia cadastrada com mesmo nome!";
            novaFamiliaID = 0;
        }else{
            await dbCC.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED")
            //Inicia a transação
            await dbCC.beginTransaction();
    
            myQuery = "INSERT INTO tb_familias "
                + " (idEncomenda, familia, espcificacao, cod_erp, enc ) "
                + " Values (?,?,?,?,?)" ;
            valores = [ 
                body.idEncomenda, 
                body.familia,
                body.especificacao,
                body.cod_Erp,
                body.enc
            ];
            await dbCC.execute( myQuery,valores); 
            aviso = "Registro incluido com sucesso!";
            const [retID,] = await dbCC.execute("SELECT LAST_INSERT_ID() as novoID")
            novaFamiliaID = retID[0].novoID
            aviso = "Registro incluido com sucesso!";
    
            await dbCC.commit();
        }   
    } catch (error) {
        dbCC.rollback();
        aviso = "Erro ao incluir registro! Erro: " + error.message
        novaFamiliaID = 0;
    }
       
    resposta.menssagem = aviso;
    resposta.familiaID = novaFamiliaID;

    return resposta;    
}

//Função para editar uma familia
export async function edicao(body){
    let retorno = 0;
    try {
        const valida = await podeAlterar(body.idEncomenda, body.familia, body.id);

        if(valida){
            const familia = await query({
                query:  "UPDATE tb_familias SET "
                        + "familia = ?, espcificacao = ?, "
                        + "cod_erp = ? "
                        + "WHERE id = ?",     
                values: [   
                            body.familia,
                            body.especificacao,
                            body.cod_Erp, 
                            body.id,
                        ]
            });
            if(familia.affectedRows > 0){
                retorno = familia.affectedRows;
            }
            else{
                throw new Error('Não foi possivel alterar a familia')
            } 
        }
        else{
            throw new Error('Essa familia não pode ser alterada.')
        }
    } catch (error) {
        throw Error(error.message);
    }
    return retorno;
}

//Função para excluir uma familia
export async function exclusao(codigo){
    let retorno = 0;
    try {
        if(podeExcluir(codigo)){

            const familia = await query({
                query:  "DELETE FROM tb_familias WHERE id = ?",
                values: [   
                            codigo
                        ]
            });
            if(familia.affectedRows > 0){
                retorno = familia.affectedRows;
            }
            else{
                throw new Error('Não foi possivel excluir a familia')
            }
        }
        else {
            throw new Error('Essa familia não pode ser excluida!')
        }
    } catch (error) {
        throw Error(error.message);
    }
    return retorno;
}