import React, { useEffect, useState } from "react";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

const PaymentReservation = () => {
  const { id } = useParams();
  const [deadline, setDeadline] = useState("");
  const [reservasi, setReservasi] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reservations/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setReservasi(data);
      })
      .catch((error) => {
        console.error("Error fetching reservasi:", error);
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

  const calculateTimeLeft = () => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const difference = deadlineDate - now;

    let timeLeft = {};

    if (difference > 0 && reservasi?.status == "Menunggu Pembayaran") {
      console.log(difference);
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    } else if (difference <= 0 && reservasi?.status == "Menunggu Pembayaran") {
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
  });

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reservations/${id}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <div className="flex flex-col p-10 mx-auto">
      <div className="bg-white rounded-lg">
        <div className="flex mb-5">
        {reservasi?.status == "Menunggu Pembayaran" ? (
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
          ) : reservasi?.status === "Dibatalkan" ? (
            <div>
              <p className="text-red-500">Dibatalkan</p>
            </div>
          ) : (
            <div>
              <p className="text-green-500">Selesai</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-5">
          <div>Transfer ke Bank BCA</div>
          <div>
            <p>Nomor Rekening</p>
            <p className="font-semibold">1234567890</p>
          </div>
          <div>
            <p>Atas Nama</p>
            <p className="font-semibold">Muhammad Hilmi Zafran</p>
          </div>
          <div>
            <p>Jumlah yang harus dibayarkan</p>
            <p className="font-semibold">Rp. {reservasi?.total_price}</p>
          </div>
          <form
            className="flex flex-col gap-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label htmlFor="image">Upload Bukti Pembayaran</label>
              <br />
              <input type="file" name="image" {...register("image")} />
            </div>
            {reservasi?.status == "Menunggu Pembayaran" ? (
              <div>
                <ButtonPrimary type="submit">Bayar Sekarang</ButtonPrimary>
                <ButtonPrimary onClick={cancelReservation}>
                  ke Halaman Utama
                </ButtonPrimary>
              </div>
            ) : (
              <ButtonPrimary type="submit" disabled>
                Bayar Sekarang
              </ButtonPrimary>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentReservation;
