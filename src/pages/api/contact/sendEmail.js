import { enviarEmail } from "../../../services/enviaEmail"

export  default async function handler(req, res) {
  console.log("BODY - ",req.body.para)

  try {
    const ret = await enviarEmail(req.body)
    res.status(200).json(ret)
  } catch (err) {
      res.status(400).json("Retornou um erro! => " + err.message)
  }

}