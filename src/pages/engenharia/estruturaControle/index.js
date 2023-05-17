import { useQuery } from 'react-query'
import TreeView from '../../componentes/treeView'
import styles from '../../../styles/login.module.css'
import LayoutPagina from '../../componentes/layoutPagina'

export default function EstControle() {

    async function retElementos() {
    
        let json = [{}]

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                encomenda: 1,
                pai: 1,           
            })
        };

        
        try {
          const response = await fetch('/api/estruturaControle/treeViewECs', requestOptions )
          
          json = await response.json()
          if (response.status !== 200) {
            throw new Error("Não foi possivel listar os elementos!")
          } 
        } catch (error) {
          throw new Error(error.message)
        }
        return json
      }

        const { data, isLoading } = useQuery( "treeViewEC", async () => {
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
        
        const tree = [
            {
                label: "2 - 101 - 150-TP-28",

                filhos: [
                    {
                        label: "Item 1.164 - FABRICAÇÃO",
                        filhos: [
                        ],
                    },
                ],
            },
            {
                label: "3 - 102 - 150-TP-29",
                filhos: [
                    {
                        label: "Item 1.164 - FABRICAÇÃO",
                        filhos: [
                        ],
                    },                  
                ],
            },
            {
                label: "4 - 103 - 150-TP-30",

                filhos: [
                    {
                        label: "66	66 - FABRICAÇÃO",
                        filhos: [
                        ],
                    },
                ],
            },
            {
                label: "5 - 104 - 150-TP-35",
                filhos: [
                    {
                        label: "67	67 - FABRICAÇÃO",
                        filhos: [
                        ],
                    },                  
                ],
            },
            {
                label: "6 - 105 - 254-TP-04",

                filhos: [
                    {
                        label: "68	68 - FABRICAÇÃO",
                        filhos: [
                        ],
                    },
                ],
            },
            {
                label: "7 - 106 - 254-TP-08",
                filhos: [
                    {
                        label: "69	69 - FABRICAÇÃO",
                        filhos: [
                        ],
                    },                  
                ],
            },
            {
                label: "8 - 107 - 254-TP-10",
                filhos: [
                    {
                        label: "	1790 - TPR00154-107-0646 - LONGARINA L-1, L-3,L-4,L-8	70",
                        filhos: [
                            {
                                label: "1791 - (GRUPO A) PE DE LONGARINA	1790	335",
                                filhos: [
                                
                                ],
                            },
                            {
                                label: "1792 - (GRUPO B) ESPAÇADOR	1790	335",
                                filhos: [
                                
                                ],
                            },
                            {
                                label: "1793 - U 152,4 X 12,2 KG/M X 5500 - ASTM A-36	1790	335",
                                filhos: [
                                
                                ],
                            },
                            {
                                label: "1794 - U 152,4 X 12,2 KG/M X 5500 - ASTM A-36	1790	335",
                                filhos: [
                                
                                ],
                            },
                            {
                                label: "1795 - PARAF CAB SEXT M16X50 DIN 933 5.8 ZINC FOG - NOTA-9	1790	625",
                                filhos: [
                                
                                ],
                            },
                            {
                                label: "1796 - PORCA SEXT M16 DIN 934 - CLASSE REST 5 ZINC FOG - NOTA-9	1790	625",
                                filhos: [
                                
                                ],
                            },
                            {
                                label: "1797 - ARRUELA LISA M16 DIN 125-A ACO ZINC FOG - NOTA-9	1790	625",
                                filhos: [
                                
                                ],
                            },
                            {
                                label: "1798 - ARRUELA CONICA ANSI B27-4 TIPO A - M16 ZINC FOG - NOTA-9	1790	625",
                                filhos: [
                                
                                ],
                            },
                            {
                                label: "1799 - PARAF CAB SEXT M16X40 DIN 933 5.8 ZINC FOG - NOTA-9	1790	625",
                                filhos: [
                                
                                ],
                            },
                        ],
                    },                  
                ],
            },


        ]

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

        <LayoutPagina largura="1800px">
            <div className={styles.barraTitulo}>
                <h2 className={styles.title}>Estrutura de Controle</h2>
            </div>
            <div className={styles.corpoEC}>
            <TreeView tree={tree}/>
            <TreeView tree={tree2}/>
            </div>
        </LayoutPagina>
      )
}
