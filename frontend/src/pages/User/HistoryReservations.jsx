import React, { useEffect, useState } from "react";
import { CardFasilitas } from "../../components/CardFasilitas";
import Footer from "../../components/Footer";
import { useParams } from "react-router";
import axios from "axios";
import ImageViewer from "../../components/ImageViewer";
import CartProduct from "../../components/CartProduct";
import { NavLink } from "react-router-dom";
import CardHistoryReservation from "../../components/CardHistoryReservation";

const HistoryReservations = () => {
  const { id } = useParams();
  const [reservations, setReservations] = useState(null);
  const dataUser = JSON.parse(localStorage.getItem("data"));
  const userId = dataUser?.id;

  useEffect(() => {
    getReservations();
  }, [id]);

  const getReservations = async () => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/api/reservations/user/${userId}`;
      const response = await axios.get(url);
      console.log(response.data);
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservasi data:", error);
      // Handle error (show an error message)
    }
  };

  return (
    <>
      <div className="flex flex-col p-10 ">
        <div className="text-3xl font-medium mb-5">
          Riwayat Reservasi Paket Wisata
        </div>
        <div className="flex flex-col mb-5 md:flex-row justify-start">
          <div className="max-w-sm lg:max-w-[600px] md:max-w-[400px] mb-5 md:mr-5 flex-col justify-start items-start gap-5 inline-flex">
            <div className="w-[600px] max-h-screen flex flex-col overflow-auto gap-5">
              {reservations && reservations.length > 0 ? (
                reservations.map((reservation) => (
                  <CardHistoryReservation
                    key={reservation.id}
                    payload={reservation}
                  />
                ))
              ) : (
                <div className="text-xl font-medium">
                  Tidak ada riwayat reservasi
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryReservations;
