import {useContext, useState} from "react"
import {setCookie} from "cookies-next"

import {useRouter} from "next/router"
import styles from '../../styles/login.module.css'
import Input from '../../componentes/input/index'
import Button from '../../componentes/button/index'

//import {signIn} from 'next-auth/react'
import LayoutPagina from "../componentes/layoutPagina"
import { PerfilContext } from "../contexts/perfilContext"

//import { get } from "react-hook-form"

export default function Login( ) {


    const [formData, setFormData] = useState({
        login: '',
        senha: '',
    })


    const [error, setError] = useState("")
    const router = useRouter()

    const {setUsuario, setPageReload, setAuth} = useContext(PerfilContext)



    const handleFormEdit = (event, name) => {
        setFormData({
            ...formData,
            [name]: event.target.value
        })
    }
    
    const handleForm = async (event) => {

        try {
            event.preventDefault()
            const resposta = await fetch ('/api/user/login', {
              method: 'POST',
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  login: formData.login,
                  senha: formData.senha
              })
            });
            const json = await resposta.json();
            if(resposta.ok){
              //console.log("JSON",json)
              setCookie("autorization",json[1].token)
              setCookie("auth",true)
              setCookie("useID",json[0].dadosUser.id)
              setCookie("useNome",json[0].dadosUser.nome)
              setCookie("useLogin",json[0].dadosUser.login)
              setCookie("useAdministrador",(json[0].dadosUser.administrador === 1 ? true: false))
              setUsuario({
                nome: json[0].dadosUser.nome,
                login:  json[0].dadosUser.login,
                id: json[0].dadosUser.id,
                administrador: (json[0].dadosUser.administrador === 1 ? true: false)
              })
              setPageReload(true)
              router.push('/')
         
            } else{
              setError(resposta.error)
            }
            // const resposta = await signIn('credentials', { 
            //     redirect: false, 
            //     login: formData.login, 
            //     senha: formData.senha 
            // });
            // if(resposta.ok){
            //     console.log("RESPOSTA",resposta)
            //     //const dados = await buscaUsuario(formData.login,formData.senha )
            //     // setUsuario({ 
            //     //     nome: dados.Nome,
            //     //     administrador: dados.Administrador,
            //     //     id: dados.Id,
            //     //     login: dados.Login
            //     // })
            //     router.push('/')
            // } else{
            //     setError(resposta.error)
            // }
        } catch (error) {
            setError(error.message)
        }
    }



  //Função para retornar os dados do
  //usuário para salvar no contexto"
  async function buscaUsuario(pLogin, pSenha) {
    
    let json = [{}]
    
    try {
      const response = await fetch('/api/user/usuario', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            login: pLogin,
            senha: pSenha
        })
      });
      
      json = await response.json()
      if (response.status !== 200) {
        throw new Error("Não foi possivel listar as ETCs!")
      } 
    } catch (error) {
      throw new Error(error.message)
    }
    return json
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

// export const getServerSidePropos = async ({req,res}) => {
//   try {
//     const token = getCookie('autorization', {req, res})
//     if(!token) throw new Error("Token invalido")

//     //verifica(token)

//     return{
//       props: {token: token},
//     }
//   } catch (error) {
//     return{
//       redirect:{
//         permanent: false,
//         destination: "/login"
//       },
//       props: {token: token},
//     }
//   }
// }