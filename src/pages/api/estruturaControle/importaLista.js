//Rota para API importacao de elementos
//Recebe um Body com os dados dos elementos

import { importaLista } from "../../../services/importaLista"

export  default async function handler(req, res) {
    try {
        const ret = await importaLista(req.body)
        res.status(201).json(ret)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}
