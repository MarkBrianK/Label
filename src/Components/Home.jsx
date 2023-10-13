import React, { useState, useEffect } from "react";
import ImageHandler from "../Screens/ImageHandler";
import Levick from "../Assets/Image/Levick.png";
import { Helmet } from "react-helmet";
import SheetModal from "../Shared/SheetModal";
import Header from "../Components/Header";
import ClothHandler from "../Screens/ClothHandler";
import ModalScreen from "../Shared/ModalScreen";
import SearchBar from "../Shared/SearchBar";
import CategoryHolder from "../Shared/CategoryHolder";
import Button from "../Shared/Button";
import "../Assets/Styles/Home.css";

export default function Home({ user, userdetails }) {
  const imageStyle = {
    height: "100px",
    width: "100px",
  };

  const [clothes, setClothes] = useState([]);
  const [selectedCloth, setSelectedCloth] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Fetch clothes data from the API
    fetch("https://seal-app-p8ntf.ondigitalocean.app/cloths")
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
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
  };

  const filteredByCategory = selectedCategory
    ? clothes.filter((cloth) => cloth.category_id === selectedCategory.id)
    : clothes;

  const filteredBySearch = filteredByCategory.filter((cloth) => {
    const searchTerm = searchQuery.toLowerCase();
    const itemName = cloth.name.toLowerCase();
    const itemDescription = cloth.description.toLowerCase();
    const itemSize = cloth.size.toLowerCase();

    return (
      itemName.includes(searchTerm) ||
      itemDescription.includes(searchTerm) ||
      itemSize.includes(searchTerm)
    );
  });

  return (
    <div className="home-container">
      <Helmet>
        <title>Trendy and Affordable Clothing Store - Levick 23</title>
        <meta
          name="description"
          content="Discover the best clothing store near Uthiru, Nairobi. Levick 23 offers trendy and affordable clothing for both men and women. Explore a diverse range of styles and designs online."
        />
      </Helmet>

      <Header user={user} username={userdetails} />

      <div className="text-center mt-3">
        <div className="fixed-logo-search-container">
          <div className="logo-search-row">
            <div className="logo">
              <ImageHandler src={Levick} alt="Levick 23 Logo" style={imageStyle} />
            </div>
            <div className="search">
              <SearchBar setSearchQuery={setSearchQuery} />
            </div>
          </div>
        </div>
        <div className="cards-holder">
          <div className="cards-row" style={{ marginTop: "13vh" }}>
            <CategoryHolder handleCategorySelect={handleCategorySelect}>
              {(selectedCategory) => (
                <SheetModal>
                  <ClothHandler
                    user={user}
                    clothes={filteredBySearch}
                    selectedCategory={selectedCategory}
                    handleViewMore={handleViewMore}

                  />
                </SheetModal>
              )}
            </CategoryHolder>

            <ModalScreen
              show={showModal}
              onHide={closeModal}
              body={selectedCloth?.description}
              footer={<Button onClick={closeModal}>Back</Button>}
              name={selectedCloth?.name}
              description={selectedCloth?.description}
              price={selectedCloth?.price}
              size={selectedCloth?.size}
              image={selectedCloth?.image}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
