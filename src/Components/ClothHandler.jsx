import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa";

const HandleCloth = () => {
  const { clothId } = useParams();
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
        setLiked(response.data.liked);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCloth();
  }, [clothId, sessionCookie]);

  const handleLike = async () => {
    try {
      const response = await axios.post(
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
        likes: response.data.likes,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlike = async () => {
    try {
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
      setComments((prevComments) => ({
        ...prevComments,
        [clothId]: [...(prevComments[clothId] || []), response.data],
      }));
      setInputCommentValue("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${sessionCookie}`,
        },
      });
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
    <div>


      <img src={cloth.image} alt="" /> <br/>
      <p>Description: {cloth.description}</p>
      <button onClick={liked ? handleUnlike : handleLike}>
        <FaHeart color={liked ? "red" : "black"} />
        {liked ? "Unlike" : "Like"} <br />
      </button>
      <p>Likes: {String(cloth.likes.length)}</p> {/* Display the number of likes */}

      <h3>Comments</h3>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              {comment.text}{" "}
              {comment.userId === sessionCookie && (
                <button onClick={() => handleDeleteComment(comment.id)}>
                  Delete
                </button>
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

      <button onClick={handleWhatsAppContact}>Contact via WhatsApp</button>
    </div>
  );

};

export default HandleCloth;
