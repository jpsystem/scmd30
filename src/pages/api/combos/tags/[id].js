//Rota para API retornar lista das tags para o combo
//Recebe o codigo da encomenda

import { tags } from "../../../../services/combos"

export  default async function handler(req, res) {
    try {
        const opTags = await tags(req.query.id)
        res.status(200).json(opTags)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}