import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaPaperPlane } from 'react-icons/fa'

import styles from "../../../../styles/login.module.css"
import LocalStyle from "../../../../styles/formulario.module.css";
import Input from "../../../componentes/input/index"
import Button from "../../../componentes/button/index"

export default function Formulario(props){

    const SignupSchema = yup.object().shape(props.validacoes);

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(SignupSchema)
    });
    
    let campos = props.dados.cabecalhos;

    campos = campos.filter(item => item.exibir === true);

    const onSubmit = (data) => {
        console.log("Formulario submetido!", data)
        alert(JSON.stringify(data));
    }

    return(
        <div className={styles.corpoCadastro}>
            <div className={styles.form}>
                {   campos?.map( (item) => (
                        <>
                            <label htmlFor={`${item.id}`} className={styles.label}>
                                {`${item.nome}`}
                            </label>
                            <Input
                                type={`${item.type}`}  
                                id={`${item.id}`}
                                className={styles.input}
                                {...register(`${item.id}`)}   
                            />
                            {errors[`"${item.id}"`] && 
                            <p className={styles.error}>{errors[`${item.id}`].message}</p>}
                        </>
                    ))
                }
                <div className={LocalStyle.barraBotoes}>
                    <Button onClick={() => handleSubmit(onSubmit)()}>Enviar<FaPaperPlane className={LocalStyle.iconeBotao} /></Button>
                </div>
            </div>
      </div> 
    )
}

