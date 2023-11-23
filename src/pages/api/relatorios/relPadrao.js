//Rota para API validar login
//Recebe um Body com login e senha

import { relPadrao } from "../../../services/relatorios"

export  default async function handler(req, res) {
    try {
        const rel = await relPadrao(req.body)
        res.status(200).json(rel)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}