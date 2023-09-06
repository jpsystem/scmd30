//Rota para API excluir o tag
//Recebe o codigo do tag

import { exclusao } from "../../../../services/tag"

export  default async function handler(req, res) {
    try {
        const tag = await exclusao(req.query.codigo)
        res.status(200).json(tag)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}