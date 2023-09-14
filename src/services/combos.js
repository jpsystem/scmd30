import {query} from "/db.js"

export async function familias(idEncomenda) {
    let fams = [];
    try {    
        fams = await query({

            query:  "  SELECT "
                    + "     id as value, "
                    + "     familia as label "
                    + "FROM "
                    + " tb_familias"
                    + " WHERE idEncomenda = ?"
                    + " ORDER BY familia",
            values: [idEncomenda]
        });
  
        if (!fams){
            throw new Error('Não tem familias cadastradas!')
        }  
    } catch (error) {
        throw Error(error.message);
    }
    return fams
}

export async function tags(idEncomenda) {
    let tags = [];
    try {    
        tags = await query({

            query:  "  SELECT "
                    + "     id as value, "
                    + "     tag as label "
                    + "FROM "
                    + " tb_tags"
                    + " WHERE idEncomenda = ?"
                    + " ORDER BY tag",
            values: [idEncomenda]
        });
  
        if (!tags){
            throw new Error('Não tem tags cadastradas!')
        }  
    } catch (error) {
        throw Error(error.message);
    }
    return tags
}