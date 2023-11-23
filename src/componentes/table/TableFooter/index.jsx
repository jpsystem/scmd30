import React, { useEffect } from "react";

import styles from "./index.module.css";

const TableFooter = ({ range, setPage, page, slice }) => {
  // console.log("range", range)
  // console.log("setPage", setPage)
  // console.log("page", page)
  // console.log("slice", slice)
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className={styles.tableFooter}>
      {range.map((el, index) => (
        <button
          key={index}
          className={`${styles.button} ${
            page === el ? styles.activeButton : styles.inactiveButton
          }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))}
    </div>
  );
};

export default TableFooter;