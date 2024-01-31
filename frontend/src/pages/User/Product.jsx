import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import Footer from "../../components/Footer";
import CardProduct from "../../components/CardProduct";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchArticle = (event) => {
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

  return (
    <div>
      <div className="flex flex-col gap-5 px-6 md:px-12 py-9">
        <div className="flex flex-col gap-1">
          <div className="text-3xl font-medium">Oleh-Oleh</div>
          <div className="text-md text-slate-500">
            Berisi Produk-produk Khas Desa Wisata Colo.
          </div>
        </div>
        <div>
          <SearchBar
            className="focus:outline-none w-full"
            placeholder="Pencarian"
            value={searchValue}
            onChange={handleSearchArticle}
          />
        </div>
        <div className="flex gap-3">
          {products.map((product) => (
            <CardProduct key={product.id} payloads={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
