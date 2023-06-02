//Rota para API alterar usuário
//Recebe um Body com os dados do usuário

import { edicao } from "../../../services/user"

export  default async function handler(req, res) {
    try {
        const user = await edicao(req.body)
        res.status(201).json(user)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}