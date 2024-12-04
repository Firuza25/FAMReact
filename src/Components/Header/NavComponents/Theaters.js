import React from 'react';
import { Flex } from "antd";
import { useSelector } from 'react-redux';
import ContentCard from "../../Card/ContentCard";

const Theaters = () => {
  const { theaterData } = useSelector((state) => state.data); // Accessing theaterData from Redux store

  return (
    <div>
      <Flex
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: "30px",
          marginTop: "60px",
          flexWrap: "wrap",
          width: "80%",
        }}
      >
        {theaterData.map((theater) => (
          <ContentCard 
            key={theater.id}
            title={theater.title} 
            image={theater.image} 
            description={theater.description} 
            city={theater.city}
            id={theater.id} 
            category="theaters"
            data={theater.data}  // Passing the theater data
          />
        ))}
      </Flex>
    </div>
  );
};

export default Theaters;
