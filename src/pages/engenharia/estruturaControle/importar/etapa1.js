import { useContext, useEffect, useState } from 'react'
import myStyle from "./etapas.module.css"

import {CSVContext} from "../../../contexts/csvContext"

export default function Etapa1(){

        const [dadoFile, setDadoFile] = useState({fileName: "", fileContent: "",})

        const {dadosCSV, setDadosCSV} = useContext(CSVContext)

        function handleFile(ev) {
            // setFile(ev.target.files[0])
            const file = ev.target.files[0];
            console.log(file)
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
				const dados = parseCSV(reader.result)
                setDadoFile({
                    fileName: file.name,
                    fileContent: reader.result,
                })
                setDadosCSV(dados)
            }
            
            reader.onerror = () => {
                console.log('Error', reader.error)
            }
        }
        function parseCSV(text){
            const dados = [];

            const result = text.split('\n')
			let id = 0;
            result.map((linha) => {
				const dado = {
					id: 0,
					Grupo: "",
					Posicao: "",
					Qtd: 0,
					Descricao: "",
					Material: "",
					Peso: 0,
					PesoTot: 0,
                    Tipo: "",
                    Unidade: "",
                    Obs: "",
                    Familia: "",
                    TipoEle: "",
				}
				id ++;
				let dadoLinha = [];
				dadoLinha = linha.split(";");
				
				dado.id = id;
				dado.Grupo = dadoLinha[0];
				dado.Posicao = dadoLinha[1];
				dado.Qtd = dadoLinha[2];
				dado.Descricao = dadoLinha[3];
				dado.Material = dadoLinha[4];
				dado.Peso = dadoLinha[5];
				dado.PesoTot = dadoLinha[6];

                if(dado.Grupo !== undefined && dado.Grupo.trim() > ""){
                    if(dado.Posicao === undefined || dado.Posicao.trim() === "" ){
                        dado.Tipo = "E" //Tipo Elemento
                    }else{
                        dado.Tipo = "S" //Tipo SubItem
                    }
                }else{
                    if(dado.Posicao  !== undefined && dado.Posicao.trim() > ""){
                        dado.Tipo = "E" //Tipo Elemento
                    }else{
                        dado.Tipo = "N" //Tipo Nulo
                    }
                }

                dados.push(dado);
            })
			console.log('LINHA', dados);
            return dados
        }



    return(
    <>
        <div className={myStyle.Etapa1}>
            <div className={myStyle.resultado}>
                <table className={myStyle.tabela}>
                    <thead>
                        <tr>
                            <th width="5%">Sel.</th>
                            <th width="6%">Grupo.</th>
                            <th width="8%">Posição</th>
                            <th width="5%">Qtd.</th>
                            <th  width="36%">Descrição</th>
                            <th  width="20%">Material</th>
                            <th  width="10%">Peso</th>
                            <th  width="10%">Peso Tot.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dadosCSV?.map((item) => (
                                <tr key={item.id}>
                                    <td width="5%">
                                        <input 
                                            type="checkbox" 
                                            name="chkSel" 
                                            className={myStyle.selecao}
                                            checked={item?.Tipo === "E" ? (true):(false) }
                                        />
                                    </td>
                                    <td width="6%">{item?.Grupo}</td>
                                    <td width="8%">{item?.Posicao}</td>
                                    <td width="5%">{item?.Qtd}</td>
                                    <td width="36%">{item?.Descricao}</td>
                                    <td width="20%">{item?.Material}</td>
                                    <td width="10%">{item?.Peso}</td>
                                    <td width="10%">{item?.PesoTot}</td>                           
                                </tr>

                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className={myStyle.arquivo}>
				<input type="text" className={myStyle.inputNomeArquivo} defaultValue={dadoFile.fileName}/>
                <label htmlFor="arq" className={myStyle.botaoFile}>Selecionar</label>
                <input 
                    className={myStyle.inputHide}
                    type="file" 
                    name="arq"
                    accept=".csv"
                    id="arq"
                    onChange={handleFile} 
                />
            </div>
        </div>
    </>
    )
}