import jwt from "jsonwebtoken";

import {query} from "/db.js"


const SECRET = process.env.JWT_SECRET

function createToken(user) {
    return jwt.sign(
    {
        login:  user.login,
        senha:  user.senha,
        id:     user.id,
        nome:   user.nome,
    }, 
    SECRET, 
    {
        expiresIn: 300 // equivale a 5 minutos (60*5)
    })
}

function readToken(token) {
    try {
        return jwt.verify(token, SECRET)

    } catch (error) {
        throw new Error('Token inválido')
    }
}

export function verifica(token) {
    return readToken(token)
}

export async function login(body) {
    let token = [];
    try {    
        const usuario = await query({
            query: "Select id, login, senha, nome From tb_Usuarios where UCASE(login) = UCASE(?)",
            values: [body.login],
        });
        //token = createToken(usuario[0])
        token = usuario[0]
        if (!usuario) throw new Error('Usuário não cadastrado')
        else{ 
            if (usuario[0].senha !== body.senha)
            {
                throw new Error('Senha incorreta!')
            }
        }   
    } catch (error) {
        
        throw Error(error.message);
    }

    return token
}

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

export async function cadastro(body){
    let retorno = 0;
    try {
        let admin = (body.administrador ? 1: 0);
        const usuario = await query({
            query:  "CALL insert_Usuario(?,?,?,?,?,?)",
            values: [   
                        body.login, 
                        body.nome,
                        body.eMail,
                        body.cargo,
                        body.senha,
                        admin
                    ]
        });

        if (!usuario) throw new Error('Usuário não cadastrado')
        else{ 
            if (usuario === 0)
            {
                throw new Error('Erro, o usuário já está cadatrado!')
            }else{
                retorno = usuario;
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
        let admin = (body.administrador ? 1: 0);
        const usuario = await query({
            query:  "CALL update_Usuario(?,?,?,?,?,?,?)",
            values: [   
                        body.id,
                        body.login, 
                        body.nome,
                        body.eMail,
                        body.cargo,
                        body.senha,
                        admin
                    ]
        });

        if (!usuario) throw new Error('Não foi possivel alterar usuário')
        else{ 
            if (usuario === 0)
            {
                throw new Error('Erro, login ou email já pertence a outro usuário!')
            }else{
                retorno = usuario;
            }
        }   
    } catch (error) {
        
        throw Error(error.message);

    }
    return retorno;
}

export async function exclusao(codigo){
    let retorno = 0;
    try {
        const usuario = await query({
            query:  "DELETE FROM tb_Usuarios WHERE id = ?",
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