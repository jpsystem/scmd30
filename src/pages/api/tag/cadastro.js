//Rota para API cadastrar Tag
//Recebe um Body com os dados do Tag

import { cadastro } from "../../../services/tag"

export  default async function handler(req, res) {
    try {
        const tag = await cadastro(req.body)
        res.status(201).json(tag)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}