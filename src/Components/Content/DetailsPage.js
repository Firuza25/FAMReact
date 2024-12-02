import React, { useMemo, useEffect, useCallback, useContext, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons'; 
import sportsData from "../DB/sportData";
import theaterData from "../DB/theatersData";  
import { context } from '../../App';
import "./DetailsPage.css"
import BuyTicketModal from './BuyTicketModal';
import dayjs from 'dayjs';
import CommentForCard from './Comments/CommentForCard';


const DetailsPage = () => {
    const { cinemaData, isLoggedIn, activeUser } = useContext(context);
    const { category, id } = useParams();
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(`Category: ${category}, ID: ${id}`)
    }, [category, id]);

    const item = useMemo(() => {
        switch (category) {
            case 'cinema':
                return cinemaData.find(movie => movie.id.toString() === id);
            case 'sports':
                return sportsData.find(sport => sport.id.toString() === id);
            case 'theaters':
                return theaterData.find(theater => theater.id.toString() === id);
            default:
                return null;
        }
    }, [category, id, cinemaData]);

    const handleBackButtonClick = useCallback(() => {
        navigate(`/${category}`);
    }, [category, navigate]);

    const formatDateToWords = (dateStr) => {
        const date = new Date(dateStr);
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('ru-RU', options);
    }

    const scheduleRef = useRef(null);
    const handleSchrolling = () => {
        if (scheduleRef.current) {
            scheduleRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    return (
        <div className="event-details-wrapper">
            <button className="back-button" onClick={handleBackButtonClick}>
                <ArrowLeftOutlined />
                Назад
            </button>
            {item ? (
                <>
                    <h1 className="event-title">{item.title}</h1>
                    <img className="event-image" src={item.image} alt={item.title} />
                    <p className="event-details">{item.details}</p>
                    <div className="event-data">
                        {item.data && (
                            <>
                                <p>Год выпуска: {dayjs(item.data.releaseData).year()}</p>
                                <div>Возрастное ограничение: <span>{item.data.ageLimit}</span></div>
                                <div>Жанры: <span>{item.data.genres}</span></div>
                                <div>Актеры: <span>{item.data.actors}</span></div>
                            </>
                        )}
                    </div>
                    <button className="buy-ticket-button" onClick={handleSchrolling}>Купить билет</button>
                    
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", position: "relative" }}>
                        <div style={{ borderBottom: "1px grey solid", margin: "100px 50px", width: "300px" }}></div>
                        <p style={{ fontSize: "32px", position: "absolute", top: "50px" }}>Расписание</p>
                        <div style={{ borderBottom: "1px grey solid", margin: "100px 50px", width: "300px" }}></div>
                    </div>

                    {category === "cinema" && item.cities && (
                        <div ref={scheduleRef}> 
                            {item.cities.map((city, i) => (
                                city.theaters.map((e, j) => (
                                    e.schedule.map((d, k) => (
                                        <div key={`${i}-${j}-${k}`} className="schedule-container">
                                            <div className="schedule-date">{formatDateToWords(d?.date)}</div>
                                            <div className="schedule-info">
                                                <p>{e.name}</p>
                                                <p>{city.name}</p>
                                            </div>
                                            <div className="sessions-container">
                                                {d?.sessions.map((tim, t) => (
                                                    <div key={t} className="schedule-time" onClick={() => setVisible(true)}>
                                                        {tim.time}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ))
                            ))}
                        </div>
                    )}

                    <BuyTicketModal visible={visible} setVisible={setVisible} ticketDetails={item} isLoggedIn={isLoggedIn} />
                    
                    <CommentForCard
  isLoggedIn={isLoggedIn}
  username={activeUser?.username}
  movieId={item?.id} 
/>


                </>
            ) : (
                <p>Информация не найдена</p>
            )}
        </div>
    );
}

export default DetailsPage;
