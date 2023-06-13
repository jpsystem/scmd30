//Rota para API cadastrar encomenda
//Recebe um Body com os dados da Encomenda

import { cadastro } from "../../../services/encomenda"

export  default async function handler(req, res) {
    try {
        const enc = await cadastro(req.body)
        res.status(201).json(enc)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}