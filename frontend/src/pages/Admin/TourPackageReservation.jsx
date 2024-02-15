import React, { useEffect, useState } from "react";
import Tables from "../../components/Tables/Tables";
import TableHeader from "../../components/Tables/TableHeader";
import TableBody from "../../components/Tables/TableBody";
import SearchBar from "../../components/SearchBar";
import ButtonPrimary from "../../components/ButtonPrimary";
import axios from "axios";
import ModalProofPayment from "../../components/ModalProofPayment";
import { InsertPhotoOutlined } from "@mui/icons-material";
import { get } from "react-hook-form";

const TourPackageReservation = () => {
  const [tourPackageReservations, setTourPackageReservations] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [users, setUsers] = useState([]);
  const [tourPackages, setTourPackages] = useState([]);
  // const [reservationId, setReservationId] = useState("");
  const [proofPayment, setProofPayment] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const filteredData = tourPackageReservations.filter((tourPackageReservation) =>
    searchValue
      ? tourPackages[tourPackageReservations.indexOf(tourPackageReservation)]?.name
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        users[tourPackageReservations.indexOf(tourPackageReservation)]?.email
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      : true
  );

  useEffect(() => {
    getTourPackageReservations();
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

  const getTourPackageReservations = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/reservations`
      );
      setTourPackageReservations(response.data);
      // Fetch users and tour packages for each reservation
      response.data.forEach(async (reservation) => {
        await getTourPackageById(reservation.tour_package_id);
        await getUserById(reservation.user_id);
      });
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

  const getTourPackageById = async (tourPackageId) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/tour-packages/${tourPackageId}`
      );
      setTourPackages((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error fetching TourPackage:", error);
    }
  };

  const getUserById = async (userId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/${userId}`
      );
      setUsers((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error fetching TourPackage:", error);
    }
  };

  const confirmReservation = (reservationId) => {
    fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/reservations/${reservationId}/confirm`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const handleSearchProduct = (event) => {
    const keyword = event.target.value.toLowerCase();

    if (keyword.trim() === "") {
      getTourPackageReservations();
    } else {
      const filteredReservations = tourPackageReservations.filter((order) => {
        const tourPackageName =
          tourPackages[tourPackageReservations.indexOf(order)]?.name.toLowerCase();
        const userEmail =
          users[tourPackageReservations.indexOf(order)]?.email.toLowerCase();

        return tourPackageName.includes(keyword) || userEmail.includes(keyword);
      });

      setTourPackageReservations(filteredReservations);
    }

    setSearchValue(keyword);
  };

  const handleOpenModalEdit = (reservationId) => {
    setIsShowModalAdd(true);
    setProofPayment(reservationId);
  };

  const handleShowModalEdit = (showModal) => {
    setIsShowModalAdd(showModal);
    setProofPayment("");
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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
      </div>
      <div>
        <Tables scroll={true}>
          <TableHeader>
            <th className="py-2 px-4 border-b">No</th>
            <th className="py-2 px-4 border-b">Paket Wisata</th>
            <th className="py-2 px-4 border-b">Pemesan</th>
            <th className="py-2 px-4 border-b">Jumlah Rombangan</th>
            <th className="py-2 px-4 border-b">Tanggal Kedatangan</th>
            <th className="py-2 px-4 border-b">Total Bayar</th>
            <th className="py-2 px-4 border-b">Bukti Pembayaran</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Action</th>
          </TableHeader>
          <TableBody>
            {currentItems.map((tourPackageReservation, index) => (
              <tr key={tourPackageReservation.id}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">
                  {tourPackages[index]?.name}
                </td>
                <td className="py-2 px-4 border-b">{users[index]?.email}</td>
                <td className="py-2 px-4 border-b text-center">
                  {tourPackageReservation.number_of_people}
                </td>
                <td className="py-2 px-4 border-b">
                  {tourPackageReservation.arrival_date}
                </td>
                <td className="py-2 px-4 border-b">
                  {tourPackageReservation.total_price}
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex flex-row gap-2">
                    {tourPackageReservation.image != null && (
                      <ButtonPrimary
                        onClick={() => {
                          handleOpenModalEdit(tourPackageReservation.image);
                        }}
                        className="w-full h-8 rounded-sm border justify-center items-center flex gap-x-2"
                      >
                        <span className="text-sm font-medium">
                          <InsertPhotoOutlined />
                        </span>
                      </ButtonPrimary>
                    )}
                  </div>
                </td>
                <td className="py-2 px-4 border-b">
                  {tourPackageReservation.status}
                </td>

                <td className="py-2 px-4 border-b">
                  <div className="flex flex-row gap-2">
                    {tourPackageReservation.status ===
                      "Menunggu Konfirmasi" && (
                      <ButtonPrimary
                        onClick={() => {
                          confirmReservation(tourPackageReservation.id);
                        }}
                        className="w-full h-8 rounded-sm border justify-center items-center flex gap-x-2"
                      >
                        <span className="text-sm font-medium">Konfirmasi</span>
                      </ButtonPrimary>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </TableBody>
        </Tables>
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
      <ModalProofPayment
        openModal={isShowModalAdd}
        handleClose={() => {
          setIsShowModalAdd(false);
        }}
        url={proofPayment}
      />
    </div>
  );
};

export default TourPackageReservation;
