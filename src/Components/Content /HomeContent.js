import React from 'react';
import { Carousel} from 'antd';
import './contnent.css'; 

const Content = () => (
  <div >
  <div style={{ textAlign: 'center' }}>
    <h2>This Week</h2> 
    <Carousel autoplay>
      <div>
        <img 
          className="carousel-image" 
          src="https://ticketon.kz/media/upload/46185u56103_whatsapp-image-2024-09-23-at-11-49-28.jpeg" 
          alt="Description 1" 
        />
      </div>
      <div>
        <img 
          className="carousel-image" 
          src="https://api.galaconcert.kz/storage/shows/242/conversions/main.webp" 
          alt="Description 2" 
        />
      </div>
      <div>
        <img 
          className="carousel-image" 
          src="https://ticketon.kz/files/media/eventandrea-bocelli-vse-khity-astanautm_source=web&utm_medium=slaider&utm_campaign=andrea-bocelli-vse-khity-astana.png" 
          alt="Description 3" 
        />
      </div>
      <div>
        <img 
          className="carousel-image" 
          src="https://ticketon.kz/files/media/norvi-ticketon-resize-1448x440.jpg" 
          alt="Description 4"
        />
      </div>
    </Carousel>
  </div>
  
  </div>
   
);
export default Content;
