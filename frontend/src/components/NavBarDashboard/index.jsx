import { PersonRounded } from "@mui/icons-material";

const NavBarDashboard = ({ page }) => {
  return (
    <div className="flex items-center justify-between bg-primaryPressed px-9 py- -z-10 gap-1 border-b-[2px]">
      <h2 className="text-2xl text-cyan-600">{page}</h2>
      <div className="flex gap-3 py-4">
        
        <p className="text-primaryMain font-medium">Hello, Admin</p>
      </div>
    </div>
  );
};

export default NavBarDashboard;
