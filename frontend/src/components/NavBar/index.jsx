import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { AccountCircleRounded, Search } from "@mui/icons-material";
import Footer from "../Footer";
import axios from "axios";
import ButtonPrimary from "../ButtonPrimary";
import Dropdown from "../Dropdown";
import { useForm } from "react-hook-form";
import { Button, Menu, MenuItem } from "@mui/material";

const NavBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const activelink = "text-cyan-600 bg-white rounded-md py-2 px-2";
  const normalLink =
    "hover:text-cyan-600 hover:bg-white text-white rounded-md py-2 px-2";

  const { control, getValues } = useForm();

  const userData = JSON.parse(localStorage.getItem("data"));

  const email = userData?.email;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    // Close the menu when a link is clicked (optional)
    setMenuOpen(false);
  };

  const handleSearch = (event) => {
    // Handle search logic here
    // console.log("Search query:", event.target.value);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onLogout = async () => {
    try {
      await axios.get("http://localhost:8080/api/logout");

      // Handle success (redirect or show a success message)
      console.log("logout successfully");
      localStorage.removeItem("data");
      navigate("/login");
    } catch (error) {
      // Handle error (show an error message)
      console.error("Error logout data:", error);
    }
  };

  return (
    <div>
      <div
        className={`fixed w-full transition-all z-[1001] ${
          isScrolled ? "bg-teal-500" : "bg-cyan-800"
        }`}
      >
        <div className="flex w-full justify-between bg-cyan-800 items-center py-4 px-7">
          <div>
            <div className="text-xl text-white">Desa Wisata Colo</div>
            <div className="text-md text-white">Kabupaten Kudus</div>
          </div>
          {/* <div>
            <Dropdown >
              <option>Login</option>
            </Dropdown>
          </div> */}
        </div>
        <nav className="flex items-center text-md justify-between flex-wrap bg-teal-500 px-5 py-1 w-full">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? activelink + `flex items-center flex-shrink-0 px-3 mr-5`
                : normalLink +
                  `flex items-center flex-shrink-0 text-white px-3 mr-5`
            }
          >
            <HomeIcon style={{ fontSize: "1.5rem" }} />
          </NavLink>
          <div className="block md:hidden">
            <button
              onClick={handleToggleMenu}
              className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full block justify-between mt-5 flex-grow md:mt-0 md:flex md:items-center md:w-auto`}
          >
            <div className="flex flex-col items-center gap-5 w-full md:flex-row">
              <NavLink
                to="/destinasi-wisata"
                className={({ isActive }) =>
                  isActive ? activelink : normalLink
                }
                onClick={handleLinkClick}
              >
                Destinasi Wisata
              </NavLink>
              <NavLink
                to="/produk-wisata"
                className={({ isActive }) =>
                  isActive ? activelink : normalLink
                }
                onClick={handleLinkClick}
              >
                Oleh-Oleh
                {/* dropdown */}
              </NavLink>
              <NavLink
                to="/paket-wisata"
                className={({ isActive }) =>
                  isActive ? activelink : normalLink
                }
                onClick={handleLinkClick}
              >
                Paket Wisata
              </NavLink>
              <NavLink
                to="/artikel"
                className={({ isActive }) =>
                  isActive ? activelink : normalLink
                }
                onClick={handleLinkClick}
              >
                Artikel
              </NavLink>
              {/* <NavLink
                to="/galeri"
                className={({ isActive }) =>
                  isActive ? activelink : normalLink
                }
                onClick={handleLinkClick}
              >
                Galeri
              </NavLink> */}

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? activelink : normalLink
                }
                onClick={handleLinkClick}
              >
                About
              </NavLink>

              {/* <NavLink
                to="/reservasi/riwayat"
                className={({ isActive }) =>
                  isActive ? activelink : normalLink
                }
                onClick={handleLinkClick}
              >
                Reservasi
              </NavLink>
              <NavLink
                to="/produk/riwayat"
                className={({ isActive }) =>
                  isActive ? activelink : normalLink
                }
                onClick={handleLinkClick}
              >
                History Oleh-Oleh
              </NavLink> */}
              <div>
                <div
                  // aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  cursor="pointer"
                  className="flex pointer-events-auto items-center justify-center flex-shrink-0 px-3 mr-5"
                >
                  <p className="text-white text-uppercas cursor-pointer">
                    Riwayat
                  </p>
                </div>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <NavLink to="/reservasi/riwayat">Reservasi</NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <NavLink to="/produk/riwayat">Order Oleh-Oleh</NavLink>
                  </MenuItem>
                </Menu>
              </div>
            </div>
            {/* <div className="flex justify-center bg-white items-center h-9 w-96 rounded-lg mt-5 md:mt-0 ps-2">
              <input
                type="text"
                placeholder="Search"
                onChange={handleSearch}
                className="w-full ps-1 focus:outline-none"
              ></input>
              <Search
                className="text-cyan-600"
                style={{ fontSize: "1.5rem" }}
              />
            </div> */}
            <div>
              {email ? (
                <div className="flex flex-row gap-2">
                  <div className="text-white text-uppercas cursor-pointer">
                    {email}
                  </div>
                  <ButtonPrimary
                    onClick={onLogout}
                    className="w-full h-8 rounded-sm border justify-center items-center flex gap-x-2"
                  >
                    <span className="text-sm font-medium">Logout</span>
                  </ButtonPrimary>
                </div>
              ) : (
                <div className="flex flex-row gap-2">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? activelink : normalLink
                    }
                    onClick={handleLinkClick}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/registrasi"
                    className={({ isActive }) =>
                      isActive ? activelink : normalLink
                    }
                    onClick={handleLinkClick}
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
      <div className="pt-32 -z-10">
        <div>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default NavBar;
