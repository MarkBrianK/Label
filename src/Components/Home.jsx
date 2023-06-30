import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Modal, Image } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import "./Styles/Home.css";
import Navigation from "./Navigation";
import whatsapp from "./Image/whatsapp.png";

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

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesResponse = await axios.get(
          "http://localhost:3000/categories"
        );
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const handleViewMore = async (cloth) => {
    setSelectedCloth(cloth);
    setShowModal(true);

    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/cloths/${cloth.id}`,
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
          `http://127.0.0.1:3000/cloths/${selectedCloth?.id}/likes/${likeId}`,
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
          `http://127.0.0.1:3000/cloths/${selectedCloth?.id}/likes`,
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
        `http://127.0.0.1:3000/cloths/${selectedClothId}/comments`,
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
        `http://127.0.0.1:3000/cloths/${selectedCloth?.id}/comments/${commentId}`,
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

  const handleWhatsAppContact = async () => {
    const phoneNumber = "+254758750384"; // Replace with your WhatsApp phone number
    const message = `I'm interested in the cloth (${selectedCloth?.image}).`;

    try {
      const response = await fetch(cloth.image);
      const imageBlob = await response.blob();
      const imageFile = new File([imageBlob], "cloth_image.jpg", {
        type: imageBlob.type,
        lastModified: Date.now(),
      });

      const formData = new FormData();
      formData.append("image", imageFile);

      const whatsappURL = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
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
        let url = "http://localhost:3000/cloths";
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

  useEffect(() => {
    if (!sessionCookie) {
      navigate("/signin");
    }
  }, [sessionCookie, navigate]);

  const handleCategorySelection = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const sortedCloths = selectedCategory
    ? cloths.filter((cloth) => cloth.category.id === selectedCategory)
    : cloths;

  return (
    <div className="home-page">
      <div className="container">
        <div className="row">
          <div className="col-md-2 ">
            <Navigation />
          </div>
          <div className="col-md-10 content">
            <div>
              {categories.length > 0 ? (
                <div className="category-buttons">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={
                        selectedCategory === category.id
                          ? "primary"
                          : "secondary"
                      }
                      onClick={() => handleCategorySelection(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))}
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
                    <Card.Body>
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
              <Modal.Header closeButton>
                <Modal.Title>Cloth Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
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
                        Submit
                      </button>
                    </form>
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Link className="whatsapp-link" onClick={handleWhatsAppContact}>
                  <p>
                    Contact us for more details <img src={whatsapp} alt="" />
                  </p>
                </Link>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
