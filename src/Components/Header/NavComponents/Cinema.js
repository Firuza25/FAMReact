import React from "react";
import { Card, Flex } from "antd";
import movieData from "../../DB/movieData";


const { Meta } = Card;

const Cinema = () => {
  return (
    <div>
      <Flex
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: "30px",
          marginTop: "60px",
        }}
      >
        {movieData.map((movie, index) => (
          <Card
            key={index}
            hoverable
            style={{ width: 240, height: "auto" }}
            cover={<img alt={movie.title} src={movie.image} />}
          >
            <Meta
              title={movie.title}
              description={movie.description}
            />
            <div style={{ marginTop: 8 }}>
              <span style={{ fontWeight: 'bold' }}>Город: </span>
              <span>{movie.city}</span>
            </div>
          </Card>
        ))}
      </Flex>
    </div>
  );
};

export default Cinema;