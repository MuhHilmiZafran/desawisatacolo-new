import React from "react";

const TableRow = ({ children }) => {
  return <tr className="h-[64px] overflow-auto">{children}</tr>;
};

export default TableRow;
