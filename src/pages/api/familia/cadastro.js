//Rota para API cadastrar familia
//Recebe um Body com os dados da familia

import { cadastro } from "../../../services/familia"

export  default async function handler(req, res) {
    try {
        const familia = await cadastro(req.body)
        res.status(201).json(familia)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}