import React, { useEffect, useState } from "react";
import Tables from "../../components/Tables/Tables";
import TableHeader from "../../components/Tables/TableHeader";
import TableBody from "../../components/Tables/TableBody";
import SearchBar from "../../components/SearchBar";
import { Add, Comment, Delete, Edit } from "@mui/icons-material";
import ButtonPrimary from "../../components/ButtonPrimary";
import axios from "axios";
import TableRow from "../../components/Tables/TableRow";
import AddProductModal from "../../components/AddProductModal";
import EditProductModal from "../../components/EditProductModal";
import DeleteModal from "../../components/DeleteModal";
import Popup from "../../components/Popup";

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [productId, setProductId] = useState("");
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const [isPopup, setIsPopup] = useState(false);
  const [popupSuccess, setPopupSuccess] = useState(true);
  const [popupMessage, setPopupMessage] = useState("success");
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const filteredData = products.filter((product) =>
    searchValue
      ? product.name.toLowerCase().includes(searchValue.toLowerCase())
      : true
  );

  useEffect(() => {
    getProducts();
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

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/products`
      );
      setProducts(response.data); // Assuming the products data is an array
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentItems = filteredData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePopup = (type, message) => {
    setIsPopup(true);
    setPopupSuccess(type);
    setPopupMessage(message);
    setTimeout(function () {
      setIsPopup(false);
    }, 2000);
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/products/${productId}`
      );

      console.log(response.data);
      handlePopup(true, "Hapus Data Berhasil");
      getProducts();
    } catch (error) {
      console.log(error);
      handlePopup(false, "Hapus Data Gagal");
    }
  };

  const handleSearchProduct = (event) => {
    setSearchValue(event.target.value);
    if (event.target.value === "") {
      getProducts();
    } else {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setProducts(filteredProducts);
    }
  };

  const handleOpenModalDelete = (productId) => {
    setIsShowModalDelete(true);
    setProductId(productId);
  };

  const handleShowModalDelete = (showModal) => {
    setIsShowModalDelete(showModal);
    setProductId("");
  };

  const handleOpenModalEdit = (productId) => {
    setIsShowModalEdit(true);
    setProductId(productId);
  };

  const handleShowModalEdit = (showModal) => {
    setIsShowModalEdit(showModal);
    setProductId("");
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Popup isSuccess={popupSuccess} isOpen={isPopup} message={popupMessage} />

      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <SearchBar
            className="focus:outline-none text-neutralMediumLow"
            placeholder="Pencarian"
            value={searchValue}
            onChange={handleSearchProduct}
          />
          <div className="flex justify-center">
            <ButtonPrimary
              onClick={() => {
                setIsShowModalAdd(true);
              }}
              className="w-full h-8 rounded-sm border justify-center items-center flex gap-x-2"
            >
              <Add style={{ fontSize: "1rem" }} />

              <span className="text-sm font-medium">Tambah Oleh-oleh</span>
            </ButtonPrimary>
          </div>
        </div>
        <div>
          <Tables>
            <TableHeader>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Nama Produk</th>
              <th className="py-2 px-4 border-b">Deskripsi</th>
              <th className="py-2 px-4 border-b">Harga</th>
              <th className="py-2 px-4 border-b">Stok</th>
              <th className="py-2 px-4 border-b">Action</th>
            </TableHeader>
            <TableBody>
              {currentItems?.map((product) => (
                <TableRow scope="row" key={product.id}>
                  <td className="py-2 px-4 border-b">{product.id}</td>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="truncate py-2 px-4 border-b">
                    {product.description}
                  </td>
                  <td className="py-2 px-4 border-b">{product.price}</td>
                  <td className="py-2 px-4 border-b">{product.amount}</td>

                  <td className="py-2 px-4 border-b">
                    <div>
                      <div className="flex flex-row py-[8px] gap-x-4 justify-end">
                        <div className="columns">
                          <ButtonPrimary
                            className="w-full h-2 rounded-sm border text-green-600 border-green-600 justify-center items-center flex outline-green-600 hover:bg-green-300"
                            onClick={() => handleOpenModalEdit(product.id)}
                          >
                            <Edit style={{ fontSize: "1rem" }} />
                            {/* <span className="text-sm font-medium">Edit</span> */}
                          </ButtonPrimary>
                        </div>
                        <div className="columns">
                          <ButtonPrimary
                            className="w-full h-2 rounded-sm border text-red-600 border-red-600 justify-center items-center flex outline-red-600 hover:bg-red-300"
                            onClick={() => handleOpenModalDelete(product.id)}
                          >
                            <Delete style={{ fontSize: "1rem" }} />
                            {/* <span className="text-sm font-medium">Delete</span> */}
                          </ButtonPrimary>
                        </div>
                      </div>
                    </div>
                  </td>
                </TableRow>
              ))}
            </TableBody>
          </Tables>
          {/* Pagination component */}
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
                handlePageChange(
                  e,
                  Math.ceil(filteredData.length / itemsPerPage)
                )
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
        <AddProductModal
          openModal={isShowModalAdd}
          onClose={() => {
            setIsShowModalAdd(false);
          }}
          updateData={getProducts}
        />
        <EditProductModal
          openModal={isShowModalEdit}
          onClose={handleShowModalEdit}
          productId={productId}
          updateData={getProducts}
        />
        <DeleteModal
          modalState={isShowModalDelete}
          closeModal={handleShowModalDelete}
          onSure={() => deleteProduct(productId)}
        />
      </div>
    </>
  );
};

export default ProductAdmin;
