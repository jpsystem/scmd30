import React, { useEffect, useState } from "react";

import styles from "./index.module.css";
import Button from "@/componentes/button";

const TableFooter = ({ range, setPage, page, slice }) => {

  const [numeroPage, setNumeroPage] = useState(page);

  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  //Função para recarregamento da página
  const controle = (acao) =>{
    let novaPagina = page
    if(acao === 1){
      novaPagina ++
    }
    if(acao === 2){
      novaPagina --
    }
    if(acao === 3){
      novaPagina = numeroPage
    }
    if(novaPagina < 1){
      novaPagina = 1;
    }
    if(novaPagina > range.length){
      novaPagina = range.length;
    }
    setNumeroPage(novaPagina);
    setPage(novaPagina)
    return
  }

  //Função para permitir digitar apenas numeros no imput
  const soNumero = (e)=>{
    let valor = e.target.value;
    valor = valor.replace(/[^0-9]/g,"")
    setNumeroPage(valor);
    return
  }

  //Função para ir para a página digitada
  const vaiPagina= (e)=>{
    let myTecla = e.key;
    if(myTecla === "Enter"){
      controle(3);
    }
    return
  }

  return (
    <div className={styles.tableFooter}>
      {/* Voltar Página */}
      <Button 
        style={{width: "300px"}} 
        onClick={() => controle(2)} 
      >
        {"<< Anterior"}
      </Button>
      {/* Posicao das páginas */}
      <div className={styles.grupoR}>
        <input 
          id="t1" 
          value={numeroPage} 
          onChange={(e) => soNumero(e)} 
          onKeyUp={(e) => vaiPagina(e)} />
        <span>/</span>
        <input value={range.length} disabled/>
      </div>
      {/* Avançar Página */}
      <Button 
        style={{width: "300px"}}
        onClick={() => controle(1)} 
      >
        {"Proxima >>"}
      </Button>
    </div>
  );
};

export default TableFooter;