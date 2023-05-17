import {query} from "/db.js"

export async function listaFamilias() {
    let fams = [];
    try {    
        fams = await query({

            query:  "  SELECT "
                    + "     A.id, "
                    + "     A.idEncomenda, "
                    + "     B.codEncomenda, "
                    + "     A.familia, "
                    + "     A.espcificacao, "
                    + "     A.cod_erp "
                    + "FROM "
                    + " scmd3.tb_familias A Left Join scmd3.tb_encomenda B "
                    + " ON A.idEncomenda = B.id",
            values: ""
        });
  
        if (!fams){
            throw new Error('Não tem familias cadastradas!')
        }  
    } catch (error) {
        
        throw new Error("Não foi possivel pesquisar as familias!");
    }
    return fams
}