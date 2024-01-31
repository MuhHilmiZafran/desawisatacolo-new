import React from "react";
import Footer from "../../components/Footer";

const About = () => {
  return (
    <div>
      <div className="flex flex-col p-10 justify-center items-center">
        <div className="w-full text-center text-black text-4xl font-normal font-['Inter'] mb-5">
          Desa Wisata Colo
        </div>

        <div className="w-full md:max-w-[900px] mb-5 md:mr-5 flex-col justify-start items-start gap-5 inline-flex">
          <img
            src="https://res.cloudinary.com/dzisbnmi0/image/upload/v1706195351/desa_colo_prjadb.jpg"
            alt=""
            className="object-cover rounded-lg w-full h-96"
          />

          <div className="w-full text-justify text-black text-base font-normal font-['Inter']">
            Desa Colo merupakan sebuah desa wisata yang menarik, terletak di
            lereng Gunung Muria di Kecamatan Dawe, Kabupaten Kudus, Provinsi
            Jawa Tengah. Desa ini mencakup luas lahan sekitar 584 hektar dan
            berjarak sekitar 11 kilometer dari Kecamatan Dawe serta 18 kilometer
            dari kota Kudus. Dengan letaknya yang berada di dataran tinggi,
            yaitu ketinggian sekitar 700 meter di atas permukaan laut, Desa Colo
            menawarkan iklim tropis yang sejuk dan nyaman. Dengan aspek fisiknya
            yang menarik, Desa Wisata Colo memanfaatkan lingkungannya dengan
            baik, menawarkan pengalaman berwisata yang unik bagi para pengunjung
            yang datang untuk menikmati alam, budaya, dan keindahan alamnya.
          </div>
          <div className="w-full md:max-w-[900px] justify-center items-center gap-5 flex">
            <img
              className="w-[450px] h-[300px] md:max-w-[500px] md:max-h-[300px] rounded-lg object-cover"
              src="https://res.cloudinary.com/dzisbnmi0/image/upload/v1706195359/gapura_colo_cfgymj.jpg"
            />
            <img
              className="w-[450px] h-[300px] md:w-[400px] md:max-h-[300px] rounded-lg object-cover"
              src="https://res.cloudinary.com/dzisbnmi0/image/upload/v1706195371/Bukit-Sepuser-malam-Minggu_nivvw9.jpg"
            />
          </div>
          <div className="w-full md:max-w-[900px] justify-center items-center gap-5 flex">
            <img
              className="w-[450px] h-[300px] md:w-[400px] md:max-h-[300px] rounded-lg object-cover"
              src="https://res.cloudinary.com/dzisbnmi0/image/upload/v1706195769/Makam_Sunan_Muria_ojek_mdr7ty.jpg"
            />
            <img
              className="w-[450px] h-[300px] md:max-w-[500px] md:max-h-[300px] rounded-lg object-cover"
              src="https://res.cloudinary.com/dzisbnmi0/image/upload/v1706195774/sunan_muria_jk92bv.jpg"
            />
          </div>
          <div className="w-full text-justify text-black text-base font-normal font-['Inter']">
            Asal usul nama Colo-menurut salah satu sumber, Mbah Suyoto (salah
            satu sesepuh desa Colo), Colo berasal dari Bahasa Jawa yaitu
            “Hangcolo” yang artinya gunung. Nama kota ini erat kaitannya dengan
            keberadaan Gunung Muria dan sudah ada sejak zaman penjajahan
            Belanda. Menurut sejarah, pemerintahan Hindia Belanda di Indonesia
            pada zaman dahulu terbagi menjadi beberapa kerajaan, yaitu Kerajaan
            Yogyakarta, Kerajaan Solo, Kerajaan Pajang, dan Kerajaan Demak.
            Kerajaan Muria merupakan salah satu kerajaan yang berada di bawah
            naungan kerajaan-kerajaan tersebut. Dari sini dapat disimpulkan
            bahwa Desa Colo sudah ada sejak masa belanda.
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
