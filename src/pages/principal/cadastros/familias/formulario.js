import { useForm } from "react-hook-form";
import { FaPaperPlane } from 'react-icons/fa'
import { useQuery } from 'react-query'
import styles from "../../../../styles/login.module.css"
import LocalStyle from "../../../../styles/formulario.module.css";
import Button from "../../../componentes/button/index"
import Select from '../../../componentes/select/index'
import { useState } from "react";


export default function Formulario({campos}){
    
    const form = useForm({defaultValues: campos})

    const { register, handleSubmit, formState: {errors} } = form;

    console.log(campos)
    const [valores, setValores] = useState(campos)
    console.log(valores)

    console.log({errors})
    const onSubmit = (data) =>{
        console.log(data);
        //alert(JSON.stringify(data));
    };

    //============================================================
    async function retEncomendas() {
        let json = [{}]
        try {
          const response = await fetch('/api/encomenda/listaEncomenda')
          
          json = await response.json()
          if (response.status !== 200) {
            throw new Error("Não foi possivel listar as encomendas!")
          }   
      
        } catch (error) {
          throw new Error(error.message)
        }
        return json
      }
    
      const { data, isLoading } = useQuery( "listEncomendas", async () => {
        const response = await retEncomendas();
        return response;
      })
     
      if( isLoading) {
      return <div className="loading">
                      <h1>Carregando…</h1>
                  </div>
      }
      //===========================================================


    return(
        <div className={styles.corpoCadastro}>
            <div className={styles.form}>
                    <label className={styles.label}>
                        Encomenda
                    </label>
                    {/* <input  type="text" 
                            id="codEncomenda"
                            name="codEncomenda"
                            className={styles.input}
                            {...register("codEncomenda", {required: true })}/> 
                     */}
                    <Select 
                            name="codEncomenda" 
                            id="codEncomenda"
                            text={campos?.codEncomenda}
                            //text="Selecione uma encomenda"
                            {...register("codEncomenda", {required: true })} 
                    >
                        <option key="0">Selecione...</option>
                        {data?.map( (item ) => 
                            (
                            <option key={item.id}
                                selected={item.codEncomenda === campos?.codEncomenda && true}
                            >{item.codEncomenda}</option>
                            )
                        )
                        }
                    </Select>                     
                    {errors?.codEncomenda?.type === "required" && 
                        <p className={styles.error}>O campo Encomenda é obrigatório</p>
                    }

                    {/* Nome */}
                    <label className={styles.label}>
                        Familia
                    </label>
                    <input  type="text"
                            id="familia"
                            className={styles.input}
                            {...register("familia", {required: true,  })}
                    />
                    
                    {errors?.familia?.type === "required" && 
                        <p className={styles.error}>O campo familia é obrigatório</p>
                    }

                    {/* Email */}
                    <label className={styles.label}>
                        Especificação
                    </label>
                    <input  type="espcificacao" 
                            id="espcificacao"
                            className={styles.input}
                            {...register("espcificacao")} 
                    />

                    {/* Cargo */}
                    <label className={styles.label}>
                        Cod_ERP
                    </label>
                    <input  type="text"
                            id="cod_erp"
                            className={styles.input}
                            {...register("cod_erp")} 
                    />
                                                         
                    <div className={LocalStyle.barraBotoes}>
                        <Button onClick={() => handleSubmit(onSubmit)()}>Enviar<FaPaperPlane className={LocalStyle.iconeBotao} /></Button>
                    </div>
            </div>
      </div> 
    )
}

