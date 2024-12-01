import { Carousel} from 'antd';
import './contnent.css'; 
import ContentCard from '../Card/ContentCard';
import axios from "axios";
import React, { useEffect, useState } from "react";

const Content = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3031/cinema")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);


  const filteredMovies = data.filter((cinema) => cinema.movie.rating > 4.7);

  return (
    <div>
      {/* Карусель */}
      <div style={{ textAlign: "center" }}>
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


      <div className="container mt-5">
        <h2>Популярные</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {filteredMovies.map((cinema, index) => (
            <ContentCard
              key={cinema.id}
              index={index}
              title={cinema.title}
              image={cinema.image}
              description={cinema.description}
              city={cinema.cities} 
              id={cinema.id}
              category="cinema"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Content;