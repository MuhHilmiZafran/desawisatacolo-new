import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import {
  CategoryOutlined,
  DashboardOutlined,
  DescriptionOutlined,
  Logout,
  MapOutlined,
  ReceiptLongOutlined,
  ShoppingBagOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Box } from "@mui/material";

const Sidebar = ({ expand, handleExpandSidebar }) => {
  const navigate = useNavigate();
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const activelink = "text-cyan-600 self-stretch p-2 justify-start items-center gap-1.5 inline-flex";
  const normalLink = "hover:text-cyan-600 self-stretch p-2 justify-start items-center gap-1.5 inline-flex";

  const wrapperSidebar = useRef(null);

  const onLogout = () => {
    navigate("/admin");
  };

  const handleShowModalConfirm = (showModalConfirm) => {
    setIsShowModalConfirm(showModalConfirm);
  };

  return (
    <div className="w-60 h-screen p-6 bg-white shadow flex-col justify-start items-center gap-10 inline-flex">
      <div className="px-9 py-2.5 justify-start items-start gap-2.5 inline-flex">
        <div className="text-black text-xs font-normal font-['Roboto'] leading-none">
          ADMIN
        </div>
      </div>
      <div className="self-stretch grow shrink basis-0 flex-col justify-start items-start gap-2 flex">
        <NavLink
          to={"/admin/dashboard"}
          className={({ isActive }) => (isActive ? activelink : normalLink)}
        >
          <DashboardOutlined />
          <div className="text-start text-sm font-normal font-['Roboto'] leading-none">
            Dashboard
          </div>
        </NavLink>
        <NavLink
          to={"/admin/destinasi-wisata"}
          className={({ isActive }) => (isActive ? activelink : normalLink)}
        >
          <MapOutlined />
          <div className="text-start text-sm font-normal font-['Roboto'] leading-none">
            Destinasi Wisata
          </div>
        </NavLink>
        <NavLink
          to={"/admin/artikel"}
          className={({ isActive }) => (isActive ? activelink : normalLink)}
        >
          <DescriptionOutlined />
          <div className="text-start text-sm font-normal font-['Roboto'] leading-none">
            Artikel
          </div>
        </NavLink>
        <NavLink
          to={"/admin/produk-wisata"}
          className={({ isActive }) => (isActive ? activelink : normalLink)}
        >
          <CategoryOutlined />
          <div className="text-start text-sm font-normal font-['Roboto'] leading-none">
            Oleh-oleh
          </div>
        </NavLink>
        <NavLink
          to={"/admin/transaksi-produk-wisata"}
          className={({ isActive }) => (isActive ? activelink : normalLink)}
        >
          <ShoppingBagOutlined />
          <div className="text-start text-sm font-normal font-['Roboto'] leading-none">
            Transaksi Oleh-oleh
          </div>
        </NavLink>
        <NavLink
          to={"/admin/paket-wisata"}
          className={({ isActive }) => (isActive ? activelink : normalLink)}
        >
          <ShoppingCartOutlined />
          <div className="text-start text-sm font-normal font-['Roboto'] leading-none">
            Paket Wisata
          </div>
        </NavLink>
        <NavLink
          to={"/admin/reservasi-paket-wisata"}
          className={({ isActive }) => (isActive ? activelink : normalLink)}
        >
          <ReceiptLongOutlined />
          <div className="text-start text-sm font-normal font-['Roboto'] leading-none">
            Reservasi Paket Wisata
          </div>
        </NavLink>
      </div>
      <NavLink to={"/"} className="self-stretch p-2 rounded justify-center items-center gap-2 inline-flex">
        {/* <Logout /> */}
        <div className="text-center text-neutral-600 text-xs font-normal font-['Roboto'] leading-none">
          Logout
        </div>
      </NavLink>
    </div>
  );
};

export default Sidebar;
