import {useContext, useState} from "react"
import {setCookie} from "cookies-next"
import {useRouter} from "next/router"

import styles from '../../styles/login.module.css'
import Input from '../componentes/input/index'
import Button from '../componentes/button/index'
import { PerfilContext } from "../contexts/perfilContext"

import {signIn} from 'next-auth/react'
import LayoutPagina from "../componentes/layoutPagina"

export default function Login() {

    const [formData, setFormData] = useState({
        login: '',
        senha: '',
    })
        
    const [error, setError] = useState("")
    const router = useRouter()

    const {setName, setAuth} = useContext(PerfilContext)

    const handleFormEdit = (event, name) => {
        setFormData({
            ...formData,
            [name]: event.target.value
        })
    }
    
    const handleForm = async (event) => {

        try {
            event.preventDefault()
            const resposta = await signIn('credentials', { 
                redirect: false, 
                login: formData.login, 
                senha: formData.senha 
            });
            console.log(resposta)
            if(resposta.ok){
                router.push('/')
            } else{
                setError(resposta.error)
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return(
    <LayoutPagina largura="600px">
        <h2 className={styles.title}>Login</h2>
           <form className={styles.form} onSubmit={handleForm}>
             <Input  type="text" 
                     placeholder="Seu login" 
                     required 
                     value={formData.login}
                     onChange={(e) => { handleFormEdit(e, "login")}}
             />
             <Input  type="password" 
                    placeholder="Sua senha" 
                    required 
                    value={formData.senha}
                     onChange={(e) => { handleFormEdit(e, "senha")}}
             />
             <Button>Entrar</Button>
             {error && <p className={styles.error}>{error}</p>}
           </form>       
    </LayoutPagina>
    )
}