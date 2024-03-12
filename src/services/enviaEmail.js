import { transporter } from "../../email";

export async function enviarEmail(body){
  console.log("to: ", body.para)
  console.log("subject: ", body.assunto)
  console.log("texto: ", body.corpoTexto)
  console.log("html: ", body.corpoHtml.substring(0, 10))
  let enviado = false;
  try {
     //{para:"", assunto:"", corpoTexto:"", corpoHtml:""}
    const info = await transporter.sendMail({
      from: '"SCMD 3.0 ✉" <jpsystem@gmail.com>',
      to: body.para, 
      subject: `☞ ${body.assunto} 🔯`, 
      text: body.corpoTexto, 
      html: body.corpoHtml 
    });
  
    //console.log("Message sent: %s", info.messageId);
    enviado = true;
  } catch (error) {
    throw Error(error.message);
    //enviado = false;
  }
  return enviado;
}