import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { CardAttractionLong } from "../../components/CardAttractionLong";
import axios from "axios";
import { CardArticle } from "../../components/CardArticle";

const TouristAttraction = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/articles`);
      setArticles(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching attractions:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-5 px-6 md:px-12 py-9">
        <div className="flex flex-col gap-1">
          <div className="text-3xl font-medium">Artikel dan Berita</div>
          <div className="text-md text-slate-500">
            Berisi Artikel dan Berita tentang Desa Wisata Colo.
          </div>
        </div>
        <div className="flex gap-3">
          {articles?.map((article) => (
            <CardArticle key={article.id} payloads={article} />
          ))}
        </div>
      </div>
     
    </div>
  );
};

export default TouristAttraction;
