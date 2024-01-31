import React, { useEffect, useState } from "react";
import Tables from "../../components/Tables/Tables";
import TableHeader from "../../components/Tables/TableHeader";
import TableBody from "../../components/Tables/TableBody";
import SearchBar from "../../components/SearchBar";
import ButtonPrimary from "../../components/ButtonPrimary";
import axios from "axios";
import { set } from "react-hook-form";
import ModalProofPayment from "../../components/ModalProofPayment";
import { InsertPhotoOutlined } from "@mui/icons-material";

const TourPackageReservation = () => {
  const [tourPackageReservations, setTourPackageReservations] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [users, setUsers] = useState([]);
  const [tourPackages, setTourPackages] = useState([]);
  // const [reservationId, setReservationId] = useState("");
  const [proofPayment, setProofPayment] = useState("");

  useEffect(() => {
    getTourPackageReservations();
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
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reservations/${reservationId}/confirm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
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
    const keyword = event.target.value;
    setSearchKeyword(keyword);
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
            {tourPackageReservations.map((tourPackageReservation, index) => (
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
                   {tourPackageReservation.status === "Menunggu Konfirmasi" && (
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
