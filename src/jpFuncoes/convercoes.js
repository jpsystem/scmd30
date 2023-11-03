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
  }
}