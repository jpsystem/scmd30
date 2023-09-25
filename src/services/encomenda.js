import {query} from "/db.js"

import {dbCC} from "/db.js"

//Função para verificar se existe link entre a tabela tb_encomenda
// e as tabelas tb_estcontrole, tb_familias e tb_tags.
// retorna FALSE se hover link e TRUE se não tiver links
export async function verificaSemLinks(codigo){
    let retorno = false;
    try {
        const ec = await query({
            query: "SELECT "
            +"(A.Qtde + B.Qtde + C.Qtde) As Qtde "
            +"FROM "
            +"(Select 1 as myKey, Count(*) as Qtde From tb_estcontrole "
            +"where idEncomenda = ?) A LEFT JOIN "
            +"(Select 1 as myKey, Count(*) as Qtde From tb_familias "
            +"where idEncomenda = ?) B ON A.myKey = B.myKey LEFT JOIN "
            +"(Select 1 as myKey, Count(*) as Qtde From tb_tags "
            +"where idEncomenda = ?) C ON A.myKey = c.myKey ",
            values: [   
                        codigo,
                        codigo,
                        codigo,
                    ]
        });
        if(ec[0].Qtde > 0){
            retorno = false;
        }else{ 
            retorno = true;
        }
    } catch (error) {
        throw Error(error.message);
    }
    return retorno;
}

//Função que retorna todos os dados da tabela tb_encomenda
//através da VIEW vew_encomendas
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

//Função que retorna os dados de uma encomenda conforme
// o ID informado no parametro da URL
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

//Função que retornar lista de encomendas para
//selecionar no combo
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
    let novaEncomendaID = 0;
    let aviso = ""
    let resposta = {menssagem: "", encomendaID: 0};
    let myQuery = "";
    let valores = [];
    let abortar = false;

    try 
    {
        await dbCC.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED")
        //Inicia a transação
        await dbCC.beginTransaction();
        //Verifica se já existe uma encomenda com o mesmo código
        myQuery = "SELECT Count(*) as Qtd FROM tb_encomenda WHERE codEncomenda = ? "
        const [rows,] = await dbCC.execute( myQuery,[body.codEncomenda]);
        if(rows[0].Qtd > 0){
            abortar = true;
            aviso = `Já existe uma encomenda cadastrada com o código ${body.codEncomenda}!`
        }else{
            myQuery = "INSERT INTO tb_encomenda ( codEncomenda, cliente, razao, "
                + " endereco, local, contato_tec_cargo, ref_cliente, descricao, "
                + " dt_pedido, dt_entrega, atencao_etc, loc_set_etc, contato_cml, "
                + " contato_tec, coord_proj, coord_eng, separador_g, separador_cr, "
                + " separador_c, prazo_gra, prazo_cli, prazo_for, pasta_enc, "
                + " pasta_eng, pasta_guias )"
                + " Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)" ;
            valores = [ 
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
            ];
            await dbCC.execute( myQuery,valores); 
            aviso = "Registro incluido com sucesso!";
            const [retID,] = await dbCC.execute("SELECT LAST_INSERT_ID() as novoID")
            novaEncomendaID = retID[0].novoID
            aviso = "Registro incluido com sucesso!";

        }
        if(!abortar)
        {
            await dbCC.commit();
        }
        else
        {
            dbCC.rollback();
            novaEncomendaID = 0;
        }
    } catch (error) {
        dbCC.rollback();
        aviso = "Erro ao incluir registro! Erro: " + error.message
        novaEncomendaID = 0;
    }
    finally {
        dbCC.close();
        dbCC.end();
    }
   
    resposta.menssagem = aviso;
    resposta.encomendaID = novaEncomendaID;
    
    return resposta;
}

export async function edicao(body){
    let retorno = 0;
    try {
        const encomenda = await query({
            query: "UPDATE tb_encomenda SET "
            +"cliente = ?, razao = ?,	endereco = ?, local = ?, contato_tec_cargo = ?, "
            +"ref_cliente = ?, descricao = ?, dt_pedido = ?, dt_entrega = ?, atencao_etc = ?, "
            +"loc_set_etc = ?, contato_cml = ?, contato_tec = ?, coord_proj = ?, coord_eng = ?, "
            +"separador_g = ?, separador_cr = ?, separador_c = ?, prazo_gra = ?, prazo_cli = ?, "
            +"prazo_for = ?, pasta_enc = ?, pasta_eng = ?, pasta_guias = ? "
            +"WHERE id = ?",
            values: [   
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
                        body.pastaGuias,
                        body.id
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
    const teste = await verificaSemLinks(codigo);
    try {
        if(teste)
        {
            const encomenda = await query({
                query:  "DELETE FROM tb_encomenda WHERE id = ?",
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