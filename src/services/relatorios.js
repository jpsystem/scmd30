import {query} from "/db.js"

export async function relPadrao(body) {
  let temp = [];
  let filtros = " WHERE upper(trim(ec.tipo)) in('C','M','F','I') "
  let ordenacao = " ";
  try {
    //Passo 1 Filtros
    if(body.idEncomenda > 0){
      filtros += "and ec.idEncomenda = " + body.idEncomenda
    }
    if(body.idTag > 0){
      filtros += " and ec.idTag = " + body.idTag
    }
    if(body.idFamilia > 0){
      filtros += " and ec.idFamilia = " + body.idFamilia
    }
    if(body.pai > 0){
      filtros += " and ec.pai = " + body.pai
    }
    if(body.etc){
      filtros += " and (ec.etc = null or ec.etc = 0) "
    }


    //Passo 2 Ordenação
    if(body.ordem = "Ordem1"){
      ordenacao = " Order By ec.Elemento "
    }
    if(body.ordem = "Ordem2"){
      ordenacao = " Order By t.tag, ec.elemento "
    }
    if(body.ordem = "Ordem3"){
      ordenacao = " Order By f.familia, ec.elemento "
    }
    if(body.ordem = "Ordem4"){
      ordenacao = " Order By ec.pai, ec.elemento "
    }

    temp = await retDados(filtros, ordenacao);
    if (!temp)
    {
      throw new Error('Não tem elementos cadastrados!')
    }  
  } catch (error) {
        
        throw Error(error.message);

  }
  return temp;
}

//Funcao que executa a consulta no banco
async function retDados(filtros, ordenacao) {
  let ecs = [];
  try {    
      ecs = await query({
          query: " SELECT "
          + " t.tag as Tag, "
          + " f.familia as Familia, "  
          + " ec.pai as Pai, "
          + " ec.elemento as Elem, "
          + " ec.tipo as Tipo, "
          + " ec.qtd as QTD, "
          + " ec.unid as Unid, "
          + " ec.esp as Especificacao, "
          + " ec.desenho as DesenhoTMSA, "
          + " ec.fdrtet as DesenhoCWP, "
          + " ec.grpos as GrPos, "
          + " ec.peso_total as PesoTotal, "
          + " ec.etc as ETC, "
          + " ec.etc_data as DataETC "
          + " FROM "
          + " tb_estcontrole as ec left join tb_tags as t "
          + " on ec.idTag = t.id and ec.idEncomenda = t.idEncomenda "
          + " left join tb_familias f "
          + " on ec.idFamilia = f.id and ec.idEncomenda = f.idEncomenda "
          + filtros
          + ordenacao,
          values: []
      });
      if (!ecs){
          throw new Error('Não tem elementos cadastrados!')
      }  
  } catch (error) {   
      throw Error(error.message);
  }
  return ecs
}

