import React from "react";
import { Card, Flex } from "antd";
import movieData from "../../DB/movieData";
import ContentCard from "../../Card/ContentCard";


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
          <ContentCard 
          index = {index} 
          title = {movie.title} 
          image = {movie.image} 
          description = {movie.description} 
          city = {movie.city}
          id={movie.id} 
          category="cinema"
          />
        ))}
      </Flex>
    </div>
  );
};

export default Cinema;