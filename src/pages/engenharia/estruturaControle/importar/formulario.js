import { useForm } from "react-hook-form";
import { FaPaperPlane } from 'react-icons/fa'

import styles from "../../../../styles/login.module.css"
import LocalStyle from "../../../../styles/formulario.module.css";
import Button from "../../../../componentes/button/index"
import { useState } from "react";

export default function Formulario({campos}){
    const form = useForm({defaultValues: campos})
    const { register, handleSubmit, formState: {errors} } = form;
    const [valores, setValores] = useState(campos)

    const alteracao = (ev) => {
        const {name, value} = ev.target;
     }

     const onSubmit = (data) =>{
        console.log(data);
        //alert(JSON.stringify(data));
    };

    return(
        <>
        <div className={styles.corpoCadastro}>
            <div className={styles.form}>

            </div>
        </div>
        </>
    )
}