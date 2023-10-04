import {query} from "/db.js"

import {dbCC} from "/db.js"

//Regra para validar se o TAG pode ser excluido
async function podeExcluir(codigo){
    let retorno = false;
    try {
        const tag = await query({
            query:  "SELECT count(*) as qtd FROM tb_estcontrole WHERE idTag = ?",
            values: [   
                        codigo,
                    ]
        });
        if(tag[0].qtd > 0){
            retorno = false;
        }else{
            retorno = true;
        }
    } catch (error) {
        throw Error(error.message);
    }
    return retorno;
}

//Verifica se já existe um tag cadastro com esse nome na encomenda
async function achou(pEncomendaID, pTag){
    let retorno = false;
    try {
        const tag = await query({
            query:  "SELECT count(*) as codigo FROM tb_tags WHERE idEncomenda = ? and tag = ?",
            values: [   
                        pEncomendaID,
                        pTag
                    ]
        });
        if(tag[0].codigo > 0){
            retorno = true;
        }else{
            retorno = false;
        }

    } catch (error) {
        throw Error(error.message);
    }

    return retorno;

}

//Verifica se já existe um tag cadastro com esse nome no tag diferente
async function podeAlterar(pEncomendaID, pTag, pId){
    let retorno = false;

    try {
        const tag = await query({
            query:  "SELECT count(*) as codigo FROM tb_tags WHERE idEncomenda = ? and tag = ? and id != ?",
            values: [   
                        pEncomendaID,
                        pTag,
                        pId
                    ]
        });
        if(tag[0].codigo > 0){
            retorno = false;
        }else{
            retorno = true;
        }

    } catch (error) {
        throw Error(error.message);
    }

    return retorno;

}

//Função para retornar os itens dos Tags da Encomenda
export async function listaTags(body) {
    let tags = [];
    try {    
        tags = await query({
            query:  "  SELECT "
                    + "  id, "
                    + "  tag, "
                    + "  IdEncomenda,"
                    + "  enc as CodEncomenda "
                    + "FROM "
                    + "  tb_tags "
                    + "WHERE "
                    + "  idEncomenda =? "
                    + "ORDER BY "
                    + "  tag",
            values: [body.idEncomenda]
        });
  
        if (!tags){
            throw new Error('Não tem tags cadastrados!')
        }  
    } catch (error) {
        
        throw Error(error.message);

    }
    return tags
}

//Função para incluir um novo Tag na Encomenda
export async function cadastro(body){
    
    let novoTagID = 0;
    let aviso = ""
    let resposta = {menssagem: "", tagID: 0};
    let myQuery = "";
    let valores = [];

    try 
    {
        const verifica = await achou(body.idEncomenda, body.tag);
        if(verifica){
            aviso = "Já existe um tag cadastrado com mesmo nome!";
            novoTagID = 0;
        }else{
            await dbCC.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED")
            //Inicia a transação
            await dbCC.beginTransaction();
    
            myQuery = "INSERT INTO tb_tags "
                + " ( idEncomenda, tag, enc ) "
                + " Values (?,?,?)" ;
            valores = [ 
                body.idEncomenda, 
                body.tag,
                body.enc
            ];
            await dbCC.execute( myQuery,valores); 
            aviso = "Registro incluido com sucesso!";
            const [retID,] = await dbCC.execute("SELECT LAST_INSERT_ID() as novoID")
            novoTagID = retID[0].novoID
            aviso = "Registro incluido com sucesso!";
    
            await dbCC.commit();
        }
        
    } catch (error) {
        dbCC.rollback();
        aviso = "Erro ao incluir registro! Erro: " + error.message
        novoTagID = 0;
    }

    resposta.menssagem = aviso;
    resposta.tagID = novoTagID;
    
    return resposta;
}

//Função para editar um tag
export async function edicao(body){
    let retorno = 0;

    try {
        const valida = await podeAlterar(body.idEncomenda, body.tag, body.id);

        if(valida){
            const tag = await query({
                query:  "UPDATE tb_tags SET "
                        + "tag = ? "
                        + "WHERE id = ?",     
                values: [   
                            body.tag, 
                            body.id,
                        ]
            });

            if(tag.affectedRows > 0){
                retorno = tag.affectedRows;
            }
            else{
                throw new Error('Não foi possivel alterar o tag')
            } 
        }
        else {
            throw new Error('Esse tag não pode ser alterado!')
        }        

    } catch (error) {
        throw Error(error.message);
    }
    return retorno;
}

//Função para excluir um tag
export async function exclusao(codigo){
    let retorno = 0;
    try {
        const valida = await podeExcluir(codigo);
        if(valida){
            const tag = await query({
                query:  "DELETE FROM tb_tags WHERE id = ?",
                values: [   
                            codigo
                        ]
            });
            if(tag.affectedRows > 0){
                retorno = tag.affectedRows;
            }
            else{
                throw new Error('Não foi possivel excluir o tag')
            }
        }
        else {
            throw new Error('Esse tag não pode ser excluido!')
        }
    } catch (error) {
        throw Error(error.message);
    }
    return retorno;
}
