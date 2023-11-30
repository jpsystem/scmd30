import LayoutPagina from "../../componentes/layoutPagina";
import FechaForm from '../../../componentes/fechaForm';
import styles from '@/styles/login.module.css'
import Modal from "@/componentes/modal";
import RelPadrao from './relPadrao.jsx';
import myStyle from "./index.module.css"
import Button from "@/componentes/button";
import useApiListas from "@/hooks/useApiListas";
import { useEffect, useState, useContext } from "react";
import { PerfilContext } from "@/pages/contexts/perfilContext"; 
import {useRouter} from "next/router"

export default function Relatorios(){

  const router = useRouter()
  //Função para fechar o formulário
  function fechar(){
      router.push('/')
      return null
  }

  //Ler os dados da Encomenda Ativo do Contexto Atual
  const {encomendaAtiva} = useContext(PerfilContext) 

  //Variaveis de Estados
  const [opTag, setOpTag] = useState(0);
  const [opFamilia, setOpFamilia] = useState(0);
  const [pai, setPai] = useState("0");
  const [ordens, setOrdens]=useState("Ordem1");
  const [desenhos, setDesenhos]=useState("cliente");
  const [etc, setEtc]=useState(false);

  const [openModal, setOpenModal] = useState(false);


  //carregar o HOOKs UseApiListas para buscar as Familias
  const [carregarFamlias, familiasInfo] = useApiListas({
      url: `/api/combos/familias/${encomendaAtiva.idEncomenda}`,
  })

  //carregar o HOOKs UseApiListas para buscar os TAGs
  const [carregarTags, tagsInfo] = useApiListas({
    url: `/api/combos/tags/${encomendaAtiva.idEncomenda}`,
  })

  //Carregar as lista de Familias e TAGs da encomenda
  //no load da Pagina.
  useEffect(()=>{
    carregarFamlias();
    carregarTags();
  },[])

  //Carregar as lista de Familias e TAGs da encomenda
  //no load da Pagina.
  useEffect(()=>{
    console.log(etc);
  },[etc])
  //Função para carregar o formulario do relatorio
  const imprimir = ()=>{
    setOpenModal(true);
  }

  //Função para setar as variaveis de estados
  //quando selecionar uma Familia ou um TAG
  const Selecionar = e => {
    if(e.target.id === "IdFamilia") 
        setOpFamilia(e.target.value)
    
    if(e.target.id === "IdTag")
        setOpTag(e.target.value)
  }



  return(
    <LayoutPagina largura="1300px">

      {/* //CABECALHO */}
      
      <div className={myStyle.grupoR}>
        <div 
          style={{ width: "100%"}}
          // className={styles.barraTitulo}
        >
          <h2 className={styles.title}>Configurações para emissão do relatorio</h2>
        </div>

        <div
          style={{ width: "50px"}} 
          // className={styles.barraFecha}
        >
            <FechaForm/>
        </div>

      </div>

      {/* //CORPO */}
      <div className={myStyle.corpo} style={{marginTop: "20px", height: "550px"}}>
        {/* GRUPO FILTROS */}
        <label className={myStyle.titleGroupS} style={{width: "120px"}}>Filtros</label>
        <div className={myStyle.grupoSR}>
          {/* Filtro Tag */}
          <div className={myStyle.grupoC}>
            <label for="IdTag" className={myStyle.label}>
              TAG
            </label>
            <select 
              className={myStyle.select}
              style={{width: "400px"}}
              id="IdTag"
              value={opTag}
              onChange={Selecionar}
            >
              {
                tagsInfo?.loading ? (
                  <option key={0} value={1}>
                    Carregando...
                  </option>
                ):
                (
                  tagsInfo?.data?.length === 0 ? 
                  (
                    <option key={0} value={0}>
                      Nenhum resultado encontrado
                    </option> 
                  ):
                  (
                    <>
                    <option key={0} value={0}>
                      Todos os TAGs...
                    </option>
                    {
                      tagsInfo?.data?.map( (item, i) =>
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
          {/* Filtro Familia */}
          <div className={myStyle.grupoC}>
            <label for="IdFamilia" className={myStyle.label}>
              Familia
            </label>
            <select 
              className={myStyle.select}
              style={{width: "400px"}}
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
                    <option key={0} value={0}>
                      Nenhum resultado encontrado
                    </option> 
                  ):
                  (
                    <>
                    <option key={0} value={0}>
                      Todas as Familias...
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
          {/* Filtro Pai */} 
          <div className={myStyle.grupoC}>
            <label for="Pai" className={myStyle.label}>
              PAI
            </label> 
            <input 
              id="pai" 
              value={pai} 
              className={myStyle.input} 
              style={{width: "200px"}}
              onChange={(e)=>{setPai(e.target.value)}}
            />           
          </div>           
        </div>
        {/* GRUPO ORDENAÇÃO */}
        <label className={myStyle.titleGroupS}>Ordenação</label>
        <div className={myStyle.grupoSR}>
          {/* Ordem1 - Elemento */}
          <div className={myStyle.customRadio}>
            <input type="radio" defaultChecked name="ordens" id="Ordem1" value="Ordem1" onChange={(e)=>{setOrdens(e.target.value)}} />
            <label htmlFor="Ordem1">Elemento</label>
          </div> 
          {/* Ordem2 - Tag + Elemento */}
          <div className={myStyle.customRadio}>
            <input type="radio" name="ordens" id="Ordem2" value="Ordem2" onChange={(e)=>{setOrdens(e.target.value)}} />
            <label htmlFor="Ordem2">Tag + Elem.</label>
          </div>
          {/* Ordem3 - Familia + Elemento */} 
          <div className={myStyle.customRadio}>
            <input type="radio" name="ordens" id="Ordem3" value="Ordem3" onChange={(e)=>{setOrdens(e.target.value)}} />
            <label htmlFor="Ordem3">Familia + Elem.</label>
          </div>
          {/* Ordem4 - Pai + Elemento */} 
          <div className={myStyle.customRadio}>
            <input type="radio" name="ordens" id="Ordem4" value="Ordem4" onChange={(e)=>{setOrdens(e.target.value)}} />
            <label htmlFor="Ordem4">Pai + Elem.</label>
          </div>
          {/* Ordem5 - Desenho */} 
          <div className={myStyle.customRadio}>
            <input type="radio" name="ordens" id="Ordem5" value="Ordem5" onChange={(e)=>{setOrdens(e.target.value)}} />
            <label htmlFor="Ordem5">Desenho</label>
          </div>         
        </div>     
        {/* GRUPO MISTO */}
        <div className={myStyle.grupoR}>
          {/* GRUPO DESENHO */}
          <div className={myStyle.grupoC}>
            <label className={myStyle.titleGroupS} style={{width: "250px"}}>Nª do Desenho</label>
            <div className={myStyle.grupoSR}>
              {/* cliente - Desenho do Cliente */}
              <div className={myStyle.customRadio}>
                <input type="radio" defaultChecked name="desenhos" id="cliente" value="cliente" onChange={(e)=>{setDesenhos(e.target.value)}} />
                <label htmlFor="cliente">Cliente</label>
              </div> 
              {/* tmsa - Desenho TMSA */}
              <div className={myStyle.customRadio}>
                <input type="radio" name="desenhos" id="tmsa" value="tmsa" onChange={(e)=>{setDesenhos(e.target.value)}} />
                <label htmlFor="tmsa">TMSA</label>
              </div>       
            </div>
          </div>
          {/* GRUPO ETC */}
          <div className={myStyle.grupoC}>
            <label className={myStyle.titleGroupS} style={{width: "100px"}}>ETC</label>
            <div className={myStyle.grupoSR}>
              {/* cliente - Desenho do Cliente */}
              <div className={myStyle.customCheck}>
                <input 
                  type="checkbox" 
                  name="etc" id="etc"  
                  onChange={(e)=>{setEtc(!etc)}} 
                />
                <label htmlFor="etc">Pendentes de ETC</label>
              </div> 
            </div>
          </div>

        </div>
      </div>

      {/* GRUPO Botões */}
      <div className={myStyle.grupoR} style={{marginTop: "30px"}}>
        <Button onClick={() => imprimir()}
              fontSize="1.2rem" width="250px">
        Imprimir
        </Button>
        <Button  onClick={fechar}
                fontSize="1.2rem" width="250px">
        Cancelar
        </Button>
      </div>

      {/* FORMULÁRIO MODAL */}
      <Modal 
      isOpen={openModal} 
      setModalOpen={()=> setOpenModal(!openModal)}
      titulo="Relatorio"
    >
      <RelPadrao 
        setModalOpen={()=> setOpenModal(!openModal)}
        config={{
          idEncomenda: encomendaAtiva.idEncomenda,
          tag: opTag,
          familia: opFamilia,
          pai: pai,
          ordens: ordens,
          desenhos: desenhos,
          etc: etc,
        }} 
      />
      </Modal>

    </LayoutPagina>

  )
}