import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { Button } from "react-bootstrap";
import whatsapp from "./Image/whatsapp.png";
import "./Styles/Cloth.css";

const HandleCloth = () => {
  const { clothId } = useParams();
  const [likeId, setLikeId] = useState(null);
  const [cloth, setCloth] = useState(null);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const sessionCookie = parseInt(sessionStorage.getItem("user_id"));
  const [inputCommentValue, setInputCommentValue] = useState("");

  useEffect(() => {
    async function fetchCloth() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/cloths/${clothId}`,
          {
            headers: {
              Authorization: `Bearer ${sessionCookie}`,
            },
          }
        );
        setCloth(response.data);
        setLikes(response.data.likes.length);
        setComments(response.data.comments);
        const value = response.data.likes.find(
          (like) => like.user_id === sessionCookie
        );
        setLikeId(value?.id);
        setLiked(value !== undefined);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCloth();
  }, []);

  const handleLike = async () => {
    try {
      if (liked) {
        // Unlike the cloth
        await axios.delete(
          `http://127.0.0.1:3000/cloths/${clothId}/likes/${likeId}`,
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
          `http://127.0.0.1:3000/cloths/${clothId}/likes`,
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

  const handleComment = async (clothId, comment) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:3000/cloths/${clothId}/comments`,
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
        `http://127.0.0.1:3000/cloths/${clothId}/comments/${commentId}`,
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
    const message = `I'm interested in the cloth (${cloth.image}).`;

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

  if (!cloth) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cloth-container">
      <div className="cloth-details">
        <div className="cloth-image">
          <img src={cloth.image} alt="" />
        </div>
        <div className="cloth-info">
          <p>Description: {cloth.description}</p>
          <div className="like-section">
            <FaHeart
              className={`like-icon ${liked ? "liked" : ""}`}
              onClick={handleLike}
            />
            <p>Likes: {likes}</p>
          </div>
        </div>
      </div>
      <div className="comment-section">
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
        <form className="comment-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Add a comment"
            value={inputCommentValue}
            onChange={(e) => setInputCommentValue(e.target.value)}
          />
          <button
            type="submit"
            onClick={() => handleComment(clothId, inputCommentValue)}
          >
            Submit
          </button>
        </form>
      </div>
      <Link className="whatsapp-link" onClick={handleWhatsAppContact}>
        <p>
          Contact us for more details <img src={whatsapp} alt="" />
        </p>
      </Link>
    </div>
  );
};

export default HandleCloth;
