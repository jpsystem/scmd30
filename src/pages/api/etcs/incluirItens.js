//Rota para API cadastrar elementos
//Recebe um Body com os dados do elemento

import { incluirItens } from "../../../services/etcs"

export  default async function handler(req, res) {
    try {
        const resposta = await incluirItens(req.body)
        if(resposta.itens > 0){
            res.status(201).json(resposta)
        }else {
            res.status(400).json(resposta)
        }
    } catch (err) {  
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}