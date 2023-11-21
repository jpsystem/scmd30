//Rota para API alterar elemento
//Recebe um Body com os dados do elemento

import { exclusao } from "../../../services/etcs"

export  default async function handler(req, res) {
    try {
        const etcExcluida = await exclusao(req.body)
        //res.status(200).json(etc)

        if(etcExcluida.etc === 1){
          res.status(200).json(etcExcluida.menssagem)
        }
        else{
            res.status(400).json(etcExcluida.menssagem)
        }
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}