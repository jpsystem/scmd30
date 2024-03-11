import { enviarEmail } from "../../../services/enviaEmail"

export  default async function handler(req, res) {
    try {
        const ret = await enviarEmail(req.body)
        if(ret){
          res.status(201).json({menssage: "E-mail enviado com sucesso!"})
        }else{
          res.status(400).json({menssage: "Não foi possivel enviar o email"})
        }
        res.status(201).json(user)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}