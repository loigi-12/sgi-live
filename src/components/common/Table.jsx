import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = ({ columns, sortColumn, data }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
