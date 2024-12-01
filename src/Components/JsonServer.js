

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "antd";

const { Meta } = Card;

function JsonServer() {
    const [data, setData] = useState([]);
    const [selectedCity, setSelectedCity] = useState("Семей");

    useEffect(() => {
        axios.get('http://localhost:3031/cinema')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    // Handle button click (for now, it's just a placeholder function)
    const handleButtonClick = () => {
        alert("Билет куплен!");
    };

    // Filter cinemas based on the selected city
    const filteredCinemas = data.filter(cinema =>
        cinema.cities.some(city => city.name === selectedCity)
    );

    return (
        <div className="container mt-5">
            {/* City Select Dropdown */}
            <div className="mb-3">
                <label htmlFor="citySelect" className="form-label">Выберите город:</label>
                <select
                    id="citySelect"
                    className="form-select"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                >
                    <option value="Семей">Семей</option>
                    <option value="Алматы">Алматы</option>
                    <option value="Нур-Султан">Нур-Султан</option>
                </select>
            </div>
            {/* Display Cinemas as Cards for the selected city */}
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {filteredCinemas.map((cinema) => (
                    cinema.cities.map((city) => {
                        if (city.name === selectedCity) {
                            return city.theaters.map((theater) => (
                                <div key={cinema.id + theater.id} style={{ margin: '10px' }}>
                                    {theater.schedule.map((schedule) => (
                                        <div key={schedule.id} style={{ marginBottom: '20px' }}>
                                            {schedule.sessions.map((session, sessionIndex) => (
                                                <Card
                                                    key={sessionIndex}
                                                    hoverable
                                                    style={{ width: 240, height: "auto" }}
                                                    cover={<img alt={cinema.title} src={cinema.image} />}
                                                >
                                                    <Meta
                                                        title={cinema.title}
                                                        description={cinema.description}
                                                    />
                                                    <div style={{ marginTop: 8 }}>
                                                        <span style={{ fontWeight: 'bold' }}>Город: </span>
                                                        <span>{city.name}</span>
                                                    </div>
                                                    <div style={{ marginTop: 8 }}>
                                                        <span style={{ fontWeight: 'bold' }}>Дата: </span>
                                                        <span>{schedule.date}</span>
                                                    </div>
                                                    <div style={{ marginTop: 8 }}>
                                                        <span style={{ fontWeight: 'bold' }}>Время: </span>
                                                        <span>{session.time}</span>
                                                    </div>
                                                    <div style={{ marginTop: 8 }}>
                                                        <span style={{ fontWeight: 'bold' }}>Цена: </span>
                                                        <span>{session.price} тг</span>
                                                    </div>
                                                    <Button type="primary" onClick={handleButtonClick}>Купить билет</Button>
                                                </Card>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ));
                        }
                        return null;
                    })
                ))}
            </div>
        </div>
    );
}

export default JsonServer;




