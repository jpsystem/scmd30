import {query} from "/db.js"

//Função para importar os elementos
//do arquivo de importação recebidos
//no parametro Body 
export async function importaDados(body){
    let novoElementoPai = 0;
    let novoElementoFilho = 0;
    let retorno = 0;
    console.log("BODY-IMPORTACAO",body)
    try {
        //Inclui o elemento pai para o desenho
        //e guardo o numero do elemento na variavel
        //novoElementoPai para cadastrar os filhos
        if(body.pai.status === 0){
            novoElementoPai = await cadastro({
                idEncomenda: body.pai.idEncomenda, 
                idTag: body.pai.idTag, 
                pai: body.pai.elePai,
                desenho: body.pai.desenho,
                grpos: "",
                idFamilia: null,
                esp: body.pai.titulo,
                qtd: 1,
                unid: "",
                peso_unit: body.pai.pesoTot,
                peso_total: body.pai.pesoTot,
                tipo: "",
                codigo: ""           
            })
            console.log("NovoPai",novoElementoPai[0][0].novoElemento)
        }
        //Faz um laço para ler todos os filhos
        //que foram passados para a função
        body.filhos.map(async (ele)=>{
            if(ele.StatusItem === 0){
                novoElementoFilho = await cadastro({
                    idEncomenda: body.pai.idEncomenda, 
                    idTag: body.pai.idTag, 
                    pai: novoElementoPai[0][0].novoElemento,
                    desenho: ele.Desenho,
                    grpos: (ele.Grupo + ele.Posicao),
                    idFamilia: ele.IdFamilia,
                    esp: ele.Descricao,
                    qtd: ele.Qtd,
                    unid: ele.Unidade,
                    peso_unit: ele.Peso,
                    peso_total: ele.PesoTot,
                    tipo: ele.TipoEle,
                    codigo: ele.Material           
                })
            }
            console.log("NovoFilho",novoElementoFilho[0][0].novoElemento)
        })
        
        retorno = 1;

        // if (!novoElementoFilho) throw new Error('Elemento não cadastrado')
        // else{ 
        //     if (novoElementoFilho === 0)
        //     {
        //         retorno = 0;
        //         throw new Error('Erro, o elemento já está cadatrado!')
        //     }else{
        //         retorno = 1;
        //     }
        // } 
    } catch (error) {
        console.log("ERRO",error)
        retorno = 0;
    }
    return retorno;
}

//Função para retornar o id do elemento pesquisando
//pelo idEncomenda mais o numero do Elemento se não
//encontro ou ocorreu um erro retorna 0
async function retIdElemento(pElemento, pEncomenda){
    let idEle = 0;
    try {    
        idEle = await query({
            query:"SELECT id FROM tb_estcontrole WHERE idEncomenda=? and elemento=?",
            values: [pEncomenda, pElemento]
        });
   
    } catch (error) {
        
        idEle = 0;

    }
    return idEle;
}

//Função para incluir um novo elemento na encomenda
async function cadastro(body){
    console.log("IMPORTACAO-CADASTRO", body)
    let retorno = 0;
    try {
        const elemento = await query({
            query:  "CALL insert_EC(?,?,?,?,?,?,?,?,?,?,?,?,?)",
            values: [   
                        body.idEncomenda, 
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
                        body.codigo
                    ]
        });
        console.log("Elemento", elemento[0][0].novoElemento)
        
        if (!elemento) throw new Error('Elemento não cadastrado')
        else{ 
            if (elemento === 0)
            {
                throw new Error('Erro, o elemento já está cadatrado!')
            }else{
                retorno = elemento;
            }
        }   
    } catch (error) {
        console.log("ERRO-Cadastro", error)
        throw Error(error.message);
    }
    return retorno;
}