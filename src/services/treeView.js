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

    const primeiroNivel = temp[0].filter(item => item.Pai === 0)
    const pegaPrimeirosFilhos = primeiroNivel.map(buildTreeView)
    
    pegaPrimeirosFilhos.forEach( linha => dado.push(linha))

    function buildTreeView(item) {
        const linha = {
            Elemento: item.Elemento,
            Descricao: item.Descricao,
            ETC: item.ETC,
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
            Filhos: [

            ],
        }

        const filhos = temp[0].filter(filho => filho.Pai === item.Elemento)
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

            query:  "CALL TreeView(?)",
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



