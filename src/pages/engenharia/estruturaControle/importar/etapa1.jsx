import { useContext, useState } from 'react'
import myStyle from "./etapas.module.css"

import {CSVContext} from "../../../contexts/csvContext"

export default function Etapa1(){

        const [dadoFile, setDadoFile] = useState({fileName: "", fileContent: "",})

        const {dadosCSV, setDadosCSV, setNomeDesenho} = useContext(CSVContext)

        //Função para abrir o arquivo csv e ler o conteudo
        function handleFile(ev) {
            // setFile(ev.target.files[0])
            const file = ev.target.files[0];
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                //Executa a função que transforma o texto em
                // um array de elementos dos itens para salvar
                // na variavel dados
				const dados = parseCSV(reader.result)
                setDadoFile({
                    fileName: file.name,
                    fileContent: reader.result,
                })
                const NomeD = file.name.split("-R",1)
                setNomeDesenho(NomeD) 
                setDadosCSV(dados)
                
            }
            
            reader.onerror = () => {
                console.log('Error', reader.error)
            }
        }

        //Função que transformar os dados do texto
        //em um array de Itens
        function parseCSV(text){
            const dados = [];
            //Efetua a leitura das linhas
            const result = text.split('\n')
			let id = 0;
            //Laço para ler todas as linhas e salvar em um array de Itens
            result.map((linha) => {
				const dado = {
					id: 0,
                    Sel: false,
					Grupo: "",
					Posicao: "",
					Qtd: 0,
					Descricao: "",
					Material: "",
					Peso: 0.0,
					PesoTot: 0.0,
                    Tipo: "",
                    Unidade: "",
                    Obs: "",
                    Familia: "",
                    TipoEle: "",
                    IdFamilia: 0,
				}
				
				let dadoLinha = [];
				//dadoLinha = linha.split(";");
                //Efetuar quebra por TAB
                dadoLinha = linha.split("\t");
				dado.id = id;
				dado.Grupo = dadoLinha[0];
				dado.Posicao = dadoLinha[1];
				dado.Qtd = dadoLinha[2];
				dado.Descricao = dadoLinha[3];
				dado.Material = dadoLinha[5];
				dado.Peso = dadoLinha[6];
				dado.PesoTot = dadoLinha[6];
                id ++;
                //Tem Grupo
                if(dado.Grupo !== undefined && dado.Grupo.trim() > ""){
                    //Não tem Posição
                    if(dado.Posicao === undefined || dado.Posicao.trim() === "" ){
                        dado.Tipo = "E" //Tipo Elemento
                        dado.Sel = true
                    }
                    //Tem posição
                    else{
                        dado.Tipo = "S" //Tipo SubItem
                    }
                }
                //Não tem Grupo
                else{
                    //Tem posição
                    if(dado.Posicao  !== undefined && dado.Posicao.trim() > ""){
                        dado.Tipo = "E" //Tipo Elemento
                        dado.Sel = true
                    }
                    //Não tem posição
                    else{
                        dado.Tipo = "N" //Tipo Nulo
                    }
                }

                dados.push(dado);
            })

            return dados
        }

        //Função para atualizar o array dadosCSV quando
        //for alterado os chekbox dos itens
        function handleChange(id, event){
            setDadosCSV(
                //prevState contem os dados atuais de dadosCSV
                prevState => {
                    //Criu um novo estado para atualizar o item especifico
                    //com o valor atual do campo "Sel"
                    const newState = prevState.map((item) => {
                        if(item.id === id){
                            return { 
                                ...item,
                                [event.target.name]: event.target.checked 
                            }
                        }
                        //se não encontrou o item especifico retorna
                        //os dados originais
                        return item
                    })
                    
                    //Retorna o novo estado atual com as alterações
                    //para atualizar.
                    return newState
                }
            )

        }

    return(
    <>
        <div className={myStyle.Etapas}>
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
                                            name="Sel" 
                                            checked={item?.Sel}
                                            className={myStyle.selecao}
                                            onChange={(event)=>handleChange(item.id, event)}
                                        />
                                    </td>
                                    <td width="6%">{item?.Grupo}</td>
                                    <td width="8%">{item?.Posicao}</td>
                                    <td width="5%">{item?.Qtd}</td>
                                    <td width="36%">{item?.Descricao}</td>
                                    <td width="20%">{item?.Material}</td>
                                    <td width="10%">{
                                        item?.Tipo === "S"  && item?.Peso
                                    }</td>
                                    <td width="10%">{
                                        item?.Tipo === "E" && item?.Peso
                                    }</td>                           
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