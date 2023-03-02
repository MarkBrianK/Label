import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Home.css"
import nike from "./Image/nike.jpg";
import puma from "./Image/puma.jpg";
import reebok from "./Image/reebok.png";
import adidas  from "./Image/adidas.jpg";
import versace from "./Image/versace.png";


function Home() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
    <Carousel activeIndex={index} onSelect={handleSelect} interval={3000} className="d-block w-100 h-10"
    >
      <Carousel.Item>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src="http://cdn.shopify.com/s/files/1/0928/3306/products/men-dress-shirts-100-cotton-plaid-shirt-men-plus-shirt-size-shirt-kenya.jpg?v=1586142650"
            alt="First slide"
            style={{ width: '33.33%', height: '50vh', marginRight:"15px" }}
          />
          <img
            src="https://media.istockphoto.com/id/864505242/photo/mens-clothing-and-personal-accessories.jpg?s=612x612&w=0&k=20&c=TaJuW3UY9IZMijRrj1IdJRwd6iWzXBlrZyQd1uyBzEY="
            alt="Second slide"
            style={{ width: '33.33%', height: '50vh', marginRight:"15px" }}
          />
          <img
            src="https://i.pinimg.com/originals/84/f6/93/84f693c1afbb4a68078407465bb8c6f3.jpg"
            alt="Third slide"
            style={{ width: '33.33%', height: '50vh' }}
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img
        src="https://images.pexels.com/photos/19090/pexels-photo.jpg?cs=srgb&dl=pexels-web-donut-19090.jpg&fm=jpg"
        alt="First slide"
        style={{ width: '33.33%', height: '50vh', marginRight:"15px" }}
      />
      <img
        src="https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?cs=srgb&dl=pexels-pixabay-267301.jpg&fm=jpg"
        alt="Second slide"
        style={{ width: '33.33%', height: '50vh', marginRight:"15px" }}
      />
      <img
        src="https://image.kilimall.com/kenya/shop/store/goods/5968/2021/06/5968_06767302645445915_1280.jpg.webp"
        alt="Third slide"
        style={{ width: '33.33%', height: '50vh' }} />
    </div>
      </Carousel.Item>
      <Carousel.Item>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img
        src="https://media.istockphoto.com/id/1208148708/photo/polka-dot-summer-brown-dress-suede-wedge-sandals-eco-straw-tote-bag-cosmetics-on-a-light.jpg?s=612x612&w=0&k=20&c=9Y135GYKHLlPotGIfynBbMPhXNbYeuDuFzreL_nfDE8="
        alt="First slide"
        style={{ width: '33.33%', height: '50vh', marginRight:"15px" }}
      />
      <img
        src="https://www.stitchfix.com/women/blog/wp-content/uploads/20-07-13_-SET_1_W_OLD-_v1_1x1-scaled.jpeg"
        alt="Second slide"
        style={{ width: '33.33%', height: '50vh', marginRight:"15px" }}
      />
      <img
        src="https://www.stitchfix.com/women/blog/wp-content/uploads/sv_231047_flat-v164-2-scaled.jpeg"
        alt="Third slide"
        style={{ width: '33.33%', height: '50vh' }}
      />
    </div>
      </Carousel.Item>
    </Carousel>

    <div className="brands" >
    <h1> OUR BRANDS</h1>
    </div>
    <div className="logo-links">

    <a href="#" > <img src={adidas} /></a>
    <a href="#" > <img src={nike} /></a>
    <a href="#" > <img src={puma} /></a>
    <a href="#" > <img src={reebok} /></a>
    <a href="#" > <img src={versace} /></a>
   
    </div>

    </div>
  );
}

export default Home;
