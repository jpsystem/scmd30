//Rota para API alterar encomenda
//Recebe um Body com os dados da encomenda

import { edicao } from "../../../services/encomenda"

export  default async function handler(req, res) {
    try {
        const enc = await edicao(req.body)
        res.status(201).json(enc)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}