// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Payment = () => {
//   const [snapToken, setSnapToken] = useState("");

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://app.midtrans.com/snap/snap.js";
//     script.setAttribute("data-client-key", "SB-Mid-client-ef1HpOjkw4p4L14q");
//     document.head.appendChild(script);

//     return () => {
//       document.head.removeChild(script);
//     };
//   }, []);

//   useEffect(() => {
//     if (window.snap) {
//       console.log("Midtrans script is loaded");
//     } else {
//       console.error("Midtrans script is not loaded");
//     }
//   }, []);

//   const data = {
//     id: "1",
//     price: "100000",
//     quantity: "1",
//     productName: "halo ges",
//   };

//   // useEffect(() => {
//   //   if (window.snap) {
//   //     console.log("Midtrans script is loaded");
//   //   } else {
//   //     console.error("Midtrans script is not loaded");
//   //   }
//   // }, []);

//   const initiatePayment = async () => {
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/api/payment`,
//         data
//       ); // Ganti URL sesuai dengan endpoint backend Anda
//       setSnapToken(response.data.snapToken);
//       console.log(response.data.snapToken);
//     } catch (error) {
//       console.error("Error initiating payment:", error);
//     }
//   };

//   const openMidtransPage = () => {
//     if (window.snap && snapToken) {
//       window.snap.pay(snapToken);
//     } else {
//       console.error("Midtrans script or snapToken not available");
//     }
//   };

//   return (
//     <div>
//       {/* <script
//         type="text/javascript"
//         src="https://app.midtrans.com/snap/snap.js"
//         data-client-key="SB-Mid-client-ef1HpOjkw4p4L14q"
//       ></script> */}
//       <button onClick={initiatePayment}>Initiate Payment</button>
//       <button onClick={openMidtransPage}>Open Midtrans Page</button>
//     </div>
//   );
// };

// export default Payment;
