import React from 'react';
import ImageHandler from '../Screens/ImageHandler';
import Levick from "../Assets/Image/Levick.png"

export default function Home() {
  const imageStyle = {
    height: "100px",
    width: "100px"
  };

  return (
    <div style={{backgroundColor:"black"}}>
      <ImageHandler src={Levick} alt="Logo" style={imageStyle} />
    </div>
  );
}
