import { qtdItens} from "../../../services/etcs.js"

export  default async function handler(req, res) {
    try {
        const itens = await qtdItens(req.body)
        res.status(200).json(itens)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}