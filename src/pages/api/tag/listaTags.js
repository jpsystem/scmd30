import { listaTags} from "../../../services/tag.js"

export  default async function handler(req, res) {
    try {
        const tags = await listaTags(req.body)
        res.status(200).json(tags)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}