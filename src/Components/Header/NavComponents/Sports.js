import React from 'react';
import { Card, Flex } from "antd";
import sportsData from "../../DB/sportData";
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
          <Card
            key={index}
            hoverable
            style={{ width: 240, height: "auto" }}
            cover={<img alt={sport.title} src={sport.image} />}
          >
            <Meta
              title={sport.title}
              description={`${sport.date}\n${sport.description}`} // Включаем дату в описание
            />
            <div style={{ marginTop: 8 }}>
              <span style={{ fontWeight: 'bold' }}>Город: </span>
              <span>{sport.city}</span>
            </div>
          </Card>
        ))}
      </Flex>
    </div>
  );
};

export default Sports;