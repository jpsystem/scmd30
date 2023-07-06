import {query} from "/db.js"

//Função para retornar os itens da Estrutura de Controle da Encomenda
export async function treeViewEC(body) {
    let ecs = [];
    try {    
        ecs = await query({

            query:  "CALL dados_TreeViewEC(?,?)",
            values: [body.encomenda, body.pai]
        });
  
        if (!ecs){
            throw new Error('Não tem elementos cadastrados!')
        }  
    } catch (error) {
        
        throw Error(error.message);

    }
    return ecs
}

//Regra para validar se a familia pode ser excluida
async function podeExcluir(codigo){
    let retorno = null;
    try {
        retorno = await query({
            query:  "CALL podeExcluir_Elemento(?)",
            values: [   
                        codigo,
                    ]
        });
    } catch (error) {
        throw Error(error.message);
    }
    return retorno[0][0].pPodeExcluir;
}



//Função para incluir um novo elemento na encomenda
export async function cadastro(body){
    let retorno = 0;
    try {
        const elemento = await query({
            query:  "CALL insert_EC(?,?,?,?,?,?,?,?,?,?,?,?,?)",
            values: [   
                        body.idEncomenda, 
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
                        body.codigo
                    ]
        });

        if (!elemento) throw new Error('Elemento não cadastrado')
        else{ 
            if (elemento === 0)
            {
                throw new Error('Erro, o elemento já está cadatrado!')
            }else{
                retorno = elemento;
            }
        }   
    } catch (error) {
        throw Error(error.message);
    }
    return retorno;
}

//Função para editar um elemento
export async function edicao(body){
    let retorno = 0;
    try {
        const elemento = await query({
            query:  "CALL update_EC(?,?,?,?,?,?,?,?,?,?,?,?,?) ",     
            values: [   
                body.id, 
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
                body.codigo
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