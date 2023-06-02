//Rota para API alterar usuário
//Recebe um Body com os dados do usuário

import { exclusao } from "../../../../services/user"

export  default async function handler(req, res) {
    try {
        const user = await exclusao(req.query.codigo)
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}