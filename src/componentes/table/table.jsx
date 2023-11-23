import React, { useState } from "react";

import useTable from "@/hooks/useTable"; 
import styles from "./index.module.css";
import TableFooter from "./TableFooter/index"; 

const Table = ({ data, rowsPerPage }) => {

  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr>
            <th className={styles.tableHeader}>Tag</th>
            <th className={styles.tableHeader}>Familia</th>
            <th className={styles.tableHeader}>Pai</th>
            <th className={styles.tableHeader}>Tipo</th>
            <th className={styles.tableHeader}>QTD</th>
            <th className={styles.tableHeader}>Uni</th>
            <th className={styles.tableHeader}>Especificação</th>
            <th className={styles.tableHeader}>Desenho</th>
            <th className={styles.tableHeader}>Grupo/Pos</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((el) => (
            <tr className={styles.tableRowItems} key={el.Elem}>
              <td className={styles.tableCell}>{el.Tag}</td>
              <td className={styles.tableCell}>{el.Familia}</td>
              <td className={styles.tableCell}>{el.Pai}</td>
              <td className={styles.tableCell}>{el.Tipo}</td>
              <td className={styles.tableCell}>{el.QTD}</td>
              <td className={styles.tableCell}>{el.Unid}</td>
              <td className={styles.tableCell}>{el.Especificacao}</td>
              <td className={styles.tableCell}>{el.DesenhoTMSA}</td>
              <td className={styles.tableCell}>{el.GrPos}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;
