import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/SideBar";
import NavBarDashboard from "../components/NavBarDashboard";

const Dashboard = ({ page }) => {
  const [isExpand, setIsExpand] = useState(false);

  const handleExpandSidebar = (expand) => {
    setIsExpand(expand);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex">
      <Sidebar
        expand={isExpand}
        handleExpandSidebar={handleExpandSidebar}
        className="z-10"
      />
      <div className="w-full">
        <NavBarDashboard page={page} />

        <div className="h-full max-h-[550px] overflow-auto px-9 py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
