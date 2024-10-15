import React from 'react';
import { Card, Flex } from "antd";
import theatersData from "../../DB/theatersData";
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
          <Card
            key={index}
            hoverable
            style={{ width: 240, height: "auto" }}
            cover={<img alt={theater.title} src={theater.image} />}
          >
            <Meta
              title={theater.title}
              description={`${theater.date}\n${theater.description}`} // Включаем дату в описание
            />
            <div style={{ marginTop: 8 }}>
              <span style={{ fontWeight: 'bold' }}>Город: </span>
              <span>{theater.city}</span>
            </div>
          </Card>
        ))}
      </Flex>
    </div>
  );
};

export default Theaters;