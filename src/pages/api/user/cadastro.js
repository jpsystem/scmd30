//Rota para API cadastrar usuário
//Recebe um Body com os dados do usuário

import { cadastro } from "../../../services/user"

export  default async function handler(req, res) {
    try {
        const user = await cadastro(req.body)
        res.status(201).json(user)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}