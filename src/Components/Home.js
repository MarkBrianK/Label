import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={3000} className="d-block w-100 h-10"
    >
      <Carousel.Item>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src="https://i.pinimg.com/originals/d7/80/81/d7808137845528c11ada34dfa3bbfff4.jpg"
            alt="First slide"
            style={{ width: '33.33%', height: '50vh' }}
          />
          <img
            src="https://www.apetogentleman.com/wp-content/uploads/2020/04/how-to-wear-polo-shirt.jpg"
            alt="Second slide"
            style={{ width: '33.33%', height: '50vh' }}
          />
          <img
            src="https://i.pinimg.com/736x/e8/10/2e/e8102eb672183c74649c2597b544a2b2.jpg"
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
        style={{ width: '33.33%', height: '50vh' }}
      />
      <img
        src="https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?cs=srgb&dl=pexels-pixabay-267301.jpg&fm=jpg"
        alt="Second slide"
        style={{ width: '33.33%', height: '50vh' }}
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
        src="https://www.claraitosblog.com/wp-content/uploads/2022/03/IMG_20210518_150134_867.jpg"
        alt="First slide"
        style={{ width: '33.33%', height: '50vh' }}
      />
      <img
        src="https://glamsquadmagazine.com/wp-content/uploads/2021/10/20211012_213738.jpg"
        alt="Second slide"
        style={{ width: '33.33%', height: '50vh' }}
      />
      <img
        src="https://www.od9jastyles.com/wp-content/uploads/2021/01/Gorgeous-and-Fascinating-Pictures-of-Office-Wear-for-Working-Class-Ladies.jpg"
        alt="Third slide"
        style={{ width: '33.33%', height: '50vh' }}
      />
    </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default Home;
