import { useState, useEffect } from "react";
import { CardArticle } from "../../components/CardArticle";
import { NavLink } from "react-router-dom";
import Footer from "../../components/Footer";
import { CardAttractionSmall } from "../../components/CardAttractionSmall";
import axios from "axios";

const LandingPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [attractions, setAttractions] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getAttractions();
  }, []);

  const getAttractions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/attractions`);
      setAttractions(response.data); // Assuming the attractions data is an array
      console.log(response);
    } catch (error) {
      console.error("Error fetching attractions:", error);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/articles`);
      setArticles(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching attractions:", error);
    }
  };

  // const handlePrev = () => {
  //   setActiveIndex((prevIndex) =>
  //     prevIndex === 0 ? images.length - 1 : prevIndex - 1
  //   );
  // };

  // const handleNext = () => {
  //   setActiveIndex((prevIndex) =>
  //     prevIndex === images.length - 1 ? 0 : prevIndex + 1
  //   );
  // };

  // useEffect(() => {
  //   // Auto change image every 5 seconds
  //   const interval = setInterval(() => {
  //     handleNext();
  //   }, 5000);

  //   // Clear the interval when the component is unmounted or when the activeIndex changes
  //   return () => clearInterval(interval);
  // }, [activeIndex]);

  return (
    <>
      <div className="w-full flex flex-col gap-28">
        {/* <div className="w-full flex flex-col md:flex-row gap-3">
          <div className="relative w-full md:w-[2140px] h-56 md:h-[500px] justify-center flex flex-col">
            <div className="relative w-full h-full overflow-hidden rounded-md">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 opacity-0 transition-opacity ${
                    index === activeIndex ? "opacity-100" : ""
                  }`}
                >
                  <img
                    src={image}
                    className="w-full h-full object-cover"
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              className="absolute top-0 left-0 h-full px-4 flex items-center justify-center cursor-pointer focus:outline-none"
              onClick={handlePrev}
            >
              
            </button>
            <button
              type="button"
              className="absolute top-0 right-0 h-full px-4 flex items-center justify-center cursor-pointer focus:outline-none"
              onClick={handleNext}
            >
             
            </button>
          </div>
          <div className="w-full flex md:flex-col items-center justify-between gap-3 md:gap-0">
            <img
              src="https://res.cloudinary.com/dzisbnmi0/image/upload/v1700667556/cld-sample-5.jpg"
              alt=""
              className="w-full h-24 md:h-[240px] md:w-full object-cover rounded-md"
            />

            <img
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
              alt=""
              className="w-full h-24 md:h-[240px] md:w-full object-cover rounded-md"
            />
          </div>
        </div> */}
        <div className="bg-cover bg-[url(https://static.republika.co.id/uploads/images/inpicture_slide/foto-kompleks-makam-sunan-muria-salah-satu-walisongo-yang-_160812200449-897.jpg)] bg-center w-screen h-screen mix-blend-darken flex justify-center items-center">
          <div className=" bg-black bg-opacity-50 flex items-center justify-center w-screen h-screen">
            <div className="text-white text-center">
              <h1 className="text-4xl font-bold mb-4">
                Selamat Datang di Desa Wisata Colo
              </h1>
              <p className="text-lg">
                Temukan keindahan dan pesona alam yang luar biasa.
              </p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-6 rounded-full">
                Jelajahi Sekarang
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-5 justify-center px-9 items-center">
          <div className="text-2xl border-b-4 w-96 flex justify-center pb-3 font-bold mb-2">
            Destinasi Wisata
          </div>

          {/* <div className="flex justify-center items-center gap-5 w-full">
            <CardWisata category="wisata religi" nama="Masjid Kudus" />

            <CardWisata category="wisata religi" nama="Masjid Kudus" />

            <CardWisata category="wisata religi" nama="Masjid Kudus" />
          </div> */}
          <div className="flex justify-center items-center h-full w-screen">
            <div className="flex justify-center items-center flex-wrap md:flex-row gap-5 px-5">
              {attractions.map((attraction) => (
                <CardAttractionSmall
                  key={attraction.id}
                  payloads={attraction}
                />
              ))}
            </div>
          </div>
          <NavLink
            to={"/destinasi-wisata"}
            className=" bg-cyan-600 items-center justify-center flex rounded-full text-white p-3"
          >
            Lihat selengkapnya
          </NavLink>
        </div>

        <div className="flex w-full flex-col justify-center px-9 items-center mb-4">
          <h2 className="text-2xl font-bold mb-4">Artikel & Berita</h2>

          <div className="flex flex-col md:flex-row justify-center items-center gap-5 w-full">
            {articles.map((article) => (
              <CardArticle key={article.id} payloads={article} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
