import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import { Add, Edit } from "@mui/icons-material";
import ButtonPrimary from "../../components/ButtonPrimary";
import axios from "axios";
import CardAttractionAdmin from "../../components/CardAttractionAdmin";
import AddAttractionModal from "../../components/AddAttractionModal";
import EditAttractionModal from "../../components/EditAttractionModal";
import CommentModal from "../../components/CommentModal";
import DeleteModal from "../../components/DeleteModal";
import Popup from "../../components/Popup";

const TouristAttractionAdmin = () => {
  const [attractions, setAttractions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isShowModalComment, setIsShowModalComment] = useState(false);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [attractionId, setAttractionId] = useState("");
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const [isPopup, setIsPopup] = useState(false);
  const [popupSuccess, setPopupSuccess] = useState(true);
  const [popupMessage, setPopupMessage] = useState("success");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const filteredData = attractions.filter((attraction) =>
    searchValue
      ? attraction.name.toLowerCase().includes(searchValue.toLowerCase())
      : true
  );

  useEffect(() => {
    getAttractions();
  }, [currentPage]);

  const getAttractions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/attractions`
      );
      setAttractions(response.data); // Assuming the attractions data is an array
    } catch (error) {
      console.error("Error fetching attractions:", error);
    }
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentItems = filteredData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePopup = (type, message) => {
    setIsPopup(true);
    setPopupSuccess(type);
    setPopupMessage(message);
    setTimeout(function () {
      setIsPopup(false);
    }, 2000);
  };

  const deleteAttraction = async (attractionId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/attractions/${attractionId}`
      );

      console.log(response.data);
      handlePopup(true, "Hapus Data Berhasil");
      window.location.reload();
    } catch (error) {
      console.log(error);
      handlePopup(false, "Hapus Data Gagal");
    }
  };

  const handleSearchArticle = (event) => {
    setSearchValue(event.target.value);
    if (event.target.value === "") {
      getAttractions();
    } else {
      const filteredAttractions = attractions.filter((attraction) =>
        attraction.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setAttractions(filteredAttractions);
    }
  };

  const handleOpenModalEdit = (attractionId) => {
    setIsShowModalEdit(true);
    setAttractionId(attractionId);
  };

  const handleShowModalEdit = (showModal) => {
    setIsShowModalEdit(showModal);
    setAttractionId("");
  };

  const handleOpenModalDelete = (attractionId) => {
    setIsShowModalDelete(true);
    setAttractionId(attractionId);
  };

  const handleShowModalDelete = (showModal) => {
    setIsShowModalDelete(showModal);
    setAttractionId("");
  };

  const handleOpenModalComment = (attractionId) => {
    setIsShowModalComment(true);
    setAttractionId(attractionId);
  };

  const handleShowModalComment = (showModal) => {
    setIsShowModalComment(showModal);
    setAttractionId("");
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      {" "}
      <Popup isSuccess={popupSuccess} isOpen={isPopup} message={popupMessage} />
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <SearchBar
            className="focus:outline-none text-neutralMediumLow"
            placeholder="Find something here ..."
            value={searchValue}
            onChange={handleSearchArticle}
          />
          <div className="flex justify-center">
            <ButtonPrimary
              onClick={() => {
                setIsShowModalAdd(true);
              }}
              className="w-full h-8 rounded-sm border justify-center items-center flex gap-x-2"
            >
              <Add style={{ fontSize: "1rem" }} />

              <span className="text-sm font-medium">Tambah Wisata</span>
            </ButtonPrimary>
          </div>
        </div>
        <div className="overflow-y-auto max-h-[500px]">
          {currentItems?.map((attraction) => (
            <CardAttractionAdmin
              key={attraction.id}
              openModalComment={() => handleOpenModalComment(attraction.id)}
              openModalEdit={() => handleOpenModalEdit(attraction.id)}
              deleteArticle={() => handleOpenModalDelete(attraction.id)}
              payloads={attraction}
            />
          ))}
        </div>
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
      <CommentModal
        openModal={isShowModalComment}
        onClose={handleShowModalComment}
        attractionId={attractionId}
      />
      <AddAttractionModal
        openModal={isShowModalAdd}
        onClose={() => {
          setIsShowModalAdd(false);
        }}
        updateData={getAttractions}
      />
      <EditAttractionModal
        openModal={isShowModalEdit}
        onClose={handleShowModalEdit}
        attractionId={attractionId}
        updateData={getAttractions}
      />
      <DeleteModal
        modalState={isShowModalDelete}
        closeModal={handleShowModalDelete}
        onSure={() => deleteAttraction(attractionId)}
      />
    </>
  );
};

export default TouristAttractionAdmin;
