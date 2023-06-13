import {query} from "/db.js"

async function podeExcluir(codigo){
    let retorno = false;
    try {
        const familia = await query({
            query:  "SELECT * FROM tb_estcontrole WHERE idEncomenda = ?",
            values: [   
                        codigo,
                    ]
        });
        if(familia.affectedRows > 0){
            retorno = false;
        }else{
            retorno = true;
        }
    } catch (error) {
        throw new Error("Erro inesperado! " + error.description);
    }
    return retorno;
}

export async function encomendas() {
    let encs = [];
    try {    
        encs = await query({
            query: "Select * From vew_encomendas",
            values: ""
        });
        //token = createToken(usuario[0])
        if (!encs) throw new Error('Não tem encomendas cadastradas!') 
    } catch (error) {
        
        throw new Error("Não foi possivel pesquisar as encomendas!");
    }

    return encs
}

export async function encomenda(codigo) {
    let encs = [];
    try {    
        encs = await query({
            query: "Select * From vew_encomendas Where id = ?",
            values: [codigo]
        });
        //token = createToken(usuario[0])
        if (!encs) throw new Error('Encomenda não encontrada') 
    } catch (error) {
        
        throw new Error("Não foi possivel pesquisar a encomenda!");
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

export async function cadastro(body){
    let retorno = 0;
    try {
        const encomenda = await query({
            query:  "CALL insert_Encomenda(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            values: [ 
                    body.codEncomenda,
                    body.cliente,
                    body.razao,
                    body.endereco,
                    body.localObra,
                    body.localSetor,
                    body.ref_cliente,
                    body.descricao,
                    body.dt_pedido,
                    body.dt_entrega,
                    body.contatoETC,
                    body.deptoETC,
                    body.contato_cml,
                    body.contato_tec,
                    body.coord_proj,
                    body.coord_eng,
                    body.sepaTMSA,
                    body.sepaCRet,
                    body.sepaCEmi,
                    body.prazoTMSA,
                    body.prazoCli,
                    body.prazoFor,
                    body.pastaDoc,
                    body.pastaDes,
                    body.pastaGuias
                ]
        });

        if (!encomenda) throw new Error('Encomenda não foi cadastrada!')
        else{ 
            if (encomenda === 0)
            {
                throw new Error('Erro, a encomenda já está cadatrada!')
            }else{
                retorno = encomenda;
            }
        }   
    } catch (error) {
        throw new Error("Erro inesperado! " + error.description);
    }
    return retorno;
}


export async function edicao(body){
    let retorno = 0;

    return retorno;
}

export async function exclusao(codigo){
    let retorno = 0;
    
    return retorno;
}