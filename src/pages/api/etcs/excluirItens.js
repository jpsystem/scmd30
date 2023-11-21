//Rota para API excluir Itens da ETC
//Recebe um Body com um array de itens

import { excluirItens } from "../../../services/etcs"

export  default async function handler(req, res) {
    try {
        const resposta = await excluirItens(req.body)
        if(resposta.itens > 0){
            res.status(201).json(resposta)
        }else {
            res.status(400).json(resposta)
        }
    } catch (err) {  
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}