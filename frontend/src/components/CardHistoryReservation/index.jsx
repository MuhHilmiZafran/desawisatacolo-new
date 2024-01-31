import React, { useEffect, useState } from "react";
import { CardTourPackage } from "../CardTourPackage";
import axios from "axios";
import { useNavigate } from "react-router";
import { Cancel } from "@mui/icons-material";

const CardHistoryReservation = ({ payload }) => {
  const {
    id,
    user_id,
    tour_package_id,
    image,
    arrival_date,
    number_of_people,
    total_price,
    status,
    created_at,
  } = payload;

  const [tourPackage, setTourPackage] = useState([]);
  const [deadline, setDeadline] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getTourPackages();
  }, []);

  const getTourPackages = async () => {
    try {
      console.log(tour_package_id);
      const url = `${
        import.meta.env.VITE_API_BASE_URL
      }/api/tour-packages/${tour_package_id}`;
      const response = await axios.get(url);
      setTourPackage(response.data);
    } catch (error) {
      console.error("Error fetching reservasi data:", error);
      // Handle error (show an error message)
    }
  };

  useEffect(() => {
    // Panggil endpoint backend untuk mendapatkan deadline
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reservations/deadline/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setDeadline(data.deadline);
      })
      .catch((error) => {
        console.error("Error fetching deadline:", error);
      });
  }, []);

  const cancelReservation = () => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reservations/${id}/cancel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "Dibatalkan",
      }),
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

  const finishReservation = () => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reservations/${id}/finish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
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

  const calculateTimeLeft = () => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const difference = deadlineDate - now;

    let timeLeft = {};
    // console.log(difference)

    if (difference > 0 && status == "Menunggu Pembayaran") {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    } else if (difference <= 0 && status == "Menunggu Pembayaran") {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
      cancelReservation();
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [deadline, timeLeft]);

  const handleOnClickBayar = () => {
    navigate(`/reservasi/pembayaran/${id}`);
  };

  return (
    <div className="border p-5">
      <div className="flex justify-between">
        <p>{created_at}</p>
        <p>{status}</p>
      </div>
      <div>
        <CardTourPackage payloads={tourPackage} />
      </div>
      <div className="flex justify-between">
        <div>
          <p>Jumlah Rombongan: {number_of_people}</p>
        </div>
        <div>
          <p>Total Pembayaran</p>
          <p>Rp {total_price}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="">
          {status == "Menunggu Pembayaran" ? (
            <div>
              <p className="text-red-500">Batas Pembayaran: {deadline}</p>
              {timeLeft.days == 0 &&
              timeLeft.hours == 0 &&
              timeLeft.minutes == 0 &&
              timeLeft.seconds == 0 ? (
                <div>Batas Akhir Pembayaran Telah Berakhir!</div>
              ) : (
                <div>
                  <p className="text-2xl font-semibold text-red-500">
                    {timeLeft.days} : {timeLeft.hours} : {timeLeft.minutes} :{" "}
                    {timeLeft.seconds}
                  </p>
                </div>
              )}
            </div>
          ) : status === "Dibatalkan" ? (
            <div>
              <p className="text-red-500">Dibatalkan</p>
            </div>
          ) : (
            <div>
              <p className="text-green-500">Terbayar</p>
            </div>
          )}
        </div>
        {status != "Menunggu Pembayaran" ? (
          <div className="flex flex-col gap-3">
            <button
              className="bg-gray-400 text-white rounded-md px-3 py-1"
              disabled
            >
              Bayar Sekarang
            </button>
            {status === "Terkonfirmasi" && (
              <button
                className="bg-red-500 text-white rounded-md px-3 py-1"
                onClick={finishReservation}
              >
                Selesai
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <button
              className="bg-green-500 text-white rounded-md px-3 py-1"
              onClick={handleOnClickBayar}
            >
              Bayar Sekarang
            </button>
            <button
              className="bg-red-500 text-white rounded-md px-3 py-1"
              onClick={cancelReservation}
            >
              Batalkan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardHistoryReservation;
