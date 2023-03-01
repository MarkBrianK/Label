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
            src="https://media.istockphoto.com/id/692909922/photo/hes-off-on-an-adventure.jpg?s=612x612&w=0&k=20&c=PDGuIM0yoBF6roGIDwmJXODe8fIRZWawmjOE4Rnb7fA="
            alt="First slide"
            style={{ width: '33.33%', height: '50vh' }}
          />
          <img
            src="https://i.pinimg.com/originals/cd/9d/5f/cd9d5f76653337711f4cf04ac78463cd.jpg"
            alt="Second slide"
            style={{ width: '33.33%', height: '50vh' }}
          />
          <img
            src="https://media.istockphoto.com/id/1293366109/photo/this-one-match-perfect-with-me.jpg?b=1&s=170667a&w=0&k=20&c=H5hgZid5Aji924X_NLc4t7zt1v5Qza_e33XI2VdgrlU="
            alt="Third slide"
            style={{ width: '33.33%', height: '50vh' }}
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img
        src="https://picsum.photos/200/300"
        alt="First slide"
        style={{ width: '33.33%', height: '50vh' }}
      />
      <img
        src="https://picsum.photos/200/300"
        alt="Second slide"
        style={{ width: '33.33%', height: '50vh' }}
      />
      <img
        src="https://picsum.photos/200/300"
        alt="Third slide"
        style={{ width: '33.33%', height: '50vh' }} />
    </div>
      </Carousel.Item>
      <Carousel.Item>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img
        src="https://picsum.photos/200/300"
        alt="First slide"
        style={{ width: '33.33%', height: '50vh' }}
      />
      <img
        src="https://picsum.photos/200/300"
        alt="Second slide"
        style={{ width: '33.33%', height: '50vh' }}
      />
      <img
        src="https://picsum.photos/200/300"
        alt="Third slide"
        style={{ width: '33.33%', height: '50vh' }}
      />
    </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default Home;
