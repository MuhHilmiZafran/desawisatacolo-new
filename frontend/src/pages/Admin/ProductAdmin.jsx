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

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [productId, setProductId] = useState("");


  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`);
      setProducts(response.data); // Assuming the products data is an array
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/products/${productId}`
      );

      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.log(error);
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

  const handleOpenModalEdit = (productId) => {
    setIsShowModalEdit(true);
    setProductId(productId);
  };

  const handleShowModalEdit = (showModal) => {
    setIsShowModalEdit(showModal);
    setProductId("");
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
            {products.map((product) => (
              <TableRow scope="row" key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td className="truncate">{product.description}</td>
                <td>{product.price}</td>
                <td>{product.amount}</td>

                <td>
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
                          onClick={() => deleteProduct(product.id)}
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
      </div>
      <AddProductModal
        openModal={isShowModalAdd}
        onClose={() => {
          setIsShowModalAdd(false);
        }}
        // updateData={fetchAllArticles}
      />
      <EditProductModal
        openModal={isShowModalEdit}
        onClose={handleShowModalEdit}
        productId={productId}
        // updateData={fetchAllArticles}
      />
    </div>
  );
};

export default ProductAdmin;
