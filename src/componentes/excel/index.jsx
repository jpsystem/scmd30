import React, { useState } from "react";
// import { Button, Spinner } from "reactstrap";
import BtExcel from "../btexcel";
import * as XLSX from "xlsx";
import { JPConversoes } from "@/jpFuncoes/convercoes";

const BotonExcelDefault = ({ dados }) => {
  const [loading, setLoading] = useState(false);

  let nomeArquivo = JPConversoes.geraChaveRel( "EstruturaControle");
  nomeArquivo += ".xlsx"

  const handleDownload = () => {
    setLoading(true);

    const libro = XLSX.utils.book_new();

    const hoja = XLSX.utils.json_to_sheet(dados);

    XLSX.utils.book_append_sheet(libro, hoja, "EstruturaControle");

    setTimeout(() => {
      XLSX.writeFile(libro, nomeArquivo);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {!loading ? (
        <BtExcel onClick={handleDownload}>
          Exportar Excel
        </BtExcel>
      ) : (
        <BtExcel disabled>
          {/* <Spinner size="sm">Loading...</Spinner> */}
          <span> Generando...</span>
        </BtExcel>
      )}
    </>
  );
};

export default BotonExcelDefault;
