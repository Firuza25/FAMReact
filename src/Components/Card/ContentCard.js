import React, { useEffect, useCallback } from "react";
import { Card, Button, Flex } from "antd";
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const ContentCard = (props) => {
    const navigate = useNavigate();

    const handleButtonClick = useCallback(() => {
        console.log(`Button clicked for ${props.title} with ID: ${props.id}`);
        navigate(`/${props.category}/${props.id}`);
    }, [props.title, props.id, props.category, navigate]);

    return (
      <div style={{display:'flex', flexWrap:'wrap'}}>
        <Card
            key={props.index}
            hoverable
            style={{ width: 240, height: "auto" }}
            cover={<img alt={props.title} src={props.image} />}
          >
            <Meta
              title={props.title}
              description={props.description}
            />
            <div style={{ marginTop: 8 }}>
              <span style={{ fontWeight: 'bold' }}>Город: </span>
              <span>{props.city}</span>
            </div>
            <Button type="primary" onClick={handleButtonClick}>Купить билет</Button>

          </Card>
          </div>
  
    )
}

export default ContentCard;