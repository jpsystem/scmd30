import { listaFamilias} from "../../../services/familia.js"

export  default async function handler(req, res) {
    try {
        const encs = await listaFamilias()
        res.status(200).json(encs)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}