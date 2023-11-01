import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from '@mui/icons-material/StarBorder';

function StarRating({ rating }) {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < rating && rating > 0) {
      stars.push(<StarIcon key={i} className="star filled-star" />);
    } else {
      stars.push(<StarBorderIcon key={i} className="star" />);
    }
  }

  return <div className="star-rating">{stars}</div>;
}

export default StarRating;
