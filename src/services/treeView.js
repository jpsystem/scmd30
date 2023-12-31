import {query} from "/db.js"

export async function treeView(body) {

    let temp = [];
    try {    
        temp = await retDados(body.encomenda);
        if (!temp){
            throw new Error('Não tem elementos cadastrados!')
        }  
    } catch (error) {
        
        throw Error(error.message);

    }

    const tree = [];

    const dado = [];

    const primeiroNivel = temp.filter(item => item.Pai === 0)
    const pegaPrimeirosFilhos = primeiroNivel.map(buildTreeView)
    
    pegaPrimeirosFilhos.forEach( linha => dado.push(linha))

    function buildTreeView(item) {
        const linha = {
            Elemento: item.Elemento,
            Descricao: item.Descricao,
            ETC: item.ETC,
            Dt_Etc: item.Dt_Etc,
            Pai: item.Pai,
            id: item.id,
            Tipo: item.tipo,
            IdTag: item.idTag,
            Tag: item.tag,
            IdFamilia: item.idFamilia,
            Familia: item.familia,
            Qtd: item.qtd,
            Unid: item.unid,
            Peso_Unit: item.peso_unit,
            Peso_Total: item.peso_total,
            Desenho: item.desenho,
            GrPos: item.grpos,
            Codigo: item.codigo,
            Especificacao: item.esp,
            CodigoCWP: item.codigoCWP,
            Filhos: [

            ],
        }

        const filhos = temp.filter(filho => filho.Pai === item.Elemento)
        if(filhos.length > 0) {
            const subLinha = [];
            filhos.map(buildTreeView)
            .forEach(linha => subLinha.push(linha))
            linha.Filhos.push(subLinha)
        }

        return linha
    }
    
    tree.push(dado)

    return tree
    //return temp
}


async function retDados(encomenda) {
    let ecs = [];
    try {    
        ecs = await query({

            query: " SELECT "
            + " E.elemento as Elemento, "
            + " Trim(CONCAT(E.elemento, ' - ', E.esp)) as Descricao,   "  
            + " E.pai as Pai, "
            + " E.etc as ETC, "
            + " DATE_FORMAT(E.etc_data, '%d/%m/%Y') as Dt_Etc, "
            + " E.id, "
            + " E.tipo, "
            + " E.idTag, "
            + " E.idFamilia, "
            + " E.qtd, "
            + " E.unid, "
            + " E.peso_unit, "
            + " E.peso_total, "
            + " E.desenho, "
            + " E.grpos, "
            + " E.codigo, "
            + " Trim(E.esp) as esp, "
            + " F.familia, "
            + " T.tag, "
            + " Trim(E.fdrtet) as codigoCWP "
            + " FROM "
            + " tb_estcontrole E Left Join tb_familias F "
            + " ON E.idFamilia = F.id Left Join tb_tags T "
            + " ON E.idTag = T.id "
            + " WHERE  "
            + " E.idEncomenda= ? "
            + " Order By "
            + " E.elemento" ,
            values: [encomenda]
        });
  
        if (!ecs){
            throw new Error('Não tem elementos cadastrados!')
        }  
    } catch (error) {
        
        throw Error(error.message);

    }
    return ecs
}


