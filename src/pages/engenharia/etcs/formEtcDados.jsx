//Autor: João Magalhães
//Formulario para os dados da ETC
import { useForm } from "react-hook-form";
import styles from "./formETC.module.css"
import { useContext, useEffect, useState } from "react";
import { PerfilContext } from "@/pages/contexts/perfilContext";
import useApiListas from "@/hooks/useApiListas";

export default function FormEtcDados({campos, tipo}){
  //Estanciar o HOOK UseForm
  const form = useForm({defaultValues: campos})
  const { register, handleSubmit, formState: {errors} } = form; 

  //Ler os dados da Encomenda Ativo do Contexto Atual
  const {encomendaAtiva} = useContext(PerfilContext) 

  //carregar o HOOKs UseApiListas para buscar as Familias
  const [carregarFamlias, familiasInfo] = useApiListas({
      url: `/api/combos/familias/${encomendaAtiva.idEncomenda}`,
  })

  //carregar o HOOKs UseApiListas para buscar os itens da GRD
  const [carregarItensGRD, itensInfo] = useApiListas({
    url: `/api/etcs/itensgrd`,
    requestOptions: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
          codEncomenda: encomendaAtiva.codEncomenda,
          GRD: campos.GRD          
      })
    }
  })  

  //Carregar a lista de Familias da encomenda
  //no load da Pagina.
  useEffect(()=>{
    carregarFamlias();
    carregarItensGRD();
  },[]) 

  

  //Variaveis de estado para controle das opções 
  //do combo de Familias
  const [opFamilia, setOpFamilia] = useState(campos.IdFamilia? campos.IdFamilia: 1);

  //Função para setar as variaveis de estados
  //quando selecionar uma Familia ou um TAG
  const Selecionar = e => {
    setOpFamilia(e.target.value)
  }

  return(
    <>
      <div className={styles.form}>
        {/* GRUPO 01 */}
        <div className={styles.grupoR}>
          <div className={styles.grupoR2}>
                {/* N.ETC */}
                <div className={styles.grupoC}>
                  <label className={styles.label}>
                      NºETC
                  </label>
                  <input
                    style={{width: "100px"}}
                    type="text"
                    id="codEtc"
                    className={styles.input}
                    {...register("codETC",{requered: true})}
                  />
                </div> 
                {/* Rev */}
                <div className={styles.grupoC}>
                  <label className={styles.label}>
                      Revisão
                  </label>
                  <input
                    style={{width: "100px"}}
                    type="text"
                    id="Revisao" 
                    className={styles.input}
                    {...register("Revisao",{requered: true})}
                  />
                </div> 
          </div>

          {/* Data Emissão */}
          <div className={styles.grupoC}>
              <label className={styles.label}>
                  Data da emissão
              </label>
              <input
                  style={{width: "350px"}}
                  type="date"
                  id="DataEmi" 
                  className={styles.input}
                  {...register("DataEmi")}
              />
          </div>
          {/* Responsavel */}
          <div className={styles.grupoC}>
            <label className={styles.label}>
                Responsável
            </label>
            <input
              style={{width: "450px"}}
              type="text"
              id="Responsavel" 
              className={styles.input}
              {...register("Responsavel",{requered: true})}
            />
          </div> 
          {/* Status */}
          <div className={styles.grupoR3}>
            <div className={styles.grupoC}>
              <label className={styles.label}>
                  STATUS
              </label>
              <input
                style={{width: "350px"}}
                type="text"
                id="Status" 
                className={styles.input}
                {...register("Status",{requered: true})}
              />
            </div>
          </div> 
        </div> 
        {/* GRUPO 02 */}
        <div className={styles.grupoR}>
          {/* Observações */}
          <div className={styles.grupoC}>
            <label className={styles.label}>
                Observações
            </label>
            <textarea
                id="Observacoes" 
                className={styles.text}
                {...register("Observacoes",{requered: true})}
            />
          </div>
        </div>  
        {/* GRUPO 03 */}
        <div className={styles.grupoR}>
          {/* Local de Entrega */}
          <div className={styles.grupoC}>
            <label className={styles.label}>
                Local de entrega.
            </label>
            <input
              style={{width: "450px"}}
              type="text"
              id="Local" 
              className={styles.input}
              {...register("Local",{requered: true})}
            />
          </div>
          {/* Prazo de entrega */}
          <div className={styles.grupoC}>
            <label className={styles.label}>
                Prazo de entrega.
            </label>
            <input
              style={{width: "450px"}}
              type="text"
              id="Prazo" 
              className={styles.input}
              {...register("Prazo",{requered: true})}
            />
          </div>
          {/* Familha */}
          <div className={styles.grupoC}>
            <label className={styles.label}>
                Familia
            </label>
            <select 
                className={styles.select}
                style={{width: "450px"}}
                id="IdFamilia"
                value={opFamilia}
                onChange={Selecionar}
            >
            {
                familiasInfo?.loading ? (
                  <option key={0} value={1}>
                    Carregando...
                  </option>
                ):
                (
                  familiasInfo?.data?.length === 0 ? 
                  (
                    <option key={0} value={1}>
                      Nenhum resultado encontrado
                    </option> 
                  ):
                  (
                  <>
                    <option key={0} value={1}>
                      Selecione uma Familia
                    </option>
                    {
                      familiasInfo?.data?.map( (item, i) =>
                        <option 
                          key={i+1} 
                          value={item?.value}   
                        >
                          {item?.label}
                        </option>
                      )
                    }
                  </>

                  )
                )
            }               
            </select>     
          </div> 
          {/* Numero da GRD */}
          <div className={styles.grupoR3}>
            <div className={styles.grupoC} >
              <label className={styles.label}>
                  Nº GRD.
              </label>
              <input
                className={styles.input}
                style={{width: "150px"}}
                type="text"
                id="GRD" 
                {...register("GRD")}
              />
            </div>
          </div>            
        </div>
        {/* GRUPO 04 */}
        <div className={styles.grupoR}>
          {/* Itens da GRD */}
          <div className={styles.grupoC}>
            <label className={styles.label}>
                Itens da GRD
            </label>
            <table className={styles.tabela}>
              <thead>
                <tr>
                  <th width="10%">Item</th>
                  <th width="25%">Numero TMSA</th>
                  <th width="25%">Numero Cliente</th>
                  <th  width="30%">Titulo</th>
                  <th  width="10%">Rev</th>
                </tr>
              </thead>
              <tbody>
                {
                  itensInfo?.loading ?
                  (
                    <>
                    <tr>
                      <td colSpan={5}>Carregando...</td>
                    </tr>
                    </>
                  ):
                  (
                    itensInfo?.data?.length === undefined ? 
                    (
                      <>
                        <tr>
                          <td colSpan={5}>Nenhum item encontrado...</td>
                        </tr>
                      </>
                    ):
                    (
                      <>
                      {
                        itensInfo?.data[0]?.map( (item, i) =>
                          <tr key={i}>
                            <td width="10%">{item.Item}</td>
                            <td width="25%">{item.NumeroTMSA}</td>
                            <td width="25%">{item.NumeroCliente}</td>
                            <td width="30%">{item.Titulo}</td>
                            <td width="10%">{item.Rev}</td>                          
                          </tr> 
                        )
                      }                 
                      </>
                    )
                  )
                }
                {/* <tr>
                  <td width="10%">001</td>
                  <td width="25%">XXX-00000-00</td>
                  <td width="25%">WYZ000-0000-00</td>
                  <td width="30%">TITULO DO DESENHO</td>
                  <td width="10%">X</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}