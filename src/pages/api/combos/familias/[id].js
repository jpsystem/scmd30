//Rota para API retornar lista das familias para o combo
//Recebe o codigo da encomenda

import { familias } from "../../../../services/combos"

export  default async function handler(req, res) {
    try {
        const fams = await familias(req.query.id)
        res.status(200).json(fams)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}