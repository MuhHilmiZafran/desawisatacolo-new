// Footer.js

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-cyan-800 text-white p-9">
      <div className="container mx-auto flex flex-col gap-3 md:flex-row justify-between items-start">
        <div className="flex flex-col max-w-[400px] gap-2">
          <p className="text-lg font-semibold">Desa Wisata</p>
          <p className="text-sm">
            Colo, Kecamatan Dawe, Kabupaten Kudus, Jawa Tengah
          </p>
        </div>

        <div>
          <p className="text-lg font-semibold">Hubungi Kami</p>
          <p className="text-sm">Whatsapp: +62 82213619770</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Ikuti Kami</p>
          <div className="flex space-x-2">
            <a href="#" className="text-sm">
              Facebook
            </a>
            <a href="#" className="text-sm">
              Instagram
            </a>
            <a href="#" className="text-sm">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
