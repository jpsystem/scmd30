//Autor: João Magalhães
//Formulario para os dados da ETC
import { useForm } from "react-hook-form";
import styles from "./formETC.module.css"
import { useContext, useEffect, useState } from "react";
import { PerfilContext } from "@/pages/contexts/perfilContext";
import useApiListas from "@/hooks/useApiListas";
import Button from "@/componentes/button";
import { JPConversoes } from "@/jpFuncoes/convercoes";

export default function FormEtcDados({campos, tipo, setModalOpen, retornoFilho}){

  //Ler os dados da Encomenda Ativo do Contexto Atual
  const {encomendaAtiva, usuario} = useContext(PerfilContext) 

  //Se for do tipo inclusao preenche
  // campos com valores padroes
  if(tipo === "inclusao"){
    campos = {
      DataEmi:      JPConversoes.strDate(),
      Familia:      null,
      GRD:          null,
      IdFamilia:    null,
      Local:        null,
      Observacoes:  null,
      Prazo:        null,
      Responsavel:  usuario.login,
      Revisao:      null,
      Status:       "Pendente",
      codETC:       null,
      id:           null
    };
  }

  //Estanciar o HOOK UseForm
  const form = useForm({defaultValues: campos})
  const { register, handleSubmit, formState: {errors} } = form; 

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
          GRD: (tipo !== "inclusao"? campos?.GRD: 0)         
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
  const [opFamilia, setOpFamilia] = useState(campos?.IdFamilia? campos?.IdFamilia: 1);

  //Função para setar as variaveis de estados
  //quando selecionar uma Familia ou um TAG
  const Selecionar = e => {
    setOpFamilia(e.target.value)
  }

  const alteracao = async (data) =>{
    // console.log("DATA:",data)
    // console.log("Usuario:",usuario.login)
    // alert("ALTERAÇÃO");
    try {
      const resposta = await fetch ('/api/etcs/edicao', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            observacoes: data?.Observacoes,
            responsavel: usuario.login,
            prazo: data?.Prazo,
            local: data?.Local,
            data_em: data?.DataEmi,
            IDguiaETC: data?.id
        })
      }); 
      const json = await resposta.json();
      retornoFilho({tipo: "",texto: ""});
      if(resposta.status === 201){
          retornoFilho( {tipo:"sucesso", texto:"Os dados da ETC foram alterados com sucesso!", id: Math.random()})
      } else{
          retornoFilho( {tipo:"falha", texto: resposta.error, id: Math.random()})
      }
    } catch (error) {
        retornoFilho( {tipo:"falha", texto: error.message, id: Math.random()})
    }
    setModalOpen(false);
  }
  //Função para ser executada na submissão do formulario
  //para a inclusão de uma nova etc
  //quando o mesmo estiver sido validado pelo HOOK UseForm
  const onSubmit = async (data) =>{

    try {
      const resposta = await fetch ('/api/etcs/cadastro', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idEncomenda: encomendaAtiva.idEncomenda,
            idFamilia:   (opFamilia===1 ? null: opFamilia),
            observacoes:    data?.Observacoes,
            data_em:        data?.DataEmi,
            responsavel:    data?.Responsavel,
            prazo:          data?.Prazo,
            local:          data?.Local,
            enc:            encomendaAtiva.codEncomenda
        })
      });
      const json = await resposta.json();
      console.log("JSON: ", json) 
      
      if(resposta.status === 201){
        if(json.etc > 0)
        {
            retornoFilho( {tipo:"sucesso", texto:`Elemento ${json.etc}, ${json.menssagem}`, id: Math.random()})
        }else{
            retornoFilho( {tipo:"falha", texto:"Não é possivel incluir o elemento!", id: Math.random()})
        }
      } else{
          retornoFilho({tipo:"falha", texto:resposta.error, id: Math.random()})
      }
    } catch (error) {
      retornoFilho({tipo:"falha", texto:error.message, id: Math.random()})
    }
    setModalOpen(false);
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
                    disabled
                    className={styles.input}
                    {...register("codETC")}
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
                    disabled
                    className={styles.input}
                    {...register("Revisao")}
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
                  // value={today.toLocaleDateString()}
                  className={styles.input}
                  {...register("DataEmi", {requered: true})}
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
              disabled
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
                disabled
                className={styles.input}
                {...register("Status",{requered: true})}
              />
            </div>
          </div> 
          {/* Botão para salvar alterações */}
          {/* Só será exibido se a ETC não estiver com STATUS Emitida */}
          {campos.Status !== "Emitida" && 
            <>
              <div className={styles.grupoCBT}>
                <Button 
                    onClick={() => handleSubmit(alteracao)()} 
                    fontSize={"1.5em"}
                    heigth={"50px"}
                    width={"200px"}
                  >
                    Salvar
                  </Button>
              </div>
            </>
          }
          {/* =================================== */}
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
                disabled
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
                        itensInfo?.data?.map( (item, i) =>
                          <tr key={i}>
                            <td width="10%">{item?.Item}</td>
                            <td width="25%">{item?.NumeroTMSA}</td>
                            <td width="25%">{item?.NumeroCliente}</td>
                            <td width="30%">{item?.Titulo}</td>
                            <td width="10%">{item?.Rev}</td>                          
                          </tr> 
                        )
                      }                 
                      </>
                    )
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
        {/* BOTÔES */}
        {
          tipo === "inclusao" && (
            <div className={styles.grupoR} style={{marginBottom: "50px"}}>
              <Button 
                onClick={() => handleSubmit(onSubmit)()} 
                fontSize={"2em"}
                width={"200px"}
              >
                Salvar
              </Button>
              <Button 
                onClick={() => setModalOpen(false)}
                fontSize={"2em"}
                width={"200px"}
              >
                Fechar
              </Button>
            </div>
          )
        }     
      </div>
    </>
  )
}