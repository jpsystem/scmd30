//Autor: João Magalhães
//Formulario para os itens da ETC
import styles from "./formETC.module.css"

export default function FormEtcItens({campos}){
  return(
    <>
      <div className={styles.form}>
      <div className={styles.grupoR}>
          {/* Itens da GRD */}
          <div className={styles.grupoC}>
            <label className={styles.label}>
                Lista dos elementos
            </label>
            <table className={styles.tabela}>
              <thead>
                <tr>
                  <th width="5%">Item</th>
                  <th width="5%">Elem.</th>
                  <th width="10%">Desenho</th>
                  <th width="5%">Rev.</th>
                  <th  width="5%">Gr/Pos</th>
                  <th  width="10%">Tag</th>
                  <th width="10%">Descrição</th>
                  <th width="10%">Codigo.</th>
                  <th width="5%">Qtd</th>
                  <th width="5%">Unid.</th>
                  <th  width="10%">PsUnit.</th>
                  <th  width="10%">PsTotal</th>
                  <th  width="5%">CWE</th>
                  <th  width="5%">E</th>                 
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width="5%">01</td>
                  <td width="5%">5081</td>
                  <td width="10%">XXX-0000-00</td>
                  <td width="5%">X</td>
                  <td  width="5%">X</td>
                  <td  width="10%">XXX-XX</td>
                  <td width="10%">XXX XXXXX XX XXXX</td>
                  <td width="10%">000</td>
                  <td width="5%">00</td>
                  <td width="5%">XX</td>
                  <td  width="10%">00.00</td>
                  <td  width="10%">000.00</td>
                  <td  width="5%">X00-XX000-00</td>
                  <td  width="5%">X</td>
                </tr>
                <tr>
                  <td width="5%">02</td>
                  <td width="5%">5082</td>
                  <td width="10%">XXX-0000-00</td>
                  <td width="5%">X</td>
                  <td  width="5%">X</td>
                  <td  width="10%">XXX-XX</td>
                  <td width="10%">XXX XXXXX XX XXXX</td>
                  <td width="10%">000</td>
                  <td width="5%">00</td>
                  <td width="5%">XX</td>
                  <td  width="10%">00.00</td>
                  <td  width="10%">000.00</td>
                  <td  width="5%">X00-XX000-00</td>
                  <td  width="5%">X</td>
                </tr>
                <tr>
                  <td width="5%">03</td>
                  <td width="5%">5083</td>
                  <td width="10%">XXX-0000-00</td>
                  <td width="5%">X</td>
                  <td  width="5%">X</td>
                  <td  width="10%">XXX-XX</td>
                  <td width="10%">XXX XXXXX XX XXXX</td>
                  <td width="10%">000</td>
                  <td width="5%">00</td>
                  <td width="5%">XX</td>
                  <td  width="10%">00.00</td>
                  <td  width="10%">000.00</td>
                  <td  width="5%">X00-XX000-00</td>
                  <td  width="5%">X</td>
                </tr>
                <tr>
                  <td width="5%">04</td>
                  <td width="5%">5084</td>
                  <td width="10%">XXX-0000-00</td>
                  <td width="5%">X</td>
                  <td  width="5%">X</td>
                  <td  width="10%">XXX-XX</td>
                  <td width="10%">XXX XXXXX XX XXXX</td>
                  <td width="10%">000</td>
                  <td width="5%">00</td>
                  <td width="5%">XX</td>
                  <td  width="10%">00.00</td>
                  <td  width="10%">000.00</td>
                  <td  width="5%">X00-XX000-00</td>
                  <td  width="5%">X</td>
                </tr>
                <tr>
                  <td width="5%">05</td>
                  <td width="5%">5085</td>
                  <td width="10%">XXX-0000-00</td>
                  <td width="5%">X</td>
                  <td  width="5%">X</td>
                  <td  width="10%">XXX-XX</td>
                  <td width="10%">XXX XXXXX XX XXXX</td>
                  <td width="10%">000</td>
                  <td width="5%">00</td>
                  <td width="5%">XX</td>
                  <td  width="10%">00.00</td>
                  <td  width="10%">000.00</td>
                  <td  width="5%">X00-XX000-00</td>
                  <td  width="5%">X</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={styles.grupoR}>
        {/* Peso total */}
        <label className={styles.label}>
            Peso Total
        </label>
        <input
          style={{width: "100px"}}
          type="text"
          id="PesoTot"
          className={styles.input}
        />
      </div>      
    </>
  )
}