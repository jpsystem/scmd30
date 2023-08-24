import {query} from "/db.js"

//Função para retornar Etcs da Encomenda
export async function gridETCs(body) {
  let etcs = [];
  try {    
      etcs = await query({
          query:  "CALL GridETC(?)",
          values: [body.idEncomenda]
      });

      if (!etcs){
          throw new Error('Não tem ETCs cadastradas!')
      }  
  } catch (error) {
      throw Error(error.message);
  }
  return etcs
}

//Função para retornar os itens da GRD
export async function itensGRD(body) {
    let itens = [];
    try {    
        itens = await query({
            query:  "CALL ItensGRD(?,?)",
            values: [body.codEncomenda, body.GRD]
        });
  
        if (!itens){
            throw new Error('Não tem itens cadastrados!')
        }  
    } catch (error) {
        throw Error(error.message);
    }
    return itens
  }