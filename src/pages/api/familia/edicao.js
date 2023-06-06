//Rota para API alterar familia
//Recebe um Body com os dados da familia

import { edicao } from "../../../services/familia"

export  default async function handler(req, res) {
    try {
        const familia = await edicao(req.body)
        res.status(201).json(familia)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}