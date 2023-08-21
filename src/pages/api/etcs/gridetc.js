import { gridETCs} from "../../../services/etcs.js"

export  default async function handler(req, res) {
    try {
        const etcs = await gridETCs(req.body)
        res.status(200).json(etcs)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}