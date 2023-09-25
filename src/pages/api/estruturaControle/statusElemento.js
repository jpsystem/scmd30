//Rota para API pesquisar desenho e retorno o titulo
//Recebe um Body com nome do desenho

import { statusElemento } from "../../../services/estruturaControle"

export  default async function handler(req, res) {
    try {
        const statusItem = await statusElemento(req.body)
        res.status(200).json(statusItem)
    } catch (err) {
        res.status(400).json("Retornou um erro inesperado! => " + err.message)
    }
}