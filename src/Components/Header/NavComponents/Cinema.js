import React, { useContext } from "react";
import { Card, Flex } from "antd";
import movieData from "../../DB/movieData";
import ContentCard from "../../Card/ContentCard";
import { context } from "../../../App";


const Cinema = () => {
  const { cinemaData } = useContext(context)
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
        {cinemaData.map((movie, index) => (
          <ContentCard 
          key={movie.id}
          index = {index} 
          title = {movie.title} 
          image = {movie.image} 
          description = {movie.description} 
          city = {movie.cities}
          id={movie.id} 
          category="cinema"
          />
        ))}
      </Flex>
    </div>
  );
};

export default Cinema;