//Rota para API retornar uma encomenda
//Recebe o id da encomenda

import { encomenda } from "../../../services/encomenda"

export  default async function handler(req, res) {
    try {
        const enc = await encomenda(req.query.codigo)
        res.status(200).json(enc)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}