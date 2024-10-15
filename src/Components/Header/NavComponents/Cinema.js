import React from "react";
import { Card, Flex } from "antd";

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
        <Card
          hoverable
          style={{ width: 240, height: "auto" }}
          cover={
            <img
              alt="cinema1"
              src="https://ticketon.kz/media/upload/46135u56102_dzhoker-bezumie-na-dvoikhtzhzh.jpg"
            />
          }
        >
          <Meta
          title={'Джокер: Безумие на двоих'}
            description="14 октября, 10:35, от 600 тг.
Джокер: Безумие на двоих (2024)"
          />
        </Card>

        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt="cinema2"
              src="https://ticketon.kz/media/upload/49669u56439_500_700_white_667bc522b9cef-2.jpg"
            />
          }>
            <Meta
          title={'Граф Монте-Кристо (2024)'}
            description="14 октября, 14:00, от 1 200 тг.
Граф Монте-Кристо (2024)"
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

export default Cinema;
