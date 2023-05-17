import { useForm } from "react-hook-form";
import { FaPaperPlane } from 'react-icons/fa'

import styles from "../../../../styles/login.module.css"
import LocalStyle from "../../../../styles/formulario.module.css";
import Button from "../../../componentes/button/index"
import { useState } from "react";


export default function Formulario({campos}){

    const form = useForm({defaultValues: campos})

    const { register, handleSubmit, formState: {errors} } = form;

    console.log(campos)
    const [valores, setValores] = useState(campos)
    console.log(valores)

    const alteracao = (ev) => {
       const {name, value} = ev.target;
    }

    console.log({errors})
    const onSubmit = (data) =>{
        console.log(data);
        //alert(JSON.stringify(data));
    };

    return(
        <div className={styles.corpoCadastro}>
            <div className={styles.form}>
                    <label className={styles.label}>
                        Login
                    </label>
                    <input  type="text" 
                            id="login"
                            name="login"
                            className={styles.input}
                            {...register("login", {required: true })}/> 
                    
                    {errors?.login?.type === "required" && 
                        <p className={styles.error}>O campo login é obrigatório</p>
                    }

                    {/* Nome */}
                    <label className={styles.label}>
                        Nome
                    </label>
                    <input  type="text"
                            id="nome"
                            className={styles.input}
                            {...register("nome", {required: true,  })}
                    />
                    
                    {errors?.nome?.type === "required" && 
                        <p className={styles.error}>O campo nome é obrigatório</p>
                    }

                    {/* Email */}
                    <label className={styles.label}>
                        Email
                    </label>
                    <input  type="email" 
                            id="email"
                            className={styles.input}
                            {...register("email")} 
                    />

                    {/* Cargo */}
                    <label className={styles.label}>
                        Cargo
                    </label>
                    <input  type="text"
                            id="cargo"
                            className={styles.input}
                            {...register("cargo")} 
                    />

                    {/* Senha */}
                    <label className={styles.label}>
                        Senha
                    </label>
                    <input  type="password"
                            id="senha"
                            className={styles.input}
                            {...register("senha", {required: true })} 
                    />
                    
                    {errors?.senha?.type === "required" && 
                        <p className={styles.error}>O campo senha é obrigatório</p>
                    }

                    {/* Admin */}
                    <label className={styles.label}>
                        Admin
                    </label>
                    <input  type="checkbox"
                            id="admin"
                            className={styles.input}
                            {...register("admin")} 
                    />                                                                              
                    <div className={LocalStyle.barraBotoes}>
                        <Button onClick={() => handleSubmit(onSubmit)()}>Enviar<FaPaperPlane className={LocalStyle.iconeBotao} /></Button>
                    </div>
            </div>
      </div> 
    )
}

