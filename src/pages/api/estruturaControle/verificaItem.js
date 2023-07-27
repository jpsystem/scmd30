//Rota para API pesquisar desenho e retorno o titulo
//Recebe um Body com nome do desenho

import { verificaItem } from "../../../services/estruturaControle"

export  default async function handler(req, res) {
    try {
        const statusItem = await verificaItem(req.body)
        res.status(200).json(statusItem)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}