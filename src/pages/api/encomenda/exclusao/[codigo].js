//Rota para API excluir encomenda
//Recebe o codigo da encomenda

import { exclusao } from "../../../../services/encomenda"

export  default async function handler(req, res) {
    try {
        const encomenda = await exclusao(req.query.codigo)
        res.status(200).json(encomenda)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}