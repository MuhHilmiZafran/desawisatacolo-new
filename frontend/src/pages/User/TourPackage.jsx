import { useEffect, useState } from "react";
import { CardAttractionLong } from "../../components/CardAttractionLong";
import Footer from "../../components/Footer";
import SearchBar from "../../components/SearchBar";
import axios from "axios";
import { CardTourPackageLong } from "../../components/CardTourPackageLong";

const TourPackage = () => {
  const [tourPackages, setTourPackages] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getTourPackages();
  }, []);

  const getTourPackages = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/tour-packages`);
      setTourPackages(response.data);
    } catch (error) {
      console.error("Error fetching attractions:", error);
    }
  };

  const handleSearchArticle = (event) => {
    setSearchValue(event.target.value);
    if (event.target.value === "") {
      getTourPackages();
    } else {
      const filteredTourPackages = tourPackages.filter((tourPackage) =>
        tourPackage.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setTourPackages(filteredTourPackages);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-5 px-6 md:px-12 py-9">
        <div className="flex flex-col gap-1">
          <div className="text-3xl font-medium">Paket Wisata</div>
          <div className="text-md text-slate-500">
            Berisi Informasi Paket Wisata Desa Wisata Colo
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
        <div>
          {tourPackages.map((tourPackage) => (
            <CardTourPackageLong key={tourPackage.id} payloads={tourPackage} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourPackage;
