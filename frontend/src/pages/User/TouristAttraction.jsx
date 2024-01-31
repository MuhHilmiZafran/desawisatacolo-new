import React, { useEffect, useState, useRef } from "react";
import Footer from "../../components/Footer";
import SearchBar from "../../components/SearchBar";
import { CardAttractionLong } from "../../components/CardAttractionLong";
import axios from "axios";
import { useParams } from "react-router";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const TouristAttraction = () => {
  const [attractions, setAttractions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const mapRef = useRef(null);

  useEffect(() => {
    getAttractions();
  }, []);

  const getAttractions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/attractions`
      );
      setAttractions(response.data);
    } catch (error) {
      console.error("Error fetching attractions:", error);
    }
  };

  const handleSearchArticle = (event) => {
    setSearchValue(event.target.value);
    if (event.target.value === "") {
      getAttractions();
    } else {
      const filteredAttractions = attractions.filter((attraction) =>
        attraction.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setAttractions(filteredAttractions);

      // If there's only one matching attraction, zoom to it
      if (filteredAttractions.length == 1 && mapRef.current) {
        const { latitude, longitude } = filteredAttractions[0];
        mapRef.current.setView([latitude, longitude], 15); // Adjust the zoom level as needed
      } else {
        // If there's no matching attraction, zoom to the center of the map
        mapRef.current.setView([-6.666666, 110.90309], 13); // Adjust the zoom level as needed
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-5 px-6 md:px-12 py-9">
        <div className="flex flex-col gap-1">
          <div className="text-3xl font-medium">Destinasi Wisata</div>
          <div className="text-md text-slate-500">
            Berisi Informasi Destinasi Wisata Desa Wisata Colo.
          </div>
        </div>
        <div>
          <SearchBar
            className="focus:outline-none w-full"
            placeholder="Pencarian"
            value={searchValue}
            onChange={handleSearchArticle}
          />
        </div>
        <div id="map">
          <MapContainer
            center={[-6.666666, 110.90309]}
            zoom={13}
            style={{ width: "100%", height: "60vh" }}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {attractions.map((attraction) => (
              <Marker
                key={attraction.id}
                position={[attraction.latitude, attraction.longitude]}
              >
                <Popup>{attraction.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div>
          {attractions.map((attraction) => (
            <CardAttractionLong key={attraction.id} payloads={attraction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TouristAttraction;
