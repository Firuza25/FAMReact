import React, { useCallback } from "react";
import { Card, Button } from "antd";
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const ContentCard = (props) => {
    const navigate = useNavigate();

    const handleButtonClick = useCallback(() => {
        console.log(`Button clicked for ${props.title} with ID: ${props.id}`);
        // Navigate to the specific details page based on category and id
        navigate(`/${props.category}/${props.id}`);
    }, [props.title, props.id, props.category, navigate]);

    // Handle city display differently for cinema and theater
    let cityNames = '';
    if (props.category === "cinema") {
        // Cinema has multiple cities
        cityNames = props.cities ? props.cities.map(city => city.name).join(", ") : '';
    } else if (props.category === "theaters") {
        // Theater has only one city
        cityNames = props.city || '';
    }

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
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
                    <span>{cityNames}</span>
                </div>
                <Button type="primary" onClick={handleButtonClick}>Купить билет</Button>
            </Card>
        </div>
    )
}

export default ContentCard;
