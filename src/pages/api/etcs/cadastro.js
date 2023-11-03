//Rota para API cadastrar ETC
//Recebe um Body com os dados da etc

import { cadastro } from "../../../services/etcs"

export  default async function handler(req, res) {
    try {
        const resposta = await cadastro(req.body)
        if(resposta.etc > 0){
            res.status(201).json(resposta)
        }else {
            res.status(400).json(resposta.menssagem)
        }
    } catch (err) {  
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}