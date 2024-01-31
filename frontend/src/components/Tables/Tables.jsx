import React from "react";

const Tables = ({ children, scroll }) => {
  return (
    <div className="overflow-auto border border-primaryBorder py-4 px-6">
      <table className={` ${scroll ? "w-[150%]" : "w-full"} table-fixed text-left overflow-auto`}>
        {children}
      </table>
    </div>
  );
};

export default Tables;
