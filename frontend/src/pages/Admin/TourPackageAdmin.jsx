import React, { useEffect, useState } from "react";
import Tables from "../../components/Tables/Tables";
import TableHeader from "../../components/Tables/TableHeader";
import TableBody from "../../components/Tables/TableBody";
import SearchBar from "../../components/SearchBar";
import ButtonPrimary from "../../components/ButtonPrimary";
import AddTourPackageModal from "../../components/AddTourPackageModal";
import axios from "axios";
import { Add, Delete, Edit } from "@mui/icons-material";
import TableRow from "../../components/Tables/TableRow";
import EditTourPackageModal from "../../components/EditTourPackage";
import DeleteModal from "../../components/DeleteModal";
import Popup from "../../components/Popup";

const TourPackageAdmin = () => {
  const [tourPackages, setTourPackages] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [tourPackageId, setTourPackageId] = useState("");
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const [isPopup, setIsPopup] = useState(false);
  const [popupSuccess, setPopupSuccess] = useState(true);
  const [popupMessage, setPopupMessage] = useState("success");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const filteredData = tourPackages.filter((tourPackage) =>
    searchValue
      ? tourPackage.name.toLowerCase().includes(searchValue.toLowerCase())
      : true
  );

  useEffect(() => {
    getTourPackage();
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

  const getTourPackage = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/tour-packages`
      );
      setTourPackages(response.data); // Assuming the TourPackage data is an array
    } catch (error) {
      console.error("Error fetching TourPackage:", error);
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

  const deleteTourPackage = async (tourPackageId) => {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/tour-packages/${tourPackageId}`
      );

      console.log(response.data);
      handlePopup(true, "Hapus Data Berhasil");
      getTourPackage();
    } catch (error) {
      console.log(error);
      handlePopup(false, "Hapus Data Gagal");
    }
  };

  const handleSearchArticle = (event) => {
    setSearchValue(event.target.value);
    if (event.target.value === "") {
      getTourPackage();
    } else {
      const filteredTourPackage = tourPackages.filter((tourPackage) =>
        tourPackage.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      );
      setTourPackages(filteredTourPackage);
    }
  };

  const handleOpenModalDelete = (tourPackageId) => {
    setIsShowModalDelete(true);
    setTourPackageId(tourPackageId);
  };

  const handleShowModalDelete = (showModal) => {
    setIsShowModalDelete(showModal);
    setTourPackageId("");
  };

  const handleOpenModalEdit = (tourPackageId) => {
    setIsShowModalEdit(true);
    setTourPackageId(tourPackageId);
  };

  const handleShowModalEdit = (showModal) => {
    setIsShowModalEdit(showModal);
    setTourPackageId("");
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Popup
        isPopup={isPopup}
        isSuccess={popupSuccess}
        message={popupMessage}
      />
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <SearchBar
            className="focus:outline-none text-neutralMediumLow"
            placeholder="Pencarian"
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

              <span className="text-sm font-medium">Tambah Paket Wisata</span>
            </ButtonPrimary>
          </div>
        </div>
        <div>
          <Tables>
            <TableHeader>
              <th className="py-2 px-4 border-b">No</th>
              <th className="py-2 px-4 border-b">Paket Wisata</th>
              <th className="py-2 px-4 border-b">Deskripsi</th>
              <th className="py-2 px-4 border-b">Jumlah Rombongan</th>
              <th className="py-2 px-4 border-b">Harga</th>
              <th className="py-2 px-4 border-b">Action</th>
            </TableHeader>
            <TableBody>
              {currentItems?.map((tourPackage) => (
                <TableRow scope="row" key={tourPackage.id}>
                  <td className="py-2 px-4 border-b">{tourPackage.id}</td>
                  <td className="py-2 px-4 border-b">{tourPackage.name}</td>
                  <td className="py-2 px-4 border-b truncate">
                    {tourPackage.description}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {tourPackage.min_people}-{tourPackage.max_people} orang
                  </td>
                  <td className="py-2 px-4 border-b">{tourPackage.price}</td>

                  <td className="py-2 px-4 border-b">
                    <div>
                      <div className="flex flex-row py-[8px] gap-x-4 justify-end">
                        <div className="columns">
                          <ButtonPrimary
                            className="w-full h-2 rounded-sm border text-green-600 border-green-600 justify-center items-center flex outline-green-600 hover:bg-green-300"
                            onClick={() => handleOpenModalEdit(tourPackage.id)}
                          >
                            <Edit style={{ fontSize: "1rem" }} />
                            {/* <span className="text-sm font-medium">Edit</span> */}
                          </ButtonPrimary>
                        </div>
                        <div className="columns">
                          <ButtonPrimary
                            className="w-full h-2 rounded-sm border text-red-600 border-red-600 justify-center items-center flex outline-red-600 hover:bg-red-300"
                            onClick={() =>
                              handleOpenModalDelete(tourPackage.id)
                            }
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
        <AddTourPackageModal
          openModal={isShowModalAdd}
          onClose={() => {
            setIsShowModalAdd(false);
          }}
          updateData={getTourPackage}
        />
        <EditTourPackageModal
          openModal={isShowModalEdit}
          onClose={handleShowModalEdit}
          tourPackageId={tourPackageId}
          updateData={getTourPackage}
        />
        <DeleteModal
          modalState={isShowModalDelete}
          closeModal={handleShowModalDelete}
          onSure={() => deleteTourPackage(tourPackageId)}
        />
      </div>
    </>
  );
};

export default TourPackageAdmin;
