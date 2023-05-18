import {query} from "/db.js"

export async function treeView(body) {

    let temp = [];
    try {    
        temp = await retDados(body.encomenda);
        if (!temp){
            throw new Error('Não tem elementos cadastrados!')
        }  
    } catch (error) {
        
        throw new Error(error.message);
    }

    const tree = [];

    const dado = [];

    const primeiroNivel = temp[0].filter(item => item.Pai === 0)
    const pegaPrimeirosFilhos = primeiroNivel.map(buildTreeView)
    console.log("PrimeirosFilhos",pegaPrimeirosFilhos)
    
    pegaPrimeirosFilhos.forEach( linha => dado.push(linha))

    function buildTreeView(item) {
        const linha = {
            Elemento: item.Elemento,
            Descricao: item.Descricao,
            ETC: item.ETC,
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
        
        throw new Error(error.message);
    }
    return ecs
}



