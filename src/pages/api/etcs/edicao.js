//Rota para API alterar a etc
//Recebe um Body com os dados da etc

import { edicao } from "../../../services/etcs"

export  default async function handler(req, res) {
    try {
        const etc = await edicao(req.body)
        res.status(201).json(etc)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}