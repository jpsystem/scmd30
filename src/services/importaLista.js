import {dbCC} from "/db.js"


//Função para importar os elementos da Lista recebidos
//no parametro BADY utilizando uma tranzação no Banco de dados
//para garantir a integridade dos dados só COMMITando se todos os registros
//forem incluidos com sucesso senão executa um ROLLBACK
export async function importaLista(body){
  let novoElementoPai = 0;
  let novoElementoFilho = 0;
  let resposta = "TESTE";



  let abortar = false;

  //Inclui o elemento pai para o desenho
  //e guardo o numero do elemento na variavel
  //novoElementoPai para cadastrar os filhos  
  try {

    await dbCC.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED")
    //Inicia a transação
    await dbCC.beginTransaction();
    console.log("Inicio da transação!")
    let mutiplica = body.pai.multLista;
    if(body.pai.status === 0)
    {
      let paiEsp = body.pai.desenho + " - " + body.pai.titulo;
      novoElementoPai = await cadastro(
        {
          idEncomenda: body.pai.idEncomenda, 
          idTag: body.pai.idTag, 
          pai: body.pai.elePai,
          desenho: body.pai.desenho,
          grpos: "",
          idFamilia: null,
          esp: paiEsp, //body.pai.titulo,
          qtd: 1,
          unid: "",
          peso_unit: body.pai.pesoTot,
          peso_total: body.pai.pesoTot,
          tipo: "",
          codigo: "",
          cwp: ""           
        }
      )
      //Se não gravou o novo elemento pai aborta a trasação
      if(novoElementoPai === 0){
        abortar = true;
      }
      else
      {
        //Depois de gravar o PAI
        //Grava todos os filhos
        for(let i = 0; i < body.filhos.length; i++){
          const ele = body.filhos[i];
          if(ele.StatusItem === 0)
          {
            novoElementoFilho = await cadastro(
              {
                idEncomenda: body.pai.idEncomenda, 
                idTag: body.pai.idTag, 
                pai: novoElementoPai,
                desenho: ele.Desenho,
                grpos: (ele.Grupo + ele.Posicao),
                idFamilia: ele.IdFamilia,
                esp: ele.Descricao,
                qtd: (ele.Qtd * mutiplica),
                unid: ele.Unidade,
                peso_unit: ele.Peso,
                peso_total: (ele.PesoTot * mutiplica),
                tipo: ele.TipoEle,
                codigo: ele.Material,
                cwp: ele.CWP           
              }
            )
          }

          if(novoElementoFilho === 0){
            abortar = true;
            break;
          }
        }
      }
      if(!abortar)
      {
        await dbCC.commit();
        resposta = "Importação concluida com sucesso!"
      }
      else
      {
        dbCC.rollback();
        resposta = "Importação cancelada! --> " + novoElementoPai.toString();
      }
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


//Função para incluir um novo elemento na encomenda
async function cadastro(body){
  let resposta = 0;
  let myQuery = "";
  let valores = [];
  try 
  {
    //Busca o novo numero para o elemento
    myQuery = "SELECT (MAX(elemento) + 1) as novoNumero FROM tb_estcontrole WHERE idEncomenda = ?"
    const [rows,] = await dbCC.execute( myQuery,[body.idEncomenda]);
    console.log("ROWS", JSON.stringify(rows))
    console.log("NovoNumero", rows[0].novoNumero )
    //Efetua o Insert na tabela tb_estcontrole
    myQuery = "INSERT INTO tb_estcontrole (idEncomenda, elemento, idTag, pai, desenho, "
            + " grpos, idFamilia, esp, qtd, unid, peso_unit, peso_total, tipo, codigo, fdrtet )"
            + " Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    valores = [
      body.idEncomenda,
      rows[0].novoNumero, 
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
      body.codigo,
      body.cwp
    ];
    await dbCC.execute( myQuery,valores); 
    resposta = rows[0].novoNumero
  } catch (error) {
    resposta = 0
  }
 
  return resposta
}