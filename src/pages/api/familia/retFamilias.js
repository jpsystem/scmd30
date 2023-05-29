//Rota para API retornar Familias
//Recebe um Body com idEncomenda

import { retFamilias} from "../../../services/familia"

export  default async function handler(req, res) {
    try {
        const fams = await retFamilias(req.body)
        res.status(200).json(fams)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}