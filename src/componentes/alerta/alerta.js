import {useState, useEffect} from "react"
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'

import style from "./alerta.module.css"

export default function Alerta({tipo, texto, id}) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if(!texto){
           setVisible(false)
           return 
        }

        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 4000)
        
        return ()=> clearTimeout(timer)

    }, [texto, id])
return(
    <>
        {visible && (
            <div className={style.ariaAviso}>
                <div className={`${style.barraAviso} ${style[tipo]}`}>
                    {tipo==="sucesso" && (
                        <p className={style.titulo}><FaThumbsUp className={style.icone}/> Sucesso!</p>
                    )}
                     {tipo==="falha" && (
                        <p className={style.titulo}><FaThumbsDown className={style.icone}/> Falha!</p>
                    )}                   
                    <p className={style.texto}>{texto}</p>
                </div>
            </div>
        )}
    </>
)
}