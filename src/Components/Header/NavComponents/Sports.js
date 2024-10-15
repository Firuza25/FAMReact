import React from 'react';
import { Card, Flex } from "antd";
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
        <Card
          hoverable
          style={{ width: 240, height: "auto" }}
          cover={
            <img
              alt="sport1"
              src="https://ticketon.kz/media/upload/9286u56439_novyy-proekt--2024-10-12t173700-679.jpg"
            />
          }
        >
          <Meta
          title={'ФК Астана - ФК Шахтер'}
            description="16 октября, 18:00
ФК Астана - ФК Шахтер
Стадион «Хан-Тенгри»"
          />
        </Card>

        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt="sport2"
              src="https://ticketon.kz/media/upload/48160u56102_fk-kayrat--fk-turan32131.jpg"
            />
          }>
            <Meta
          title={'ФК «Кайрат» - ФК «Туран»'}
            description="19 октября, 16:00
ФК «Кайрат» - ФК «Туран»
Центральный Стадион"
          />
          </Card>

        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt="sport3"
              src="https://ticketon.kz/media/upload/51933u56102_51933123.jpg"
            />
          }
        >

<Meta
          title={'Октябрьские матчи ХК «Барыс»'}
            description="29 октября, 19:00, от 900 тг.
Октябрьские матчи ХК «Барыс»"
          />
        </Card>
      </Flex>
    </div>
  );
};

export default Sports;
