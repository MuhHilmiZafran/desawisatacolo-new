import React from "react";
import FormReservationModal from "../../components/FormReservasiModal";
import { useParams } from "react-router";

const Reservation = () => {
  const { id } = useParams();
  const dataUser = JSON.parse(localStorage.getItem("data"));
  const userId = dataUser?.id;
  return (
    <div>
      <FormReservationModal tourPackageId={id} userId={userId}/>
    </div>
  );
};

export default Reservation;
