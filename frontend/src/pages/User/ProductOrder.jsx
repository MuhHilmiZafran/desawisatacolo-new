import React from "react";
import { useParams } from "react-router";
import FormProductOrder from "../../components/FormProductOrder";

const ProductOrder = () => {
  const { id } = useParams();
  const dataUser = JSON.parse(localStorage.getItem("data"));
  const userId = dataUser?.id;
  return (
    <div>
      <FormProductOrder productId={id} userId={userId} />
    </div>
  );
};

export default ProductOrder;
