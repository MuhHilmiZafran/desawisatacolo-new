import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { MenuItem, Select } from "@mui/material";

const TableTitle = ({ title, onChange, sortBy, onSelect }) => {
  return (
    <>
      <div className="flex items-center justify-between px-8 py-4 bg-primaryPressed">
        <h2 className="text-2xl text-white">{title}</h2>
        <div className="h-14 w-[567px] relative rounded-[3px] overflow-hidden">
          <input
            className="w-full py-4 ps-16 text-[16px] tracking-[0.5px] placeholder:text-[16px] placeholder:tracking-[0.5px] placeholder:font-normal"
            type="text"
            name=""
            id=""
            placeholder="Search what you need here..."
            onChange={onChange}
          />
          <SearchIcon
            fontSize="large"
            className="absolute z-[1] left-4 top-2"
          />
        </div>
      </div>
      <div className="flex justify-end items-center py-4 gap-4">
        <span className="text-base">Sort By</span>
        <Select
          value={sortBy}
          // label="Age"
          onChange={onSelect}
          sx={{
            ".MuiSelect-select": {
              padding: "0.325rem 0.75rem",
            },
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#9E9494 !important",
              borderWidth: "1px",
            },
          }}
          MenuProps={{
            sx: {
              "&& .Mui-selected": {
                backgroundColor: "#AF1582 !important",
                color: "#FFF",
              },
              "&& .Mui-selected:hover": {
                backgroundColor: "#954E80 !important",
              },
            },
          }}
        >
          <MenuItem
            value="newest"
            sx={{
              "&:checked": {
                backgroundColor: "#AF1582 !important",
                color: "#FFF",
              },
            }}
          >
            Newest
          </MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
        </Select>
      </div>
    </>
  );
};

export default TableTitle;
