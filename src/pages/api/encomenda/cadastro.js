//Rota para API cadastrar encomenda
//Recebe um Body com os dados da Encomenda

import { cadastro } from "../../../services/encomenda"

export  default async function handler(req, res) {
    try {
        const resposta = await cadastro(req.body)
        if(resposta.encomendaID > 0){
            res.status(201).json(resposta)
        }else {
            res.status(400).json(resposta.menssagem)
        }
    } catch (err) {  
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}