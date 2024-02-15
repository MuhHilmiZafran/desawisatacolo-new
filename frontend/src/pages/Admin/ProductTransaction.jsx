import React, { useEffect, useState } from "react";
import Tables from "../../components/Tables/Tables";
import TableHeader from "../../components/Tables/TableHeader";
import TableBody from "../../components/Tables/TableBody";
import SearchBar from "../../components/SearchBar";
import ButtonPrimary from "../../components/ButtonPrimary";
import axios from "axios";
import ModalProofPayment from "../../components/ModalProofPayment";
import { InsertPhotoOutlined } from "@mui/icons-material";
import ModalWaybill from "../../components/ModalWaybill";

const ProductTransaction = () => {
  const [productTransactions, setProductTransactions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [isShowModalWaybill, setIsShowModalWaybill] = useState(false);
  const [users, setUsers] = useState([]);
  const [product, setProduct] = useState([]);
  const [orderId, setOrderId] = useState(0);
  const [proofPayment, setProofPayment] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const filteredData = productTransactions.filter((order) =>
    searchValue
      ? product[productTransactions.indexOf(order)]?.name
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        users[productTransactions.indexOf(order)]?.email
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      : true
  );

  useEffect(() => {
    getProductTransactions();
  }, [currentPage]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getProductTransactions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/product-transactions`
      );
      setProductTransactions(response.data);
      // Fetch users and tour packages for each order
      response.data.forEach(async (order) => {
        await getProductById(order.product_id);
        await getUserById(order.user_id);
      });
    } catch (error) {
      console.error("Error fetching TourPackage:", error);
    }
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentItems = filteredData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const getProductById = async (productId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/products/${productId}`
      );
      setProduct((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error fetching TourPackage:", error);
    }
  };

  const getUserById = async (userId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/${userId}`
      );
      setUsers((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error fetching TourPackage:", error);
    }
  };

  const confirmOrder = (orderid) => {
    fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/product-transactions/${orderid}/confirm`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const handleSearchProduct = (event) => {
    const keyword = event.target.value.toLowerCase();

    if (keyword.trim() === "") {
      // If the search input is empty, reset to the original productTransactions array
      getProductTransactions();
    } else {
      // Filter the productTransactions based on both tourPackages name and user email
      const filteredTransactions = productTransactions.filter((order) => {
        const productName =
          product[productTransactions.indexOf(order)]?.name.toLowerCase();
        const userEmail =
          users[productTransactions.indexOf(order)]?.email.toLowerCase();

        return productName.includes(keyword) || userEmail.includes(keyword);
      });

      setProductTransactions(filteredTransactions);
    }

    setSearchValue(keyword);
  };

  const handleOpenModalEdit = (orderid) => {
    setIsShowModalAdd(true);
    setProofPayment(orderid);
  };

  const handleShowModalEdit = (showModal) => {
    setIsShowModalAdd(showModal);
    setProofPayment("");
  };

  const handleOpenModalWaybill = (orderid) => {
    setIsShowModalWaybill(true);
    setOrderId(orderid);
  };

  const handleShowModalWaybill = (showModal) => {
    setIsShowModalWaybill(showModal);
    setOrderId("");
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <SearchBar
          className="focus:outline-none text-neutralMediumLow"
          placeholder="Pencarian"
          value={searchValue}
          onChange={handleSearchProduct}
        />
      </div>
      <div>
        <Tables scroll={true}>
          <TableHeader>
            <th className="py-2 px-4 border-b">No</th>
            <th className="py-2 px-4 border-b">Nama Oleh-oleh</th>
            <th className="py-2 px-4 border-b">Pemesan</th>
            <th className="py-2 px-4 border-b">Jumlah</th>
            <th className="py-2 px-4 border-b">Alamat</th>
            <th className="py-2 px-4 border-b">Total Bayar</th>
            <th className="py-2 px-4 border-b">Bukti Pembayaran</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Action</th>
            <th className="py-2 px-4 border-b">No. resi</th>
          </TableHeader>
          <TableBody>
            {currentItems.map((order, index) => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{product[index]?.name}</td>
                <td className="py-2 px-4 border-b">{users[index]?.email}</td>
                <td className="py-2 px-4 border-b text-center">
                  {order.amount}
                </td>
                <td className="py-2 px-4 border-b">{order.alamat}</td>
                <td className="py-2 px-4 border-b">{order.total_price}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex flex-row gap-2">
                    {order.image != null && (
                      <ButtonPrimary
                        onClick={() => {
                          handleOpenModalEdit(order.image);
                        }}
                        className="w-full h-8 rounded-sm border justify-center items-center flex gap-x-2"
                      >
                        <span className="text-sm font-medium">
                          <InsertPhotoOutlined />
                        </span>
                      </ButtonPrimary>
                    )}
                  </div>
                </td>
                <td className="py-2 px-4 border-b">{order.status}</td>

                <td className="py-2 px-4 border-b">
                  <div className="flex flex-row gap-2">
                    {order.status === "Menunggu Konfirmasi" && (
                      <ButtonPrimary
                        onClick={() => {
                          confirmOrder(order.id);
                        }}
                        className="w-full h-8 rounded-sm border justify-center items-center flex gap-x-2"
                      >
                        <span className="text-sm font-medium">Konfirmasi</span>
                      </ButtonPrimary>
                    )}
                  </div>
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex flex-row gap-2">
                    {order.status === "Terkonfirmasi" && (
                      <ButtonPrimary
                        onClick={() => {
                          handleOpenModalWaybill(order.id);
                        }}
                        className="w-full h-8 rounded-sm border justify-center items-center flex gap-x-2"
                      >
                        <span className="text-sm font-medium">Kirim Resi</span>
                      </ButtonPrimary>
                    )}

                    {order.status === "Terkirim" && order.resi !== "" && <div>{order.no_resi}</div>}
                    {order.status === "Selesai" && order.resi !== "" && <div>{order.no_resi}</div>}
                  </div>
                </td>
              </tr>
            ))}
          </TableBody>
        </Tables>
        <div className="flex justify-center mt-5">
          <button
            className="mr-2 hover:text-blue-500 text-[12px] sm:text-[16px]"
            disabled={currentPage === 1}
            onClick={(e) => handlePageChange(e, currentPage - 1)}
          >
            Previous
          </button>
          {[...Array(Math.ceil(filteredData.length / itemsPerPage)).keys()]
            .slice(
              // Display only 3 pages on mobile and 10 pages on desktop
              Math.max(
                0,
                Math.min(
                  currentPage - Math.ceil(windowWidth <= 768 ? 2 : 5),
                  Math.ceil(filteredData.length / itemsPerPage) -
                    (windowWidth <= 768 ? 3 : 10)
                )
              ),
              Math.max(
                0,
                Math.min(
                  currentPage - Math.ceil(windowWidth <= 768 ? 2 : 5),
                  Math.ceil(filteredData.length / itemsPerPage) -
                    (windowWidth <= 768 ? 3 : 10)
                )
              ) + (windowWidth <= 768 ? 3 : 10)
            )
            .map((number) => (
              <button
                key={number}
                className={`mx-1 px-3 py-2 border rounded text-[12px] sm:text-[16px] hover:bg-blue-500 hover:text-white ${
                  currentPage === number + 1 ? "bg-blue-500 text-white" : ""
                }`}
                onClick={(e) => handlePageChange(e, number + 1)}
              >
                {number + 1}
              </button>
            ))}
          <button className="text-center">...</button>
          <button
            className="ml-2 mx-1 px-3 py-2 rounded border hover:bg-blue-500 hover:text-white mr-1 text-[12px] sm:text-[16px]"
            onClick={(e) =>
              handlePageChange(e, Math.ceil(filteredData.length / itemsPerPage))
            }
          >
            {Math.ceil(filteredData.length / itemsPerPage)}
          </button>
          <button
            className="ml-2 hover:text-blue-500 mr-5 text-[12px] sm:text-[16px]"
            disabled={
              currentPage === Math.ceil(filteredData.length / itemsPerPage)
            }
            onClick={(e) => handlePageChange(e, currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
      <ModalProofPayment
        openModal={isShowModalAdd}
        handleClose={() => {
          setIsShowModalAdd(false);
        }}
        url={proofPayment}
      />
      <ModalWaybill
        openModal={isShowModalWaybill}
        handleClose={() => {
          setIsShowModalWaybill(false);
        }}
        orderId={orderId}
        updateData={getProductTransactions}
      />
    </div>
  );
};

export default ProductTransaction;
