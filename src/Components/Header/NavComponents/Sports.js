import React from 'react';
import { Card, Flex } from "antd";
import sportsData from "../../DB/sportData";
import ContentCard from "../../Card/ContentCard";
const { Meta } = Card;

const Sports = () => {
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
        {sportsData.map((sport, index) => (
          <ContentCard 
          index = {index} 
          title = {sport.title} 
          image = {sport.image} 
          description = {sport.description} 
          city = {sport.city}
          id={sport.id} 
          category="sports"
          />
        ))}
      </Flex>
    </div>
  );
};

export default Sports;