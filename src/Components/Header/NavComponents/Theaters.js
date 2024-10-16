import React from 'react';
import { Card, Flex } from "antd";
import theatersData from "../../DB/theatersData";
import ContentCard from "../../Card/ContentCard";

const { Meta } = Card;

const Theaters = () => {
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
        {theatersData.map((theater, index) => (
          <ContentCard 
          index = {index} 
          title = {theater.title} 
          image = {theater.image} 
          description = {theater.description} 
          city = {theater.city}
          id={theater.id} 
          category="theaters"
          />
        ))}
      </Flex>
    </div>
  );
};

export default Theaters;