import { transporter } from "../../email";

export async function enviarEmail(body){
  let enviado = false;
  try {
     //{para:"", assunto:"", corpoTexto:"", corpoHtml:""}
    const info = await transporter.sendMail({
      from: '"SCMD 3.0 ✉" <jpsystem@gmail.com>',
      to: body.para, 
      subject: `☞ ${body.assunto}`, 
      text: body.corpoTexto, 
      html: body.corpoHtml 
    });
  
    console.log("Message sent: %s", info.messageId);
    enviado = true;
  } catch (error) {
    enviado = false;
  }

  return enviado;
}