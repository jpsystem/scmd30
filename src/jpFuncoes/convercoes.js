//Funções para converções gerais

export const JPConversoes = {
  strDate(dt) {
    if(!dt){
      dt = new Date()
    }
    // var hoje = new Date()
    const dateRet = dt.getFullYear() + "-" 
    + ("0" + (dt.getMonth()+1) ).slice(-2) + "-"
    + ("0" + dt.getDate()).slice(-2)
    return dateRet
  },
  geraChaveRel(texto) {
    const dt = new Date()

    let chave = texto + " " + dt.getFullYear();
    chave += ("0" + (dt.getMonth()+1) ).slice(-2) ;
    chave += ("0" + dt.getDate()).slice(-2);
    // chave += dt.getTime();
    chave += " " + ("0" + (dt.getHours()) ).slice(-2) ;
    chave += ("0" + (dt.getMinutes()) ).slice(-2);
    chave += ("0" + (dt.getSeconds()) ).slice(-2) ;

    return chave
  }

}