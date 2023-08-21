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