import React, { useEffect, useState } from "react";
import Tables from "../../components/Tables/Tables";
import TableHeader from "../../components/Tables/TableHeader";
import TableBody from "../../components/Tables/TableBody";
import SearchBar from "../../components/SearchBar";
import ButtonPrimary from "../../components/ButtonPrimary";
import axios from "axios";
import { set } from "react-hook-form";
import ModalProofPayment from "../../components/ModalProofPayment";
import { InsertPhotoOutlined } from "@mui/icons-material";

const ProductTransaction = () => {
  const [productTransactions, setProductTransactions] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [users, setUsers] = useState([]);
  const [product, setProduct] = useState([]);
  // const [orderid, setorderid] = useState("");
  const [proofPayment, setProofPayment] = useState("");

  useEffect(() => {
    getproductTransactions();
  }, []);

  const getproductTransactions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/product-transactions`
      );
      setProductTransactions(response.data);
      // Fetch users and tour packages for each order
      response.data.forEach(async (order) => {
        await getOrderById(order.product_id);
        await getUserById(order.user_id);
      });
    } catch (error) {
      console.error("Error fetching TourPackage:", error);
    }
  };

  const getOrderById = async (productId) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/products/${productId}`
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
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/product-transactions/${orderid}/confirm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
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
    const keyword = event.target.value;
    setSearchKeyword(keyword);
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
            <th className="py-2 px-4 border-b">Almat</th>
            <th className="py-2 px-4 border-b">Total Bayar</th>
            <th className="py-2 px-4 border-b">Bukti Pembayaran</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Action</th>
            <th className="py-2 px-4 border-b">No. resi</th>
            
          </TableHeader>
          <TableBody>
            {productTransactions.map((order, index) => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">
                  {product[index]?.name}
                </td>
                <td className="py-2 px-4 border-b">{users[index]?.email}</td>
                <td className="py-2 px-4 border-b text-center">
                  {order.amount}
                </td>
                <td className="py-2 px-4 border-b">
                  {order.alamat}
                </td>
                <td className="py-2 px-4 border-b">
                  {order.total_price}
                </td>
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
                <td className="py-2 px-4 border-b">
                  {order.status}
                </td>

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
              </tr>
            ))}
          </TableBody>
        </Tables>
      </div>
      <ModalProofPayment
        openModal={isShowModalAdd}
        handleClose={() => {
          setIsShowModalAdd(false);
        }}
        url={proofPayment}
      />
    </div>
  );
};

export default ProductTransaction;
