// // src/Checkout.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import CartProduct from "../../components/CartProduct";
// import { Home } from "@mui/icons-material";

// const Checkout = () => {
//   //   const [originCity, setOriginCity] = useState('');
//   //   const [destinationCity, setDestinationCity] = useState('');
//   //   const [weight, setWeight] = useState(1000); // Default weight in grams
//   //   const [shippingCost, setShippingCost] = useState(null);

//   //   useEffect(() => {
//   //     // Fetch available cities from RajaOngkir API
//   //     axios.get('https://api.rajaongkir.com/starter/city', {
//   //       headers: {
//   //         key: import.meta.env.VITE_REACT_APP_RAJAONGKIR_API_KEY,
//   //       },
//   //     })
//   //       .then(response => {
//   //         // Set the origin city to the first city in the list
//   //         setOriginCity(response.data.rajaongkir.results[0].city_name);
//   //         // Set the destination city to the second city in the list
//   //         setDestinationCity(response.data.rajaongkir.results[1].city_name);
//   //       })
//   //       .catch(error => console.error('Error fetching cities:', error));
//   //   }, []);

//   //   const calculateShippingCost = () => {
//   //     // Fetch shipping cost from RajaOngkir API
//   //     axios.post('https://api.rajaongkir.com/starter/cost', {
//   //       origin: 501, // ID of the origin city (adjust as needed)
//   //       destination: 114, // ID of the destination city (adjust as needed)
//   //       weight: weight,
//   //       courier: 'jne', // Choose your preferred courier
//   //     }, {
//   //       headers: {
//   //         key: import.meta.env.VITE_REACT_APP_RAJAONGKIR_API_KEY,
//   //       },
//   //     })
//   //       .then(response => {
//   //         // Set the shipping cost based on the first available service
//   //         setShippingCost(response.data.rajaongkir.results[0].costs[0].cost[0].value);
//   //       })
//   //       .catch(error => console.error('Error fetching shipping cost:', error));
//   //   };

//   //   const handleWeightChange = (event) => {
//   //     setWeight(event.target.value);
//   //   };

//   //   const handleCalculateShipping = () => {
//   //     calculateShippingCost();
//   //   };

//   return (
//     <div className="container mx-auto mt-8">
//       <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
//         <a href="#" className="text-2xl font-bold text-gray-800">
//           Checkout
//         </a>
//       </div>
//       <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
//         <div className="px-4 pt-8">
//           <p className="text-xl font-medium">Rincian Pesanan</p>
//           <p className="text-gray-400">
//             Silahkan periksa kembali pesanan anda.
//           </p>
//           <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
//             <CartProduct/>
//             <CartProduct/>
//           </div>

//           <p className="mt-8 text-lg font-medium">Rincian Pengiriman</p>
//           {/* <form className="mt-5 grid gap-6">
//             <div className="relative">
//               <input
//                 className="peer hidden"
//                 id="radio_1"
//                 type="radio"
//                 name="radio"
//                 checked
//               />
//               <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
//               <label
//                 className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
//                 htmlFor="radio_1"
//               >
//                 <img
//                   className="w-14 object-contain"
//                   src="/images/naorrAeygcJzX0SyNI4Y0.png"
//                   alt=""
//                 />
//                 <div className="ml-5">
//                   <span className="mt-2 font-semibold">Fedex Delivery</span>
//                   <p className="text-slate-500 text-sm leading-6">
//                     Delivery: 2-4 Days
//                   </p>
//                 </div>
//               </label>
//             </div>
//             <div className="relative">
//               <input
//                 className="peer hidden"
//                 id="radio_2"
//                 type="radio"
//                 name="radio"
//                 checked
//               />
//               <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
//               <label
//                 className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
//                 htmlFor="radio_2"
//               >
//                 <img
//                   className="w-14 object-contain"
//                   src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
//                   alt=""
//                 />
//                 <div className="ml-5">
//                   <span className="mt-2 font-semibold">Fedex Delivery</span>
//                   <p className="text-slate-500 text-sm leading-6">
//                     Delivery: 2-4 Days
//                   </p>
//                 </div>
//               </label>
//             </div>
//           </form> */}
//         </div>
//         <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
//           <p className="text-xl font-medium">Rincian Data Pemesan</p>
//           <p className="text-gray-400">
//             Silahkan Masukkan data diri Anda.
//           </p>
//           <div className="">
//             <label
//               htmlFor="email"
//               className="mt-4 mb-2 block text-sm font-medium"
//             >
//               Email
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 id="email"
//                 name="email"
//                 className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
//                 placeholder="your.email@gmail.com"
//               />
//               <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4 text-gray-400"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
//                   />
//                 </svg>
//               </div>
//             </div>
//             {/* <label
//               htmlFor="card-holder"
//               className="mt-4 mb-2 block text-sm font-medium"
//             >
//              Alamat
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 id="card-holder"
//                 name="card-holder"
//                 className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
//                 placeholder="Masukkan Alamat Anda"
//               />
//               <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
//                <Home/>
//               </div>
//             </div> */}
            
           
//             <label
//               htmlFor="billing-address"
//               className="mt-4 mb-2 block text-sm font-medium"
//             >
//               Alamat
//             </label>
//             <div className="flex flex-col sm:flex-row">
//               <div className="relative flex-shrink-0 sm:w-7/12">
//                 <input
//                   type="text"
//                   id="billing-address"
//                   name="billing-address"
//                   className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
//                   placeholder="Alamat"
//                 />
//                 <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
//                   <img
//                     className="h-4 w-4 object-contain"
//                     src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
//                     alt=""
//                   />
//                 </div>
//               </div>
//               <select
//                 type="text"
//                 name="billing-state"
//                 className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
//               >
//                 <option value="Kota">Pilih Kota</option>
//               </select>
//               <input
//                 type="text"
//                 name="billing-zip"
//                 className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
//                 placeholder="POS"
//               />
//             </div>

//             <div className="mt-6 border-t border-b py-2">
//               <div className="flex items-center justify-between">
//                 <p className="text-sm font-medium text-gray-900">Subtotal</p>
//                 <p className="font-semibold text-gray-900">Rp 10000</p>
//               </div>
//               <div className="flex items-center justify-between">
//                 <p className="text-sm font-medium text-gray-900">Ongkir (JNT)</p>
//                 <p className="font-semibold text-gray-900">RP 14000</p>
//               </div>
//             </div>
//             <div className="mt-6 flex items-center justify-between">
//               <p className="text-sm font-medium text-gray-900">Total</p>
//               <p className="text-2xl font-semibold text-gray-900">24000</p>
//             </div>
//           </div>
//           <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
//             Place Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
