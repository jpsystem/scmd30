import {query} from "/db.js"

export async function encomendas() {
    let encs = [];
    try {    
        encs = await query({
            query: "Select * From tb_encomenda",
            values: ""
        });
        //token = createToken(usuario[0])
        if (!encs) throw new Error('Não tem encomendas cadastradas!') 
    } catch (error) {
        
        throw new Error("Não foi possivel pesquisar as encomendas!");
    }

    return encs
}

export async function listaEncomendas() {
    let encs = [];
    try {    
        encs = await query({
            query: "SELECT id, codEncomenda, razao, "
                    + " concat(codEncomenda, ' - ', razao ) as encomenda "
                    + " FROM tb_encomenda",
            values: ""
        });
        //token = createToken(usuario[0])
        if (!encs){
            throw new Error('Não tem encomendas cadastradas!')
        }  
    } catch (error) {
        
        throw new Error("Não foi possivel pesquisar as encomendas!");
    }
    return encs
}
