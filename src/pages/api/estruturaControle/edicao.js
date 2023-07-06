//Rota para API alterar elemento
//Recebe um Body com os dados do elemento

import { edicao } from "../../../services/estruturaControle"

export  default async function handler(req, res) {
    try {
        const elemento = await edicao(req.body)
        res.status(201).json(elemento)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}