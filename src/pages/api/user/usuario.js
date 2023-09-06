//Rota para API validar login
//Recebe um Body com login e senha

import { buscaUsuario } from "../../../services/user"

export  default async function handler(req, res) {
    try {
        const user = await buscaUsuario(req.body)
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}