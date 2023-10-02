import React, { useState, useEffect } from "react";
import ImageHandler from "../Screens/ImageHandler";
import Levick from "../Assets/Image/Levick.png";
import SheetModal from "../Shared/SheetModal";
import Header from "../Components/Header";
import ClothHandler from "../Screens/ClothHandler";
import ModalScreen from "../Shared/ModalScreen";
import SearchBar from "../Shared/SearchBar";
import CategoryHolder from "../Shared/CategoryHolder";
import { Container, Row, Col } from "react-bootstrap";
import Button from "../Shared/Button";
import "../Assets/Styles/Home.css";

export default function Home({user, userdetails}) {
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
    // Fetch clothes data from the API
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
      <Header user={user} username={userdetails}  />

      <Container className="text-center mt-3">
        <div className="fixed-logo-search-container">
          <Row style={{ display: "flex", alignItems: "center", justifyContent:"space-evenly" }}>
            <Col xs={3}>
              <ImageHandler src={Levick} alt="Logo" style={imageStyle} />
            </Col>
            <Col className="search">
              <SearchBar setSearchQuery={setSearchQuery} />
            </Col>
          </Row>
        </div>
        <Row style={{ marginTop: "13vh"}}>
          <Col>
            <CategoryHolder handleCategorySelect={handleCategorySelect}>
              {(selectedCategory) => (
                <SheetModal>
                  <ClothHandler

                  user={user}
                    clothes={filteredBySearch}
                    selectedCategory={selectedCategory} // Pass the selectedCategory
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
          </Col>
        </Row>
      </Container>
    </div>
  );
}
