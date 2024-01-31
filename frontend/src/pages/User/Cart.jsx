// import React, { useEffect, useState } from "react";
// import { CardFasilitas } from "../../components/CardFasilitas";
// import Footer from "../../components/Footer";
// import { useParams } from "react-router";
// import axios from "axios";
// import ImageViewer from "../../components/ImageViewer";
// import CartProduct from "../../components/CartProduct";
// import { NavLink } from "react-router-dom";

// const TouristAttractionDetail = () => {
//   const { id } = useParams();
//   const [attraction, setAttraction] = useState(null);

//   useEffect(() => {
//     fetchAttractionById();
//   }, [id]);

//   const fetchAttractionById = async () => {
//     if (id) {
//       try {
//         const url = `${import.meta.env.VITE_API_BASE_URL}/api/attractions/${id}`;
//         const response = await axios.get(url);
//         setAttraction(response.data);
//       } catch (error) {
//         console.error("Error fetching attraction data:", error);
//         // Handle error (show an error message)
//       }
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-col p-10 ">
//         <div className="text-3xl font-medium mb-5">Keranjangmu</div>
//         <div className="flex flex-col mb-5 md:flex-row justify-start">
//           <div className="max-w-sm lg:max-w-[800px] md:max-w-[700px] mb-5 md:mr-5 flex-col justify-start items-start gap-5 inline-flex">
//             <div className="w-[700px] max-h-screen flex flex-col overflow-auto">
//               <CartProduct />
//               <CartProduct />
//               <CartProduct />
//               <CartProduct />
//               <CartProduct />
//               <CartProduct />
//             </div>
//           </div>
//           <div className="w-full h-full px-16">
//             <div className="w-full h-full border rounded-md p-5 gap-3 flex flex-col">
//               <div className="border-b border-lg">
//                 <p className="text-xl font-bold">Rincian Pesanan</p>
//               </div>
//               <div className="border-b border-lg">
//                 <div className="flex justify-between">
//                   <p className="text-md">Jumlah Produk</p>
//                   <p className="text-md">2</p>
//                 </div>
//                 <div className="flex justify-between">
//                   <p className="text-md">Jumlah Produk</p>
//                   <p className="text-md">2</p>
//                 </div>
//               </div>
//               <div className="flex justify-between">
//                 <p className="text-md font-bold">Total Biaya</p>
//                 <p className="text-md">2</p>
//               </div>
//             </div>
//             <NavLink to={'/checkout'} className="bg-cyan-600 flex justify-center rounded-md py-1 text-white mt-3">
//               Checkout
//             </NavLink>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TouristAttractionDetail;
