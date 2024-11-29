import React, {useMemo, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'antd'; 
import { ArrowLeftOutlined } from '@ant-design/icons'; 
import movieData from "../DB/movieData";
import sportsData from "../DB/sportData";
import theaterData from "../DB/theatersData";  

const DetailsPage = () => {
    const { category, id } = useParams();

    const navigate = useNavigate();
    // const [item, setItem] = useState({})

    useEffect(() => {
        console.log(`Category: ${category}, ID: ${id}`)
    }, [category, id])


    const item = useMemo(() => {
        switch (category) {
            case 'cinema':
                return movieData.find(movie => movie.id.toString() === id);
            case 'sports':
                return sportsData.find(sport => sport.id.toString() === id);
            case 'theaters':
                return theaterData.find(theater => theater.id.toString() === id);
            default:
                return null;
        }
    }, [category, id]);

    const handleBackButtonClick = useCallback(() => {
        console.log(`назад`)
        navigate(`/${category}`);
    }, [category, navigate]);

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
                    <p>{item.description}</p>
                    <p><strong>Город:</strong> {item.city}</p>
                    
                </>
            ) : (
                <p>Информация не найдена</p>
            )}
        </div>
    );
}

export default DetailsPage;