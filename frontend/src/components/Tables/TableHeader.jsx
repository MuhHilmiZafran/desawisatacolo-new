import React from "react";

const TableHeader = ({ children }) => {
  return (
    <thead>
      <tr className="h-[24px] border-b-cyan border-b text-sm text-left">{children}</tr>
    </thead>
  );
};

export default TableHeader;
