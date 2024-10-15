import React from 'react';
import { Card, Flex } from "antd";
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
        <Card
          hoverable
          style={{ width: 240, height: "auto" }}
          cover={
            <img
              alt="th1"
              src="https://ticketon.kz/media/upload/51121u54478_500kh700-9.png"
            />
          }
        >
          <Meta
          title={'Балет «Спящая красавица» в Темиртау'}
            description="21 октября, 19:00
Балет «Спящая красавица» в ...
ТДК Темиртау"
          />
        </Card>

        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt="th2"
              src="https://ticketon.kz/media/upload/50909u54364_04fdf181-265b-41c9-a778-8ec89f7484ec.jpg"
            />
          }>
            <Meta
          title={'ОРКЕСТР МЕЧТЫ. МЕДЬ'}
            description="3, 4 ноября
ОРКЕСТР МЕЧТЫ. МЕДЬ
Almaty theatre"
          />
          </Card>

        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt="cinema3"
              src="https://ticketon.kz/media/upload/51847u57013_chas-tishiny-2024-afisha.jpg"
            />
          }
        >

<Meta
          title={'Час тишины (2024)'}
            description="14 октября, 20:35, от 1 600 тг.
Час тишины (2024)"
          />
        </Card>
      </Flex>
    </div>
  );
};

export default Theaters;
