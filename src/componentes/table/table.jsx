import React, { useState } from "react";
import Image from "next/image";
import useTable from "@/hooks/useTable"; 
import styles from "./index.module.css";
import TableFooter from "./TableFooter/index"; 
import BotonExcelDefault from "../excel";

const Table = ({ data, rowsPerPage }) => {

  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);

  return (
    <>
      <div className={styles.cabecalho}>
        <div className={styles.item1}>                
          <Image src="/images/LogoTMSA_Site.jpg" priority={false} width="200" height="60" alt="Logo TMSA"/>
        </div>
        <div className={styles.item2}>                
            Estrutura de Controle
        </div>
        <div className={styles.item3}>                
          <BotonExcelDefault dados={data} />
        </div>
      </div>
      <div className={styles.resultado}>
        <table className={styles.tabela}>
            <thead>
              <tr>
                <th width="200px" className={styles.tableHeader}>Tag</th>
                <th width="200px" className={styles.tableHeader}>Familia</th>
                <th width="100px" className={styles.tableHeader}>Pai</th>
                <th width="100px" className={styles.tableHeader}>Tipo</th>
                <th width="100px" className={styles.tableHeader}>QTD</th>
                <th width="100px" className={styles.tableHeader}>Uni</th>
                <th width="600px" className={styles.tableHeader}>Especificação</th>
                <th width="300px" className={styles.tableHeader}>Desenho</th>
                <th width="200px" className={styles.tableHeader}>Grupo/Pos</th>
                <th width="200px" className={styles.tableHeader}>Peso Total</th>
                <th width="100px" className={styles.tableHeader}>ETC</th>
                <th width="200px" className={styles.tableHeader}>Data ETC</th>
              </tr>
            </thead>
            <tbody>
              {slice.map((el) => (
                <tr className={styles.tableRowItems} key={el.Elem}>
                  <td width="200px" className={styles.tableCell}>{el.Tag}</td>
                  <td width="200px" className={styles.tableCell}>{el.Familia}</td>
                  <td width="100px" className={styles.tableCell}>{el.Pai}</td>
                  <td width="100px" className={styles.tableCell}>{el.Tipo}</td>
                  <td width="100px" className={styles.tableCell}>{el.QTD}</td>
                  <td width="100px" className={styles.tableCell}>{el.Unid}</td>
                  <td width="600px" className={styles.tableCell}>{el.Especificacao}</td>
                  <td width="300px" className={styles.tableCell}>{el.DesenhoTMSA}</td>
                  <td width="200px" className={styles.tableCell}>{el.GrPos}</td>
                  <td width="200px" className={styles.tableCell}>{el.PesoTotal}</td>
                  <td width="100px" className={styles.tableCell}>{el.ETC}</td>
                  <td width="200px" className={styles.tableCell}>{el.DataETC}</td>
                </tr>
              ))}            
            </tbody>
        </table>        
      </div>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;
