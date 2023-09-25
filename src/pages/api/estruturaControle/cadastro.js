//Rota para API cadastrar elementos
//Recebe um Body com os dados do elemento

import { cadastro } from "../../../services/estruturaControle"

export  default async function handler(req, res) {
    try {
        const resposta = await cadastro(req.body)
        if(resposta.elemento > 0){
            res.status(201).json(resposta)
        }else {
            res.status(400).json(resposta.menssagem)
        }
    } catch (err) {  
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}