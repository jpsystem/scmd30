//Rota para API alterar familia
//Recebe um Body com os dados da familia

import { edicao } from "../../../services/tag"

export  default async function handler(req, res) {
    try {
        const tag = await edicao(req.body)
        res.status(201).json(tag)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}