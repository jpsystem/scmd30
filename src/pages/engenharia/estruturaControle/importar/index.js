import { useState } from 'react'
import styles from '../../../../styles/login.module.css'
import myStyle from "./index.module.css"
import LayoutPagina from '../../../componentes/layoutPagina'

export default function ImportaLista() {
        const [dadoFile, setDadoFile] = useState({fileName: "", fileContent: ""})

        function handleFile(ev) {
            // setFile(ev.target.files[0])
            const file = ev.target.files[0];
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                setDadoFile({
                    filename: file.name,
                    fileContent: reader.result,
                })
            }
            reader.onerror = () => {
                console.log('Error', reader.error)
            }
            // fetch(ev.target.files[0])
            // .then(r => r.text())
            // .then((text)=>{
            // console.log(text)
            // })
        }

       return (

        <LayoutPagina largura="1000px">
            <div className={styles.barraTitulo}>
                <h2 className={styles.title}>Importar Lista de Materiais</h2>
            </div>
            <div className={styles.corpoEC}>
                <h2>File Uploading JP</h2>
                <p>{dadoFile.fileName}</p>
                <form>
                    <label for="arq" className={myStyle.botaoFile}>Selecionar</label>
                    <input 
                        className={myStyle.inputHide}
                        type="file" 
                        name="arq"
                        id="arq"
                        onChange={handleFile} 
                    />
                </form>
                <p>{dadoFile.fileContent}</p>
            </div>
            <br/>

           
        </LayoutPagina>
      )
}
