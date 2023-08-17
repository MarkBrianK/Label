import React, { useState, useEffect } from "react";
import ImageHandler from "../Screens/ImageHandler";
import Levick from "../Assets/Image/Levick.png";
import SearchBar from "../Shared/SearchBar";
import SheetModal from "../Shared/SheetModal";
import Header from "../Components/Header";
import ClothHandler from '../Screens/ClothHandler';
import "../Assets/Styles/Home.css";

export default function Home() {
  const imageStyle = {
    height: "100px",
    width: "100px",
  };

  const [clothes, setClothes] = useState([]);
  const [selectedCloth, setSelectedCloth] = useState(null);

  useEffect(() => {
    fetch("https://levick-7b15defb7ee9.herokuapp.com/cloths")
      .then((response) => response.json())
      .then((data) => setClothes(data))
      .catch((error) => console.error("Error fetching clothes:", error));
  }, []);

  const handleViewMore = (cloth) => {
    setSelectedCloth(cloth);
    // Handle opening the modal or other actions
  };

  return (
    <div className="home-container">
      <div>
        <Header />
      </div>
      <div>
        <ImageHandler src={Levick} alt="Logo" style={imageStyle} />
        <SearchBar />
        <SheetModal>
          <ClothHandler clothes={clothes} handleViewMore={handleViewMore} />
        </SheetModal>
      </div>
    </div>
  );
}
