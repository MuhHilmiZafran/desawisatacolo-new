import {
  Navigate,
  RouterProvider,
  redirect,
  useNavigate,
  useParams,
} from "react-router";
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/User/LandingPage";
import Login from "./pages/User/Login";
import NavBar from "./components/NavBar";
import DashboardAdmin from "./pages/Admin/DashboardAdmin";
// import LoginAdmin from "./pages/Admin/LoginAdmin";
import Dashboard from "./layouts/Dashboard";
import { useEffect } from "react";
import TouristAttractionAdmin from "./pages/Admin/TouristAtrractionAdmin";
import ArticleAdmin from "./pages/Admin/ArticleAdmin";
import About from "./pages/User/About";
import TouristAttraction from "./pages/User/TouristAttraction";
import TouristAttractionDetail from "./pages/User/TouristAttractionDetail";
import Product from "./pages/User/Product";
import Article from "./pages/User/Article";
import Gallery from "./pages/User/Gallery";
import ProductAdmin from "./pages/Admin/ProductAdmin";
import ProductTransaction from "./pages/Admin/ProductTransaction";
import TourPackageAdmin from "./pages/Admin/TourPackageAdmin";
import TourPackageReservation from "./pages/Admin/TourPackageReservation";
import ProductDetail from "./pages/User/ProductDetail";
// import Checkout from "./pages/User/Checkout";
// import CartPage from "./pages/User/Cart";
import Registrasi from "./pages/User/Registrasi";
import TourPackage from "./pages/User/TourPackage";
import TourPackageDetail from "./pages/User/TourPackageDetail";
import AdminLogin from "./pages/Admin/AdminLogin";
import { AuthProvider } from "./components/Context/AuthContext";
// import Payment from "./pages/User/Payment";
import ArticleDetail from "./pages/User/ArticelDetail";
import Reservation from "./pages/User/Reservation";
import PaymentReservation from "./pages/User/PaymentReservation";
import HistoryReservations from "./pages/User/HistoryReservations";
import HistoryTransactionsProduct from "./pages/User/HistoryTransactionsProduct";
import ProductOrder from "./pages/User/ProductOrder";
import PaymentProduct from "./pages/User/PaymentProduct";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registrasi",
    element: <Registrasi />,
  },
  {
    path: "/",
    element: <NavBar />,
    children: [
      {
        element: <LandingPage />,
        index: true,
      },

      {
        path: "/destinasi-wisata",
        element: <TouristAttraction />,
      },
      {
        path: "/detail-wisata/:id",
        element: <TouristAttractionDetail />,
      },
      {
        path: "/produk-wisata",
        element: <Product />,
      },
      {
        path: "/produk-wisata/riwayat",
        element: <HistoryTransactionsProduct />,
      },
      {
        path: "/detail-produk/:id",
        element: <ProductDetail />,
      },
      {
        path: "/produk-wisata/:id/order",
        element: <ProductOrder />,
      },
      {
        path: "/produk/pembayaran/:id",
        element: <PaymentProduct />,
      },
      // {
      //   path: "/checkout",
      //   element: <Checkout />,
      // },
      {
        path: "/paket-wisata",
        element: <TourPackage />,
      },
      {
        path: "/detail-paket-wisata/:id",
        element: <TourPackageDetail />,
      },
      {
        path: "/detail-paket-wisata/:id/reservasi",
        element: <Reservation />,
      },

      // {
      //   path: "/komoditas",
      //   element: <DetailWisata />,
      // },
      {
        path: "/artikel",
        element: <Article />,
      },
      {
        path: "/detail-artikel/:id",
        element: <ArticleDetail />,
      },
      {
        path: "/galeri",
        element: <Gallery />,
      },
      // {
      //   path: "/keranjang",
      //   element: <CartPage />,
      // },
      {
        path: "/about",
        element: <About />,
      },
      // {
      //   path: "/payment",
      //   element: <Payment />,
      // },
      {
        path: "/reservasi/pembayaran/:id",
        element: <PaymentReservation />,
      },
      {
        path: "/reservasi/riwayat",
        element: <HistoryReservations />,
      },
      {
        path: "/produk/riwayat",
        element: <HistoryTransactionsProduct />,
      },

    ],
  },
  {
    path: "/admin",
    element: <AdminRedirect />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/dashboard",
    element: <Dashboard page={"Dashboard"} />,
    children: [
      {
        element: <DashboardAdmin />,
        index: true,
      },
    ],
  },
  {
    path: "/admin/destinasi-wisata",
    element: <Dashboard page={"Destinasi Wisata"} />,
    children: [
      {
        element: <TouristAttractionAdmin />,
        index: true,
      },
    ],
  },
  {
    path: "/admin/artikel",
    element: <Dashboard page={"Artikel"} />,
    children: [
      {
        element: <ArticleAdmin />,
        index: true,
      },
    ],
  },
  {
    path: "/admin/produk-wisata",
    element: <Dashboard page={"Oleh-oleh"} />,
    children: [
      {
        element: <ProductAdmin />,
        index: true,
      },
    ],
  },
  {
    path: "/admin/transaksi-produk-wisata",
    element: <Dashboard page={"Transaksi Oleh-oleh"} />,
    children: [
      {
        element: <ProductTransaction />,
        index: true,
      },
    ],
  },
  {
    path: "/admin/paket-wisata",
    element: <Dashboard page={"Paket Wisata"} />,
    children: [
      {
        element: <TourPackageAdmin />,
        index: true,
      },
    ],
  },
  {
    path: "/admin/reservasi-paket-wisata",
    element: <Dashboard page={"Reservasi Paket Wisata"} />,
    children: [
      {
        element: <TourPackageReservation />,
        index: true,
      },
    ],
  },
]);

function AdminRedirect() {
  useEffect(() => {
    // Check if the current path is "/admin" and redirect to "/admin/login"
    if (window.location.pathname === "/admin") {
      window.location.replace("/admin/login");
    }
  }, []);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
