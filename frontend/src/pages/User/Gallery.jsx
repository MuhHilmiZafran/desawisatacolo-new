import React from "react";
import Footer from "../../components/Footer";

const Gallery = () => {
  return (
    <div>
      <div className="p-9 flex flex-col gap-5">
        <div className="gap-5 flex flex-col">
          <div className="border-b text-2xl">Galeri Foto</div>
          <div className="flex flex-wrap gap-3 items-center justify-center">
            <div className="border w-[300px] h-[200px]"></div>
            <div className="border w-[300px] h-[200px]"></div>
            <div className="border w-[300px] h-[200px]"></div>
            <div className="border w-[300px] h-[200px]"></div>
          </div>
        </div>
        <div className="gap-5 flex flex-col">
          <div className="border-b text-2xl">Galeri Video</div>
          <div className="flex flex-wrap gap-3 items-center justify-center">
            <div className="border w-[300px] h-[200px]"></div>
            <div className="border w-[300px] h-[200px]"></div>
            <div className="border w-[300px] h-[200px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
