import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import { Add, Edit } from "@mui/icons-material";
import ButtonPrimary from "../../components/ButtonPrimary";
import axios from "axios";
import CardAttractionAdmin from "../../components/CardAttractionAdmin";
import AddAttractionModal from "../../components/AddAttractionModal";
import EditAttractionModal from "../../components/EditAttractionModal";
import CommentModal from "../../components/CommentModal";

const TouristAttractionAdmin = () => {
  const [attractions, setAttractions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isShowModalComment, setIsShowModalComment] = useState(false);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [attractionId, setAttractionId] = useState("");

  useEffect(() => {
    getAttractions();
  }, []);

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

  const deleteAttraction = async (attractionId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/attractions/${attractionId}`
      );

      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.log(error);
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

  const handleOpenModalComment = (attractionId) => {
    setIsShowModalComment(true);
    setAttractionId(attractionId);
  };

  const handleShowModalComment = (showModal) => {
    setIsShowModalComment(showModal);
    setAttractionId("");
  };

  return (
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
        {attractions.map((attraction) => (
          <CardAttractionAdmin
            key={attraction.id}
            openModalComment={() => handleOpenModalComment(attraction.id)}
            openModalEdit={() => handleOpenModalEdit(attraction.id)}
            deleteArticle={() => deleteAttraction(attraction.id)}
            payloads={attraction}
          />
        ))}
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
        // updateData={fetchAllArticles}
      />
      <EditAttractionModal
        openModal={isShowModalEdit}
        onClose={handleShowModalEdit}
        attractionId={attractionId}
      />
    </div>
  );
};

export default TouristAttractionAdmin;
