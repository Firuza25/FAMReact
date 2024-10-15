import React from 'react';
import { Carousel } from 'antd';
import '/Users/firuza/Desktop/reactPractice/ProjectReactEvent/lecture4/src/Components/Content /contnent.css'; 
const Content = () => (
  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
    <h2>This Week</h2> {}
    <Carousel autoplay>
      <div>
        <img 
          className="carousel-image" 
          src="https://ticketon.kz/files/media/image.psd.jpg" 
          alt="Description 1" 
        />
      </div>
      <div>
        <img 
          className="carousel-image" 
          src="path/to/your/image2.jpg" 
          alt="Description 2" 
        />
      </div>
      <div>
        <img 
          className="carousel-image" 
          src="path/to/your/image3.jpg" 
          alt="Description 3" 
        />
      </div>
      <div>
        <img 
          className="carousel-image" 
          src="path/to/your/image4.jpg" 
          alt="Description 4" 
        />
      </div>
    </Carousel>
  </div>
);
export default Content;
