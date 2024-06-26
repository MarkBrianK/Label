import React, { useState, useEffect } from "react";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import ImageHandler from "../Screens/ImageHandler";
import Levick from "../Assets/Image/Levick.png";
import { Helmet } from "react-helmet";
import Header from "../Components/Header";
import ClothHandler from "../Screens/ClothHandler";
import ModalScreen from "../Shared/ModalScreen";
import SearchBar from "../Shared/SearchBar";
import CategoryHolder from "../Shared/CategoryHolder";
import Button from "../Shared/Button";
import LoadingSpinner from "../Shared/LoadingSpinner";
import Styles from "../Assets/Styles/Home.module.css";

export default function Home({ clothes, user, userdetails }) {
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
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(loadingTimeout);
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
    <div >
      <Helmet>
        <title>Trendy and Affordable Clothing Store - Levick 23</title>
        <meta
          name="description"
          content="Discover the best clothing store near Uthiru, Nairobi. Levick 23 offers trendy and affordable clothing for both men and women. Explore a diverse range of styles and designs online."
        />
      </Helmet>

      {/* Navigation at the top */}
      <div className={`${Styles.NavContainer} bg-black`}>
        <div className="row align-items-center">
          <div className="col">
            <ImageHandler src={Levick} alt="Levick 23 Logo" className={Styles.NavLogo} />
          </div>
          <div className="col-6 my-2">
            <SearchBar className={Styles.search} setSearchQuery={setSearchQuery} />
          </div>
          <div className="col text-center">
            <a href={`mailto:${supportEmail}`}>
              <SupportAgentOutlinedIcon style={{ fontSize: 36, color: "goldenrod" }} />
            </a>
          </div>
        </div>
      </div>

      <div className={Styles.cardsHolder}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (

              <div className={Styles.cardsRow}>
                <CategoryHolder handleCategorySelect={handleCategorySelect}>
                  {(selectedCategory) => (
                    <ClothHandler
                      user={user}
                      clothes={filteredBySearch}
                      selectedCategory={selectedCategory}
                      handleViewMore={handleViewMore}
                    />
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

      {/* Bottom Navigation */}
      <Header user={user} username={userdetails} />
    </div>
  );
}
