import {query} from "/db.js"

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
        
        throw new Error(error.message);
    }
    return ecs
}