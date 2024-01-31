import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import { Add } from "@mui/icons-material";
import ButtonPrimary from "../../components/ButtonPrimary";

import CardAttractionAdmin from "../../components/CardAttractionAdmin";
import axios from "axios";
import EditAttractionModal from "../../components/EditAttractionModal";
import AddArticleModal from "../../components/AddArticleModal";
import CardArticleAdmin from "../../components/CardArticleAdmin";
import EditArticleModal from "../../components/EditArticleModal";
import CommentModalArticle from "../../components/CommentModalArticle";

const ArticleAdmin = () => {
  const [articles, setArticles] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [articleId, setArticleId] = useState("");
  const [isShowModalComment, setIsShowModalComment] = useState(false);
  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/articles`);
      setArticles(response.data); // Assuming the articles data is an array
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const deleteArticle = async (articleId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/articles/${articleId}`
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
      getArticles();
    } else {
      const filteredArticles = articles.filter((article) =>
        article.title.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setArticles(filteredArticles);
    }
  };

  const handleOpenModalEdit = (articleId) => {
    setIsShowModalEdit(true);
    setArticleId(articleId);
  };

  const handleShowModalEdit = (showModal) => {
    setIsShowModalEdit(showModal);
    setArticleId("");
  };

  
  const handleOpenModalComment = (articleId) => {
    setIsShowModalComment(true);
    setArticleId(articleId);
  };

  const handleShowModalComment = (showModal) => {
    setIsShowModalComment(showModal);
    setArticleId("");
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
            className="w-full h-8 rounded-sm border justify-center items-center flex gap-x-2 text-black"
          >
            <Add style={{ fontSize: "1rem", color: "black" }} />

            <span className="text-sm font-medium">Tambah Artikel</span>
          </ButtonPrimary>
        </div>
      </div>
      <div className="overflow-y-auto max-h-[500px]">
      {articles.map((article) => (
          <CardArticleAdmin
            key={article.id}
            openModalComment={() => handleOpenModalComment(article.id)}
            openModalEdit={() => handleOpenModalEdit(article.id)}
            deleteArticle={() => deleteArticle(article.id)}
            payloads={article}
          />
        ))}
      </div>
      <CommentModalArticle
        openModal={isShowModalComment}
        onClose={handleShowModalComment}
        articleId={articleId}
      />
      <AddArticleModal
        openModal={isShowModalAdd}
        onClose={() => {
          setIsShowModalAdd(false);
        }}
        // updateData={getArticles}
      />
      <EditArticleModal
        openModal={isShowModalEdit}
        onClose={handleShowModalEdit}
        articleId={articleId}
      />
    </div>
  );
};

export default ArticleAdmin;
