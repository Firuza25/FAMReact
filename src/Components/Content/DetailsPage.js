import React, {useMemo, useEffect, useCallback, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'antd'; 
import { ArrowLeftOutlined } from '@ant-design/icons'; 
import sportsData from "../DB/sportData";
import theaterData from "../DB/theatersData";  
import { context } from '../../App';
import "./DetailsPage.css"

const DetailsPage = () => {
    const { cinemaData } = useContext(context)
    const { category, id } = useParams();

    const navigate = useNavigate();
    // const [item, setItem] = useState({})

    useEffect(() => {
        console.log(`Category: ${category}, ID: ${id}`)
    }, [category, id])


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
    useEffect(()=> {
        console.log("Movie: ", item)
    }, [item])

    const handleBackButtonClick = useCallback(() => {
        console.log(`назад`)
        navigate(`/${category}`);
    }, [category, navigate]);

    const formatDateToWords = (dateStr) => {
        const date = new Date(dateStr)
        const options = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'}
        return date.toLocaleDateString('ru-RU', options)
    }
    const scheduleRef = useRef(null) //attached it to div container
    const handleSchrolling = (scheduleRef) => {
        if(scheduleRef.current) {
            scheduleRef.current.scrollIntoView({behavior: "smooth"})
        }

    }


    return (
        <div>
             <Button 
                color="default"
                veriant="outlined"
                onClick={handleBackButtonClick} 
                style={{ marginBottom: '20px' }}
                icon={<ArrowLeftOutlined />} 
            >
                Назад
            </Button>
            {item ? (
                <>
                   
                    <h1>{item.title}</h1>
                    <img src={item.image} alt={item.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
                    <p>{item.details}</p>
                    {/* <p><strong>Город:</strong> {item.city}</p> */}
                    <button onClick={() => {handleSchrolling(scheduleRef)}}>Купить билет</button>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        position: "relative"
                    }}>
                        <div style={{
                        borderBottom: "1px grey solid",
                        margin: "100px 50px",
                         width: "300px",
            
                    }}></div>
                    <p style={{
                        fontSize: "32px",
                        position: "absolute",
                        top: "50px"
                    }}>Расписание</p>
                    <div style={{
                        borderBottom: "1px grey solid",
                        margin: "100px 50px",
                        width: "300px"
                    }}></div>
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
                <div key={t} className="schedule-time">
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
                    

                    
                </>
            ) : (
                <p>Информация не найдена</p>
            )}
        </div>
    );
}

export default DetailsPage;