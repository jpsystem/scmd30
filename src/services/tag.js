import {query} from "/db.js"

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

export async function listaTags(body) {
    let tags = [];
    try {    
        tags = await query({
            query:  "  SELECT "
                    + "  Id, "
                    + "  Tag, "
                    + "  IdEncomenda,"
                    + "  enc as CodEncomenda "
                    + "FROM "
                    + "  tb_tags "
                    + "WHERE "
                    + "  idEncomenda =? "
                    + "ORDER BY "
                    + "  Tag",
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
    let retorno = 0;
    try {
        const tag = await query({
            query:  "CALL insert_Tag(?,?,?)",
            values: [   
                        body.idEncomenda, 
                        body.tag,
                        body.enc
                    ]
        });

        if (!tag) throw new Error('Tag não cadastrado')
        else{ 
            if (tag === 0)
            {
                throw new Error('Erro, o tag já está cadatrado!')
            }else{
                retorno = tag;
            }
        }   
    } catch (error) {
        throw Error(error.message);
    }
    return retorno;
}

//Função para editar um tag
export async function edicao(body){
    let retorno = 0;
    try {
        const valida = await podeExcluir(body.id);
        if(valida){
            const tag = await query({
                query:  "UPDATE tb_Tags SET "
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
                query:  "DELETE FROM tb_Tags WHERE id = ?",
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
