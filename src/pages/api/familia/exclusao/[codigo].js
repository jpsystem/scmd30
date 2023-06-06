//Rota para API excluir a familia
//Recebe o codigo da familia

import { exclusao } from "../../../../services/familia"

export  default async function handler(req, res) {
    try {
        const familia = await exclusao(req.query.codigo)
        res.status(200).json(familia)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}