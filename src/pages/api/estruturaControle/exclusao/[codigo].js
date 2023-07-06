//Rota para API excluir um elemento
//Recebe o id do elemento

import { exclusao } from "../../../../services/estruturaControle"

export  default async function handler(req, res) {
    try {
        const elemento = await exclusao(req.query.codigo)
        if(elemento === 1){
            res.status(200).json(elemento)
        }
        else{
            res.status(400).json(elemento)
        }
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}