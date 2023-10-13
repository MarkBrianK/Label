import React, { useState, useEffect } from "react";
import CardHolder from "../Shared/CardHolder";
import LikeButton from "./LikesHandler";
import { Link } from "react-router-dom";
import { FaComment } from "react-icons/fa";
import { Alert } from "react-bootstrap";
import "../Assets/Styles/Handler.css";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function ClothHandler({ clothes, handleViewMore, selectedCategory, user }) {
  const [likeErrorMessage, setLikeErrorMessage] = useState("");
  const [shuffledClothes, setShuffledClothes] = useState([]);

  useEffect(() => {
    const newShuffledClothes = shuffleArray([...clothes]);
    setShuffledClothes(newShuffledClothes);
  }, [clothes]);

  return (
    <div className="cloth-container">
      {shuffledClothes.map((item, index) => (
        <CardHolder
          key={index}
          user={user}
          cloth={item}
          handleViewMore={() => handleViewMore(item)}
          className="cards"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20%",
              marginLeft: "30%",
            }}
          >
            <LikeButton
              cloth={item}
              onLikeError={(errorMessage) => setLikeErrorMessage(errorMessage)}
              user={user}
            />

            <Link
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                color: "black",
              }}
              to={`comments/${item.id}`}
              className="comment-link ml-2"
            >
              <FaComment /> {item.comments.length}
            </Link>
          </div>
          {likeErrorMessage && <Alert variant="danger" style={{ fontSize: "xx-small" }}>{likeErrorMessage}</Alert>}
        </CardHolder>
      ))}
    </div>
  );
}

export default ClothHandler;
