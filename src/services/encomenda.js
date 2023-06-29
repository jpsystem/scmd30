import {query} from "/db.js"

async function podeExcluir(codigo){
    let retorno = false;
    try {
        const ec = await query({
            query:  "CALL encomendaEmUso(?)",
            values: [   
                        codigo,
                    ]
        });
        if(ec[0][0].Qtde > 0){
            retorno = false;
        }else{ 
            retorno = true;
        }
    } catch (error) {
        throw Error(error.message);
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
        
        throw Error(error.message);

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
        
        throw Error(error.message);

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
        
        throw Error(error.message);

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
        throw Error(error.message);
    }
    return retorno;
}

export async function edicao(body){
    let retorno = 0;
    try {
        const encomenda = await query({
            query:  "CALL update_Encomenda(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            values: [   
                        body.id,
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

        if (!encomenda) throw new Error('Não foi possivel alterar a encomenda')
        else{ 
            if (encomenda === 0)
            {
                throw new Error('Erro, não foi possivel alterar a encomenda')
            }else{
                retorno = encomenda;
            }
        }   
    } catch (error) {   
        throw Error(error.message);
    }
    return retorno;
}

export async function exclusao(codigo){
    let retorno = 0;
    const teste = await podeExcluir(codigo);
    try {
        if(teste)
        {
            const encomenda = await query({
                query:  "DELETE FROM tb_Encomenda WHERE id = ?",
                values: [   
                            codigo
                        ]
            });
            if(encomenda.affectedRows > 0){
                retorno = encomenda.affectedRows;       
            }
            else{
                throw new Error('Não foi possivel excluir a encomenda');
            }
        }
        else
        {
            throw new Error('Essa encomenda não pode ser excluida!');
        }
    } catch (error) {
        throw Error(error.message);
    }
    return retorno;   
}