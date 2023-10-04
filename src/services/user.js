import jwt from "jsonwebtoken";

import {query} from "/db.js"

import {dbCC} from "/db.js"


const SECRET = process.env.JWT_SECRET


//Cria um tokem com os dados do login
function createToken(user) {
    return jwt.sign(
    {
        login:         user.login,
        senha:         user.senha,
        id:            user.id,
        nome:          user.nome,
        administrador: user.administrador
    }, 
    SECRET)

}

//Ler os dados do usuario gravados no token
function readToken(token) {
    try {
        return jwt.verify(token, SECRET)

    } catch (error) {
        throw new Error('Token inválido')
    }
}

//Retorna os dados do usuario contidos no token
export function verifica(token) {
    return readToken(token)
}

//Verifica se já existe um usuario cadastro 
//com mesmo eMail ou Login
async function achou(pEmail, pLogin){
    let retorno = false;
    try {
        const usuario = await query({
            query:  "SELECT count(*) as codigo FROM tb_usuarios WHERE "
            + "UCASE(TRIM(login)) = UCASE(TRIM(?)) OR  "
            + "UCASE(TRIM(eMail)) = UCASE(TRIM(?))",
            values: [   
                pLogin,
                pEmail
            ]
        });

        if(usuario[0].codigo > 0){
            retorno = true;
        }else{
            retorno = false;
        }

    } catch (error) {
        throw Error(error.message);
    }

    return retorno;

}

//Verifica se ao alterar os campos Email ou Login 
//vai coencidir com outro usuario já cadastrado
async function podeAlterar(pEmail, pLogin, pId){
    let retorno = false;
    try {
        const usuario = await query({
            query:  "SELECT count(*) as codigo FROM tb_usuarios WHERE "
            + "( UCASE(TRIM(login)) = UCASE(TRIM(?)) OR  "
            + "UCASE(TRIM(eMail)) = UCASE(TRIM(?)) ) "
            + "AND id != ? ",
            values: [   
                pLogin,
                pEmail,
                pId
            ]
        });
        if(usuario[0].codigo === 0){
            retorno = true;
        }else{
            retorno = false;
        }

    } catch (error) {
        throw Error(error.message);
    }
    return retorno;

}

//Valida o usuário durante o login se estiver
//autorizado re torna um token criptografado
export async function login(body) {
    let token = [];
    try {    
        const usuario = await query({
            query:  "SELECT "
                    +"id, "
                    +"login, "
                    +"senha, "
                    +"nome, "
                    +"administrador "
                    +"FROM tb_usuarios "
                    +"WHERE UCASE(login) = UCASE(?)",
            values: [body.login],
        });
        //token = createToken(usuario[0])
        //token = usuario[0]
        if (!usuario) throw new Error('Usuário não cadastrado')
        else{ 
            if (usuario[0].senha !== body.senha)
            {
                throw new Error('Senha incorreta!')
            }else
            {
                token = [{dadosUser: usuario[0]}, {token: createToken(usuario[0])} ]
            }
        }   
    } catch (error) {
        
        throw Error(error.message);
    }

    return token
}

//Retorna a lista de usuários cadastrados
export async function lerUsuarios(){
    let tb_usuarios = [{}];
    try {
        tb_usuarios = await query({
            query: "SELECT id as 'key', id, login, nome, eMail, cargo, senha, administrador as admin FROM tb_usuarios",
            values: [],
        });
        if (!tb_usuarios) throw new Error('Tabela vasia..')       
    } catch (error) {
        throw Error(error.message);
    }
    return tb_usuarios;
}

//grava um novo usuário na tabela do BD
export async function cadastro(body){
    let novoUsuarioID = 0;
    let aviso = ""
    let resposta = {menssagem: "", usuarioID: 0};
    let myQuery = "";
    let valores = [];
    
    try {
        const verifica = await achou(body.eMail, body.login);

        if(verifica){
            aviso = "Já existe um usuario cadastro com mesmo eMail ou login!";
            novoUsuarioID = 0;
        }else{
            await dbCC.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED")
            //Inicia a transação
            await dbCC.beginTransaction();

            let admin = (body.administrador ? 1: 0);
             
            myQuery = "INSERT INTO tb_usuarios "
                + " (login, nome, eMail, cargo, senha, administrador) "
                + " Values (?,?,?,?,?,?)" ;
            valores = [   
                body.login, 
                body.nome,
                body.eMail,
                body.cargo,
                body.senha,
                admin
            ];
            await dbCC.execute( myQuery,valores); 
            aviso = "Registro incluido com sucesso!";
            const [retID,] = await dbCC.execute("SELECT LAST_INSERT_ID() as novoID")
            novoUsuarioID = retID[0].novoID
            aviso = "Registro incluido com sucesso!";
    
            await dbCC.commit();
        }        
        
    } catch (error) {
        dbCC.rollback();
        aviso = "Erro ao incluir registro! Erro: " + error.message
        novoUsuarioID = 0;
    }
    resposta.menssagem = aviso;
    resposta.usuarioID = novoUsuarioID;
    
    return resposta;

}

//Função para alterar os dados do usuário
export async function edicao(body){
    let retorno = 0;
    try {
        const valida = await podeAlterar(body.eMail, body.login, body.id);
        if(valida){
            let admin = (body.administrador ? 1: 0);
            const usuario = await query({
                query:  "UPDATE tb_usuarios SET "
                + "login = ?, "
                + "nome = ?,"
                + "eMail = ?,"
                + "cargo = ?,"
                + "senha = ?,"
                + "administrador = ? "
                + "WHERE id = ? " ,
                values: [    
                            body.login, 
                            body.nome,
                            body.eMail,
                            body.cargo,
                            body.senha,
                            admin,
                            body.id
                        ]
            });
            if(usuario.affectedRows > 0){
                retorno = usuario.affectedRows;
            }
            else{
                throw new Error('Não foi possivel alterar o usuário')
            }
        }else{
            throw new Error('Esse usuário não pode ser alterado!')
        }  
    } catch (error) {     
        throw Error(error.message);
    }

    return retorno;
}

//Função para excluir o usuario
export async function exclusao(codigo){
    let retorno = 0;
    try {
        const usuario = await query({
            query:  "DELETE FROM tb_usuarios WHERE id = ?",
            values: [   
                        codigo
                    ]
        });
        if(usuario.affectedRows > 0){
            retorno = usuario.affectedRows;
        }
        else{
            throw new Error('Não foi possivel excluir o usuário')
        }
    } catch (error) {
        throw Error(error.message);
    }
    return retorno;
}

//Função para retornar os dados do usuário para
//prencher os dados do perfil
export async function buscaUsuario(body) {
    let user = [];
    try {    
        user = await query({
            query:  " SELECT " 
	                +"  id as Id, "
                    +"  login as Login, "
                    +"  nome as Nome, "
                    +"  senha as Senha, "
                    +"  administrador as Administrador " 
                    +" FROM "
                    +"  tb_usuarios "
                    +" WHERE "
                    +"  login=? and senha=? ",
            values: [body.login, body.senha]
        });
  
        if (!user){
            throw new Error('Esse usuário não está cadastrado')
        }  
    } catch (error) {
        throw Error(error.message);
    }
    return user
}