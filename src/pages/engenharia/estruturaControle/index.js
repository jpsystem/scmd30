import { useQuery } from 'react-query'
import TreeView from '../../componentes/treeView'
import styles from './index.module.css'
import LayoutPagina from '../../componentes/layoutPagina'
import Button from '../../componentes/button'
import {  FaRegWindowClose } from 'react-icons/fa'

export default function EstControle() {

    async function retElementos() {
    
        let json = [{}]

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                encomenda: 1,          
            })
        };

        
        try {
          const response = await fetch('/api/estruturaControle/treeView', requestOptions )
          
          json = await response.json()
          if (response.status !== 200) {
            throw new Error("Não foi possivel listar os elementos!")
          } 
        } catch (error) {
          throw new Error(error.message)
        }
        return json
      }

        const { data, isLoading } = useQuery( "treeView", async () => {
            const response = await retElementos();
            console.log({data});
            return response;
        })


        if( isLoading) {
            return( 
                <div className="loading">
                    <h1>Carregando…</h1>
                </div>
            )
        }

        const tree2 = [
            {
                label: "FORMUALÁRIO",

                filhos: [
                    {

                    },
                ],
            },
        ]
    return (

        <LayoutPagina largura="1500px">
            <div className={styles.barraTitulo}>
                <h2 className={styles.title}>Estrutura de Controle</h2>
                <FaRegWindowClose className={styles.iconeFechar}/>
            </div>
            <div className={styles.corpoEC}>
                <div className={styles.gridEC}>
                    <TreeView tree={data[0]}/>
                </div>
                <div className={styles.menuEC}>
                    <p>Localizar</p>
                    <Button heigth={"140px"}>Criar Base</Button>
                    <Button heigth={"140px"}>Importar Lista</Button>
                    <Button heigth={"140px"}>Gerar Relatórios</Button>
                </div>
            </div>
        </LayoutPagina>
      )
}

