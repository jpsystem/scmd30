import { useState } from "react"
import myStyle from "./index.module.css"
import Button from "@/componentes/button";

export default function TravarETC({ setModalOpen, retornoTrava}){
  const motivos = ["ENGENHARIA", "FORNECEDOR", "SUPRIMENTOS"]

  const [motivo, setMotivo]=useState("ENGENHARIA");
  const [descricao, setDescricao] = useState("");

  const controle = async (opcao) =>{
    //Opção 1 nova revisão
    if(opcao === 1){
      if(descricao.length === 0){
        alert("É obrigatório a descrição do motivo da revisão!");
        return
      }else{
        retornoTrava({
          novaRevisao: true,
          Motivo: motivo,
          Descricao: descricao
        });
      }
    }
    //Opção 2 sem nova revisão
    if(opcao ===2){
      retornoTrava({
        novaRevisao: false,
        Motivo: "",
        Descricao: ""
      });
    }
    setModalOpen(false);
  }

  return(
    <>
    <div className={myStyle.corpo}>
      <div className={myStyle.grupoC} style={{marginTop: "20px"}} >
        <label className={myStyle.titleGroupS}>MOTIVO:</label>
        <div className={myStyle.grupoSR}>
          <div className={myStyle.customRadio}>
            <input type="radio" defaultChecked name="motivos" id="ENGENHARIA" value="ENGENHARIA" onChange={(e)=>{setMotivo(e.target.value)}} />
            <label htmlFor="ENGENHARIA">ENGENHARIA</label>
          </div> 
          <div className={myStyle.customRadio}>
            <input type="radio" name="motivos" id="FORNECEDOR" value="FORNECEDOR" onChange={(e)=>{setMotivo(e.target.value)}} />
            <label htmlFor="FORNECEDOR">FORNECEDOR</label>
          </div>
          <div className={myStyle.customRadio}>
            <input type="radio" name="motivos" id="SUPRIMENTOS" value="SUPRIMENTOS" onChange={(e)=>{setMotivo(e.target.value)}} />
            <label htmlFor="SUPRIMENTOS">SUPRIMENTOS</label>
          </div>
        </div>     
      </div>
      {/* GRUPO 05 */}
      <div className={myStyle.grupoR}>
          <div className={myStyle.grupoC}>
              <label className={myStyle.label}>
                  Descrição do motivo da revisão
              </label>
              <textarea
                  id="descricao" 
                  className={myStyle.text}
                  onChange={(e)=>{setDescricao(e.target.value)}}
              />
          </div>
      </div>

      {/* GRUPO Botões */}
      <div className={myStyle.grupoR} style={{marginTop: "30px"}}>
        <Button onClick={() => controle(2)}
                fontSize="1.2rem" width="400px">
          Manter a mesma revisão
        </Button>
        <Button  onClick={() => controle(1)}
                 fontSize="1.2rem" width="200px">
          Salvar
        </Button>
        <Button  onClick={() => setModalOpen(false)}
                 fontSize="1.2rem" width="200px">
          Cancelar
        </Button>
      </div>
    </div>
    </>
  )
}