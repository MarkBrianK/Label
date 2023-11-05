import React, { useState, useEffect } from "react";
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
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
import LoadingSpinner from "../Shared/LoadingSpinner";
import "../Assets/Styles/Home.css";

export default function Home({ clothes, user, userdetails }) {
  const imageStyle = {
    height: "100px",
    width: "100px",
  };

  const [selectedCloth, setSelectedCloth] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const supportEmail = "levickwears@gmail.com";



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleViewMore = (cloth) => {
    setSelectedCloth(cloth);
    setShowModal(true);
  };

  useEffect(() => {
    // Simulate loading delay for demonstration purposes
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after loading (replace this with your actual loading logic)
    }, 2000); // Adjust the delay duration as needed

    window.scrollTo(0, 0);
  }, []);
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
          <div className="logo" style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
            <ImageHandler src={Levick} alt="Levick 23 Logo" style={imageStyle} />
          </div>

          <div className="search">
            <SearchBar setSearchQuery={setSearchQuery} />
          </div>
          <div className="support-email">
            <a href={`mailto:${supportEmail}`}> <SupportAgentOutlinedIcon style={{ fontSize: 32, marginRight: 4, color: "goldenrod" }} /> </a>
          </div>
        </div>
      </div>
      <div className="cards-holder">
        {isLoading ? (
          <LoadingSpinner /> // Display the loading spinner while content is loading
        ) : (
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
        )}
      </div>
    </div>
  </div>
  );
}
