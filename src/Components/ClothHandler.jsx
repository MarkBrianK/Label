import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { Button } from "react-bootstrap";
import whatsapp from "./Image/whatsapp.png";
import "./Styles/Cloth.css";

const HandleCloth = () => {
  const { clothId } = useParams();
  const [likeId, setLikeId]= useState(null)
  const [likeValue, setLikeValue] = useState([])
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
        setLikeValue(response.data.likes)
        setLikes(response.data.likes.length);
        setComments(response.data.comments);
        const value = response.data.likes.find(like =>like.user_id === sessionCookie)
        setLikeId(value.id);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCloth();
  }, []);

  const handleLike = async () => {
    try {
      if (likeId !== undefined) {
        // Unlike the cloth
        await axios.delete(`http://127.0.0.1:3000/cloths/${clothId}/likes`, {
          headers: {
            Authorization: `Bearer ${sessionCookie}`,
          },
        });
        setLiked(false);
        setCloth((prevCloth) => ({
          ...prevCloth,
          likes: prevCloth.likes - 1,
        }));
      } else {
        // Check if the user has already liked the cloth

        if (likeValue.user_id === sessionCookie ) {
          // Unlike the cloth
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
          setCloth((prevCloth) => ({
            ...prevCloth,
            likes: prevCloth.likes + 1,
            likes: likeResponse.data.likes,
          }));
        } else{
          await axios.delete(`http://127.0.0.1:3000/cloths/${clothId}/likes/${likeId}`, {
            headers: {
              Authorization: `Bearer ${sessionCookie}`,
            },
          });
          setLiked(false);
          setCloth((prevCloth) => ({
            ...prevCloth,
            likes: prevCloth.likes - 1,
          }));
        }
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

  const handleWhatsAppContact = () => {
    const phoneNumber = "+254758750384"; // Replace with your WhatsApp phone number
    const image = cloth.image; // Assuming the cloth.image is a URL to the image
    const message = `I'm interested in the cloth (${image}).`;

    // Fetch the image as a Blob object
    fetch(image)
      .then((response) => response.blob())
      .then((blob) => {
        // Read the image data as a base64 string
        const reader = new FileReader();
        reader.onloadend = function () {
          const base64Image = reader.result;
          const encodedImage = encodeURIComponent(base64Image);
          const whatsappURL = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
            message
          )}&image=${encodedImage}`;

          window.open(whatsappURL, "_blank");
        };
        reader.readAsDataURL(blob);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!cloth) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home">
      <div className="cloth">
        <div className="like">
          <img src={cloth.image} alt="" />
          <br />
          <p>Description: {cloth.description}</p>
          <button onClick={handleLike}>
            <FaHeart color={liked ? "red" : "black"} />
            {liked ? "Unlike" : "Like"} <br />
          </button>

          <p>Likes: {likes}</p>
        </div>

        <div className="comment">
          <h3>Comments</h3>
          {comments.length > 0 ? (
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>
                  {comment.body}{" "}
                  {comment.user_id === sessionCookie && (
                    <Button onClick={() => handleDeleteComment(comment.id)}>
                      Delete
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}
          <form onSubmit={(e) => e.preventDefault()}>
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
      </div>

      <Link className="whatsapp" onClick={handleWhatsAppContact}>
        <p>
          {" "}
          Contact us for more details <img src={whatsapp} alt="" />{" "}
        </p>
      </Link>
    </div>
  );
};

export default HandleCloth;
