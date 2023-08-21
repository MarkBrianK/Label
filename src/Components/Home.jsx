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
import "../Assets/Styles/Home.css";

export default function Home() {
  const imageStyle = {
    height: "100px",
    width: "100px",
  };

  const [clothes, setClothes] = useState([]);
  const [selectedCloth, setSelectedCloth] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredClothes = clothes.filter((cloth) =>
    cloth.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      <Header />

      <Container className="text-center mt-3">
        <div className="fixed-logo-search-container">
          <Row style={{ display: "flex", alignItems: "center" }}>
            <Col xs={3}>
              <ImageHandler src={Levick} alt="Logo" style={imageStyle} />
            </Col>
            <Col>
              <SearchBar setSearchQuery={setSearchQuery} />
            </Col>
          </Row>
        </div>
        <Row style={{ marginTop: "20vh" }}>
          <Col>
            <CategoryHolder>
              {(selectedCategory) => (
                <SheetModal>
                  {selectedCategory && (
                    <p>Selected Category: {selectedCategory}</p>
                  )}
                  <ClothHandler
                    clothes={
                      selectedCategory
                        ? filteredClothes.filter(
                            (cloth) => cloth.category === selectedCategory
                          )
                        : filteredClothes
                    }
                    handleViewMore={handleViewMore}

                  />
                </SheetModal>
              )}
            </CategoryHolder>

            <ModalScreen
              show={showModal}
              onHide={closeModal}
              body={selectedCloth?.description}
              footer={<button onClick={closeModal}>Close</button>}
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
