//Formulario para edição dos itens selecionados
//na segunda etapa da importação

import { useContext, useState, useEffect, useMemo } from 'react'
import { useForm } from "react-hook-form";
import styles from "../formulario.module.css"
import {CSVContext} from "../../../contexts/csvContext"
import {PerfilContext} from "../../../contexts/perfilContext"
import useApiListas from "@/hooks/useApiListas";
import { FaPaperPlane, FaThumbsUp, FaRegWindowClose } from 'react-icons/fa'
import LocalStyle from "../../../../styles/formulario.module.css";
import Button from "../../../../componentes/button/index"

export default function Formulario({item, setModalOpen}){
    
    //Ler os dados da Encomenda Ativo do Contexto Atual
    const {encomendaAtiva} = useContext(PerfilContext) 

    //carregar o HOOKs UseApiListas
    const [carregarFamilias, familiasInfo] = useApiListas({
        url: `/api/combos/familias/${encomendaAtiva.idEncomenda}`,
    })

    useEffect(()=>{
        carregarFamilias();
    },[])

    //Estados para controle das opções dos selects
    const [opFamilia, setOpFamilia] = useState(1);
    const [nomeFamilia, setNomeFamilia] = useState("");

    const Selecionar =(e) => {
        console.log("NOME",e.target)
        if(e.target.id === "IdFamilia")
        {
            setOpFamilia(e.target.value)
            setNomeFamilia(e.target.label)
        }
    }

    const {dadosCSV, setDadosCSV} = useContext(CSVContext)

    const [espElemento, setEspElemento] = useState();

    const form = useForm({defaultValues: item})
    const { register, handleSubmit, formState: {errors} } = form;



    useEffect(() => {        
        setEspElemento( prev => 
            item?.Descricao 
            + " - " 
            + item?.Material
            + " - " 
            + item?.Obs 
        )
        
    }, []);   

    const atualizaEsp= (e) => {
        console.log("EspElemento")
        setEspElemento( prev => 
            item?.Descricao 
            + " - " 
            + item?.Material
            + " - " 
            + e.target.value
        )
        console.log("EspElemento")
    }



    //Função para ser executada na submissão do formulario
    //quando o mesmo estiver sido validado pelo HOOK UseForm
    const onSubmit = (data) =>{
        dadosCSV[item.id].Obs = data.Obs
        dadosCSV[item.id].IdFamilia = data.IdFamilia
        dadosCSV[item.id].Familia = nomeFamilia
        dadosCSV[item.id].TipoEle = data.TipoEle
        setModalOpen(false);
    }



    return(
    
        <>
        <div className={styles.form}>   
            <div className={styles.corpoCadastro}>
                {/* GRUPO 01 */}
                <div className={styles.grupoR}>
                    <div className={styles.grupoC}>
                        <label className={styles.label}>
                            GrPos
                        </label>
                        <input
                            style={{width: "200px"}}
                            type="text"
                            id="GrPos" 
                            disabled={true}
                            className={styles.input}
                            value={item?.Grupo + item?.Posicao}
                        />
                    </div>
                    <div className={styles.grupoC}>
                        <label className={styles.label}>
                            Qtd
                        </label>
                        <input
                            style={{width: "200px"}}
                            type="text"
                            id="Qtd" 
                            disabled={true}
                            className={styles.input}
                            //defaultValues={itemEdicao?.Qtd}
                            {...register("Qtd")}
                        />
                    </div>
                    <div className={styles.grupoC}>
                        <label className={styles.label}>
                            Peso
                        </label>
                        <input
                            style={{width: "200px"}}
                            type="text"
                            id="Peso" 
                            disabled={true}
                            className={styles.input}
                            //defaultValues={itemEdicao?.PesoTot}
                            {...register("Peso")}
                        />
                    </div>
                </div>
                {/* GRUPO 02 */}
                <div className={styles.grupoR}>
                    <div className={styles.grupoC}>
                        <label className={styles.label}>
                            Descrição
                        </label>
                        <textarea
                            style={{width: "600px"}}
                            id="Descricao" 
                            className={styles.text}
                            disabled={true}
                            //defaultValues={itemEdicao?.Descricao}
                            {...register("Descricao")}
                        />
                    </div>
                </div>
                {/* GRUPO 03 */}
                <div className={styles.grupoR}>
                    <div className={styles.grupoC}>
                        <label className={styles.label}>
                            Observação
                        </label>
                        <textarea
                            style={{width: "600px"}}
                            id="Obs" 
                            className={styles.text}
                            //defaultValues={itemEdicao?.Obs}
                            onChange={(e)=>atualizaEsp(e)}
                            {...register("Obs")}
                        />
                    </div>
                </div>
                {/* GRUPO 04 */}
                <div className={styles.grupoR}>
                <div style={{width: "80%"}}>  
                    {/*Familia */}  
                    <label className={styles.label}>
                        Familia
                    </label>
                    <select 
                        className={styles.select}
                        // style={{width: "500px"}}
                        id="IdFamilia"
                        //value={opFamilia}
                        onChange={(e)=>Selecionar(e)}
                        {...register("IdFamilia")}
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
              <div style={{width: "15%"}}>  
                {/*Familia */}  
                <label className={styles.label}>
                    Tipo
                </label>
                <select 
                    className={styles.select}
                    // style={{width: "500px"}}
                    id="TipoEle"
                    //value={opFamilia}
                    // onChange={Selecionar}
                    {...register("TipoEle")}
                >
                    <option key={0}> </option>
                    <option key={0}>C</option>
                    <option key={0}>F</option>
                    <option key={0}>I</option>
                </select>
              </div>

              </div>
                {/* GRUPO 04 */}
                <div className={styles.grupoR}>
                    <div className={styles.grupoC}>
                        <label className={styles.label}>
                            Unid
                        </label>
                        <input
                            style={{width: "200px"}}
                            type="text"
                            id="Unidade" 
                            className={styles.input}
                            {...register("Unidade")}
                        />
                    </div>                        
                    <div className={styles.grupoC}>
                        <label className={styles.label}>
                            Material
                        </label>
                        <input
                            style={{width: "400px"}}
                            type="text"
                            id="Material" 
                            className={styles.input}
                            disabled={true}
                            {...register("Material")}
                        />
                    </div>
                </div> 
                {/* GRUPO 05 */}



                {/* GRUPO 06 */}
                <div className={styles.grupoR}>
                    <div className={styles.grupoC}>
                        <label className={styles.label}>
                            Especificação do Elemento
                        </label>
                        <textarea
                            style={{width: "600px"}}
                            id="Esp" 
                            className={styles.text}
                            disabled={true}
                            value={espElemento}
                        />
                    </div>
                </div>

                {/* GRUPO 7 */}
                <div className={styles.grupoR} style={{marginTop: "30px"}}>
                    <Button 
                        onClick={() => handleSubmit(onSubmit)()} 
                        fontSize="1em" width="80%"
                    >
                        Enviar<FaPaperPlane className={LocalStyle.iconeBotao} />
                    </Button>
                    <Button  
                        onClick={() => setModalOpen(false)}
                        fontSize="1em" width="80%"
                    >
                        Cancelar<FaRegWindowClose className={LocalStyle.iconeBotao} />
                    </Button>
                </div>
            </div>
        </div>
        </>
        
    )
}