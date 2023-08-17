import React, { useState, useEffect } from "react";
import ImageHandler from "../Screens/ImageHandler";
import Levick from "../Assets/Image/Levick.png";
import SheetModal from "../Shared/SheetModal";
import Header from "../Components/Header";
import ClothHandler from "../Screens/ClothHandler";
import ModalScreen from "../Shared/ModalScreen";
import SearchBar from "../Shared/SearchBar"; // Import the SearchBar component
import "../Assets/Styles/Home.css";

export default function Home() {
  const imageStyle = {
    height: "100px",
    width: "100px",
  };

  const [clothes, setClothes] = useState([]);
  const [selectedCloth, setSelectedCloth] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Add searchQuery state

  useEffect(() => {
    fetch("https://levick-7b15defb7ee9.herokuapp.com/cloths")
      .then((response) => response.json())
      .then((data) => setClothes(data))
      .catch((error) => console.error("Error fetching clothes:", error));
  }, []);

  const handleViewMore = (cloth) => {
    setSelectedCloth(cloth);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedCloth(null);
    setShowModal(false);
  };

  // Filter clothes based on the search query
  const filteredClothes = clothes.filter(cloth =>
    cloth.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      <div>
        <Header />
      </div>
      <div>
        <ImageHandler src={Levick} alt="Logo" style={imageStyle} />
        {/* Display the SearchBar on the home page */}
        <SearchBar setSearchQuery={setSearchQuery} />
        <SheetModal>
          <ClothHandler clothes={filteredClothes} handleViewMore={handleViewMore} />
        </SheetModal>
        {/* Display the ModalScreen with the selected cloth */}
        <ModalScreen
          title={selectedCloth?.title}
          body={selectedCloth?.description}
          show={showModal}
          onHide={closeModal}
        />
      </div>
    </div>
  );
}
