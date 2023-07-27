//Rota para API pesquisar desenho e retorno o titulo
//Recebe um Body com nome do desenho

import { retTitulo } from "../../../services/estruturaControle"

export  default async function handler(req, res) {
    try {
        const tit = await retTitulo(req.body)
        res.status(200).json(tit)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}
