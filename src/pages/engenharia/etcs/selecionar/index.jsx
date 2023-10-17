import myStyle from "./index.module.css"

export default function SelecionarItens({familiaID, encomendaID, setModalOpen}){

  return(
    <>
    <div className={myStyle.corpo}>
      <table className={myStyle.tabela}>
        <thead>
          <tr>
            <th width="5%">Sel.</th>
            <th width="5%">Elem.</th>
            <th width="15%">Descrição</th>
            <th width="15%">Desenho</th>
            <th  width="5%">Rev.</th>
            <th  width="10%">Gr/Pos</th>
            <th  width="5%">Qtd.</th>
            <th  width="10%">Peso Tot.</th>
            <th  width="15%">CWP</th>
            <th  width="15%">TAG</th>
          </tr>
        </thead>
        </table>
    </div>
    </>
  )
}