import {dbCC} from "/db.js"

export async function importaLista(){
  let resposta = ""
  let myQuery = ""


  await dbCC.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED")

  //Inicia a transação
  await dbCC.beginTransaction();
  console.log("Inicio da transação!")
  try {

    resposta = await cadastrar([900,"TESTE-10","00900"])
    resposta = await cadastrar([900,"TESTE-11","00900"])
    resposta = await cadastrar([900,"TESTE-12","00900"])
    resposta = await cadastrar([900,"TESTE-13","00900"])

    // myQuery = " Insert Into tb_tags (idEncomenda, tag, enc) VALUES(?,?,?)";
    // resposta = await dbCC.execute( myQuery,[900,"TESTE-3","00900"]);  
    // myQuery = " Insert Into tb_tags (idEncomenda, tag, enc) VALUES(?,?,?)";
    // resposta = await dbCC.execute( myQuery,[900,"TESTE-4","00900"]); 
    
    if(resposta){
      await dbCC.commit();
      resposta = "Importação concluida com sucesso!"
    }else{
      dbCC.rollback();
      resposta = "Importação cancelada! Erro: " + error.message
    }

  } catch (error) {
    dbCC.rollback();
    resposta = "Importação cancelada! Erro: " + error.message
    
  } finally {
    dbCC.close();
    dbCC.end();
    console.log("Finalizou a conexão")
  }
  return resposta;
}

async function cadastrar(valores){
  let resposta = false
  let myQuery = ""

  try {
    myQuery = " Insert Into tb_tags (idEncomenda, tag, enc) VALUES(?,?,?)";
    await dbCC.execute( myQuery,valores); 
    resposta = true
  } catch (error) {
    resposta = false
  }
 
  return resposta
}