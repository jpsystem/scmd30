//Componente GRID para controle de abertura do arquivo de exportação
// e exibição dos dados na tela. (Etapa 1)

import { useContext, useState } from 'react'
import myStyle from "./etapas.module.css"
import {CSVContext} from "../../../contexts/csvContext"
import { PerfilContext } from '@/pages/contexts/perfilContext'

export default function Etapa1(){

    const [dadoFile, setDadoFile] = useState({fileName: "", fileContent: "",})

    //Ler os dados da Encomenda Ativo do Contexto Atual
    const {encomendaAtiva} = useContext(PerfilContext) 

    //Ler os dados do arquivo CSV de importação
    const { dadosCSV, 
            setDadosCSV, 
            setNomeDesenho,
            setTituloDesenho,
            setPesoTotal,
            setStatusPai
    } = useContext(CSVContext)

    //Função para abrir o arquivo csv e ler o conteudo
    async function handleFile(ev) {
  
        const file = ev.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {

            //Recupera os dados do arquivo
            setDadoFile({
                fileName: file.name,
                fileContent: reader.result,
            })
            const NomeD =  file.name.split("-R",1)
            //Salva no contexto o nome e titulo do desenho
            setNomeDesenho(va => va = NomeD[0])
            buscaTitulo(NomeD[0]);
            buscaStatusPai(NomeD[0]);
            //Executa a função que transforma o texto em
            // um array de elementos dos itens para salvar
            // na variavel dados
            const dados = parseCSV(reader.result,NomeD[0] )
            //Salva os dados no contexto
            setDadosCSV(va => va = dados)
            //Calcula o peso total e salva no contexto
            calculaPeso(dados)

        }
        reader.onerror = () => {
            console.log('Error', reader.error)
        }
    }

    //Função que calcula o peso total dos itens
    //filhos do elemento Pai e salva no Contexto
    function calculaPeso(dados)
    {
          const pesoTotal = dados?.reduce(
           function(acumulador, valorAtual) {
             if(valorAtual?.Sel ){
               if(parseFloat(valorAtual?.PesoTot) > 0){
                 return acumulador + parseFloat(valorAtual?.PesoTot);
               }else{
                 return acumulador
               }
             }else{
               return acumulador
             }
           }, 0.0
         )
         setPesoTotal(va => va = pesoTotal)
    }
    
    //Consulta na api para retornar o titulo do desenho
    //e salvar no contexto
    const buscaTitulo = async (name) => {
        let json = [{}]
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                desenho: name,          
            })
        };
        try {
            const response = await fetch('/api/estruturaControle/tituloDesenho', requestOptions )
            json = await response.json()
            setTituloDesenho(va => va = json[0]?.titulo)
        } catch (error) {
            setTituloDesenho(va => va = "")
        }
    };

    //Consulta na api para retornar a situação atual
    //do item (PAI) se mesmo já estiver cadastrado
    const buscaStatusPai = async (name) => {
        let json = [{}]
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                idEncomenda: encomendaAtiva.idEncomenda,  
                desenho: name,
                grpos: ""          
            })
        };
        try {
            const response = await fetch('/api/estruturaControle/verificaItem', requestOptions )
            json = await response.json()
            setStatusPai(va => va = json)
        } catch (error) {
            setStatusPai(va => va = -1)
        }
    };

    //Função que transformar os dados do texto
    //em um array de Itens
    function parseCSV(text, pDesenho){
        const dados = [];
        //Efetua a leitura das linhas
        const result = text.split('\n')
        let id = 0;
        //Laço para ler todas as linhas e salvar em um array de Itens
        result.map((linha) => {
            const dado = {
                id: 0,
                Sel: false,
                SelGrupo: false,
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
                Desenho: "",
                StatusItem: -1,
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
            dado.Peso = parseFloat(dadoLinha[6]);
            dado.PesoTot = parseFloat(dadoLinha[6]);
            dado.Desenho = pDesenho;
            id ++;
            //Tem Grupo
            if(dado.Grupo !== undefined && dado.Grupo.trim() > ""){
                //Não tem Posição
                if(dado.Posicao === undefined || dado.Posicao.trim() === "" ){
                    dado.Tipo = "E" //Tipo Elemento
                    dado.Unidade = "CJ"
                    dado.Sel = true
                }
                //Tem posição
                else{
                    dado.Tipo = "S" //Tipo SubItem
                    dado.Unidade = "PÇ"
                }
            }
            //Não tem Grupo
            else{
                //Tem posição
                if(dado.Posicao  !== undefined && dado.Posicao.trim() > ""){
                    dado.Tipo = "E" //Tipo Elemento
                    dado.Unidade = "PÇ"
                    dado.Sel = true
                }
                //Não tem posição
                else{
                    dado.Tipo = "N" //Tipo Nulo
                }
            }
            //dado.StatusItem = buscaStatusItem(dado?.Desenho, dado?.Grupo + dado?.Posicao)
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
                                        item?.Tipo === "S"  &&  (isNaN(item?.Peso) ? 0 : item?.Peso)
                                    }</td>
                                    <td width="10%">{
                                        item?.Tipo === "E" && (isNaN(item?.Peso) ? 0 : item?.Peso)
                                    }</td>                           
                                </tr>  
                            ))  
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