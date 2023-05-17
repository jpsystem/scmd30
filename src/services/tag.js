import {query} from "/db.js"

export async function listaTags() {
    let tags = [];
    try {    
        tags = await query({
            query:  "  SELECT "
                    + "     id, "
                    + "     idEncomenda, "
                    + "     codEncomenda,"
                    + "     enc, "
                    + "FROM "
                    + " scmd3.tb_tags",
            values: ""
        });
  
        if (!tags){
            throw new Error('Não tem tags cadastrados!')
        }  
    } catch (error) {
        
        throw new Error("Não foi possivel pesquisar os Tags!");
    }
    return tags
}