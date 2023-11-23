//Rota para API efetuar a emissão da ETC
//Recebe um Body com os dados da etc

import { destravarEtc } from "../../../services/etcs"

export  default async function handler(req, res) {
    try {
        const retExecucao = await destravarEtc(req.body)
        if(retExecucao === "ETC destravada com sucesso!"){
            res.status(201).json(retExecucao)
        }else
        {
            res.status(400).json(retExecucao)
        }
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}