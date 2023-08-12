import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Modal, Image, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import "./Styles/Home.css";
import Header from "./Header";
import whatsapp from "./Image/whatsapp.png";
import levick from "./Image/Levick.png";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cloths, setCloths] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCloth, setSelectedCloth] = useState(null);
  const [likeId, setLikeId] = useState(null);
  const [cloth, setCloth] = useState(null);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const sessionCookie = parseInt(sessionStorage.getItem("user_id"));
  const navigate = useNavigate();
  const [inputCommentValue, setInputCommentValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesResponse = await axios.get(
          "https://levick-7b15defb7ee9.herokuapp.com/categories"
        );
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const handleViewMore = async (cloth) => {
    // if (!sessionCookie) {
    //   window.alert("Please sign in or sign up to view more details.");
    //   return;
    // }

    setSelectedCloth(cloth);
    setShowModal(true);

    try {
      const response = await axios.get(
        `https://levick-7b15defb7ee9.herokuapp.com/${cloth.id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionCookie}`,
          },
        }
      );

      const value = response.data.likes.find(
        (like) => like.user_id === sessionCookie
      );

      setCloth(response.data);
      setLikes(response.data.likes.length);
      setComments(response.data.comments);
      setLikeId(value?.id);
      setLiked(value !== undefined);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      if (liked) {
        await axios.delete(
          `https://levick-7b15defb7ee9.herokuapp.com/cloths/${selectedCloth?.id}/likes/${likeId}`,
          {
            headers: {
              Authorization: `Bearer ${sessionCookie}`,
            },
          }
        );
        setLiked(false);
        setLikes((prevLikes) => prevLikes - 1);
      } else {
        // Like the cloth
        const likeResponse = await axios.post(
          `https://levick-7b15defb7ee9.herokuapp.com/cloths/${selectedCloth?.id}/likes`,
          {},
          {
            headers: {
              Authorization: `Bearer ${sessionCookie}`,
            },
          }
        );
        setLiked(true);
        setLikes((prevLikes) => prevLikes + 1);
        setLikeId(likeResponse.data.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async (selectedClothId, comment) => {
    try {
      const response = await axios.post(
        `https://levick-7b15defb7ee9.herokuapp.com/cloths/${selectedClothId}/comments`,
        { body: comment },
        {
          headers: {
            Authorization: `Bearer ${sessionCookie}`,
          },
        }
      );
      setComments((prevComments) => [...prevComments, response.data]);
      setInputCommentValue("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `https://levick-7b15defb7ee9.herokuapp.com/cloths/${selectedCloth?.id}/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionCookie}`,
          },
        }
      );
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const handleWhatsAppContact = async () => {
    const phoneNumber = "+254758750384";
    const message = `I'm interested in the cloth.`;

    try {
      const response = await fetch(selectedCloth?.image);
      const imageBlob = await response.blob();
      const imageFile = new File([imageBlob], "cloth_image.jpg", {
        type: imageBlob.type,
        lastModified: Date.now(),
      });

      const formData = new FormData();
      formData.append("image", imageFile);

      const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}`;

      const win = window.open(whatsappURL, "_blank");

      win.onload = () => {
        const attachmentInput = win.document.querySelector(
          'input[type="file"][accept="image/*"]'
        );

        if (attachmentInput) {
          attachmentInput.files = formData;
        }
      };
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCloths = async () => {
      try {
        let url = "https://levick-7b15defb7ee9.herokuapp.com/cloths";
        if (selectedCategory) {
          url += `?categoryID=${selectedCategory}`;
        }
        const clothsResponse = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${sessionCookie}`,
          },
        });
        setCloths(clothsResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCloths();
  }, [sessionCookie, selectedCategory]);

  const handleCategorySelection = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const sortedCloths = selectedCategory
    ? cloths.filter((cloth) => cloth.category.id === selectedCategory)
    : cloths;

  return (
    <div className="home-page">
      <p className="head">
        {" "}
        Levick<span>23</span>
      </p>

      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <Header />
          </div>
          <div className="col-md-8 content">
            <div>
              {categories.length > 0 ? (
                <div className="category-buttons">
                  {categories
                    .slice(
                      currentPage * itemsPerPage,
                      (currentPage + 1) * itemsPerPage
                    )
                    .map((category) => (
                      <div
                        key={category.id}
                        variant={selectedCategory === category.i}
                        onClick={() => handleCategorySelection(category.id)}
                      >
                        <Image
                          src={category.image}
                          alt={category.name}
                          className="category-image"
                        />
                      </div>
                    ))}
                  <div className="category-navigation">
                    {currentPage > 0 && (
                      <FaAngleLeft
                        className="category-navigation-icon"
                        onClick={handlePreviousPage}
                      />
                    )}
                    {(currentPage + 1) * itemsPerPage < categories.length && (
                      <FaAngleRight
                        className="category-navigation-icon"
                        onClick={handleNextPage}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <p>No categories found.</p>
              )}
            </div>

            <Row className="row">
              {sortedCloths.map((cloth) => (
                <Col key={cloth.id} xs={12} sm={6} md={4} lg={3}>
                  <Card className="card-container">
                    <Card.Img
                      className="image"
                      variant="top"
                      src={cloth.image}
                      alt={cloth.title}
                    />
                    <Card.Body className="text-center">
                      <Card.Title>{cloth.title}</Card.Title>
                      <Card.Text className="description">
                        {cloth.description}
                      </Card.Text>
                      <Button
                        className="custom-button"
                        onClick={() => handleViewMore(cloth)}
                      >
                        View More
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header className="modal-header" closeButton>
                <Modal.Title className="modal-title">Cloth Details</Modal.Title>
              </Modal.Header>
              <Modal.Body className="modal-body">
                {selectedCloth && (
                  <div>
                    <h2>{selectedCloth.name}</h2>
                    <p>{selectedCloth.description}</p>
                    <div className="cloth-image">
                      <img
                        src={selectedCloth.image}
                        alt=""
                        className="modal-image"
                      />
                    </div>
                    <FaHeart
                      className={`like-icon ${liked ? "liked" : ""}`}
                      onClick={handleLike}
                    />

                    <p>Likes: {likes}</p>
                    <h3>Comments</h3>
                    {comments.length > 0 ? (
                      <ul className="comment-list">
                        {comments.map((comment) => (
                          <li key={comment.id} className="comment-item">
                            {comment.body}{" "}
                            {comment.user_id === sessionCookie && (
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDeleteComment(comment.id)}
                              >
                                Delete
                              </Button>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No comments yet.</p>
                    )}
                    <form
                      className="comment-form"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <input
                        type="text"
                        placeholder="Add a comment"
                        value={inputCommentValue}
                        onChange={(e) => setInputCommentValue(e.target.value)}
                      />
                      <button
                        type="submit"
                        onClick={() =>
                          handleComment(selectedCloth?.id, inputCommentValue)
                        }
                      >
                        Comment{" "}
                      </button>
                    </form>
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer className="modal-footer">
                <Link className="whatsapp-link" onClick={handleWhatsAppContact}>
                  <p>
                    Contact us for more details <img src={whatsapp} alt="" />
                  </p>
                </Link>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="col-md-2 info-section ">
            <div className="contact-info">
              <p><h3>Email:</h3><a href="mailto: levickwears@gmail.com" style={{color:"goldenrod", textDecoration:"none"}}> levickwears@gmail.com</a></p>
              <p> <h3>Phone: </h3><a href="tel: +254719435030" style={{color:"goldenrod", textDecoration:"none", fontFamily:""}}> +2547 19 435 030</a></p>
              <p><h3>Adress:</h3> Uthiru, Nairobi</p><br/>
            </div>
            <Image className="logo" src={levick} alt="levick" ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
