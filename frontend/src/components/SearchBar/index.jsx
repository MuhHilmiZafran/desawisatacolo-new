import { SearchRounded } from "@mui/icons-material";

const SearchBar = (props) => {
  return (
    <div className="flex items-center gap-2 p-2 border rounded-sm">
      <SearchRounded />
      <input {...props} />
    </div>
  );
};

export default SearchBar;
