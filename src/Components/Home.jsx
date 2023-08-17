import React from 'react';
import ImageHandler from '../Screens/ImageHandler';
import Levick from "../Assets/Image/Levick.png";
import SearchBar from '../Shared/SearchBar';
import SheetModal from '../Shared/SheetModal';

export default function Home() {
  const imageStyle = {
    height: "100px",
    width: "100px"
  };

  return (
    <div style={{backgroundColor:"black", minHeight:"100vh"}}>
      <ImageHandler src={Levick} alt="Logo" style={imageStyle} />
      <SearchBar></SearchBar>
      <SheetModal ></SheetModal>
    </div>
  );
}
