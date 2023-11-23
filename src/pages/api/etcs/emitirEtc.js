//Rota para API efetuar a emissão da ETC
//Recebe um Body com os dados da etc

import { emitirEtc } from "../../../services/etcs"

export  default async function handler(req, res) {
    try {
        const retEmitir = await emitirEtc(req.body)
        if(retEmitir === "Emissão realizada com sucesso!"){
            res.status(201).json(retEmitir)
        }else
        {
            res.status(400).json(retEmitir)
        }
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}