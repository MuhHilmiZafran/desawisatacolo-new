import { useState, useEffect } from "react";
import axios from "axios";

const ImageViewer = ({ imageName, className }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/get-image-url/${imageName}`);
        const data = await response.json();
        // setImageUrl(data.imageUrl.replace(/https?:\/\/localhost:\d+/g, 'https://api.desawisatacolo.site'));
        setImageUrl(data.imageUrl);
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    };

    fetchImageUrl();
  }, [imageName]);

  return (
    <div>
      {imageName && (
        <img
          // src={`https://api.desawisatacolo.site/uploads/${imageName}`}
          src={imageUrl}
          alt="Gambar"
          className={`${className} object-cover rounded-lg`}
        />
      )}
    </div>
  );
};

export default ImageViewer;