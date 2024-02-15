import { useEffect, useState } from "react";
import { CardDashboard } from "../../components/CardDashboard";
import SearchBar from "../../components/SearchBar";
import Tables from "../../components/Tables/Tables";
import TableHeader from "../../components/Tables/TableHeader";
import TableBody from "../../components/Tables/TableBody";
import axios from "axios";

const DashboardAdmin = () => {
  const [countAttractions, setCountAttractions] = useState({
    total_attractions: 0,
  });
  const [countTourPackages, setCountTourPackages] = useState({
    total_tour_packages: 0,
  });
  const [countProducts, setCountProducts] = useState({ total_product: 0 });
  const [countArticles, setCountArticles] = useState({ total_articles: 0 });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleSearchArticle = (event) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword);
    setSearchValue(keyword);
  };

  useEffect(() => {
    getAttractions();
    getTourPackages();
    getProducts();
    getArticles();
  }, []);

  const getAttractions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/attractions/count`
      );
      console.log(response.data.data);
      if (response.data.data.total_attractions > 0) {
        setCountAttractions(response.data.data);
      } else {
        setCountAttractions({ total_attractions: 0 });
      }
    } catch (error) {
      console.error("Error fetching attractions:", error);
    }
  };
  const getTourPackages = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/tour-packages/count`
      );
      console.log(response.data.data);
      if (response.data.data.total_tour_packages > 0) {
        setCountTourPackages(response.data.data);
      } else {
        setCountTourPackages({ total_tour_packages: 0 });
      }
    } catch (error) {
      console.error("Error fetching attractions:", error);
    }
  };
  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/products/count`
      );
      console.log(response.data.data);
      if (response.data.data.total_product > 0) {
        setCountProducts(response.data.data);
      } else {
        setCountProducts({ total_product: 0 });
      }
    } catch (error) {
      console.error("Error fetching attractions:", error);
    }
  };
  const getArticles = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/articles/count`
      );
      if (response.data.data.total_articles > 0) {
        setCountArticles(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching attractions:", error);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5">
        <CardDashboard
          count={countAttractions?.total_attractions}
          name={"Obyek Wisata"}
        />
        <CardDashboard
          count={countTourPackages?.total_tour_packages}
          name={"Paket Wisata"}
        />
        <CardDashboard count={countProducts?.total_product} name={"Produk"} />
        <CardDashboard count={countArticles?.total_articles} name={"Artikel"} />
      </div>
      {/* <div>
        <SearchBar
          className="focus:outline-none w-72 text-neutralMediumLow"
          placeholder="Find something here ..."
          value={searchValue}
          onChange={handleSearchArticle}
        />
      </div> */}
      {/* <div>
        <Tables scroll>
          <TableHeader>
            <th className="w-[130px]">Date</th>
            <th className="w-[130px]">Transaction id</th>
            <th className="w-[130px]">User id</th>
            <th className="w-[130px]">Counselor id</th>
            <th className="w-[130px]">Counselor Name</th>
            <th className="w-[130px]">Method</th>
            <th className="w-[130px]">Topic</th>
            <th className="w-[130px]">Time</th>
            <th className="w-[130px]">Price</th>
            <th className="w-[130px]">Status</th>
          </TableHeader>
          <TableBody>
            
          </TableBody>
        </Tables>
      </div> */}
    </div>
  );
};

export default DashboardAdmin;
