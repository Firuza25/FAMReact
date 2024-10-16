import React, {useState , useEffect, useCallback, useMemo} from "react";
import withSearchingBar from "./withSearchingBar";
import cinemaData from '../../DB/movieData';
import theatreData from '../../DB/theatersData';
import sportsData from '../../DB/sportData';
import './searchingBar.css'; 
import { Card, Row, Col, Flex } from "antd";
import ContentCard from "../../Card/ContentCard";

const { Meta } = Card;



const SearchingCitiesTemp = () => {
    const [searchCity, setSearchCity] = useState("")
    const [results, setResults] = useState([]);

    const allData = useMemo(() => {
        return [...cinemaData, ...theatreData, ...sportsData];
    }, [cinemaData, theatreData, sportsData]);
    
    const handleSearch = useCallback((event) => {
        event.preventDefault();

        const filteredResults = allData.filter((item) => {
            return item.city && item.city.toLowerCase().includes(searchCity.toLowerCase());
        });

        setResults(filteredResults);
    }, [allData, searchCity]);

    useEffect(() => {
        if (!searchCity.trim()) {
            setResults([]); 
        } else {
            const filteredResults = allData.filter((item) => {
                return item.city && item.city.toLowerCase().includes(searchCity.toLowerCase());
            });
            setResults(filteredResults);
            console.log("Filtering data by search!")
        }
    }, [searchCity]); 


    return (
        <div className="form">
            <form className="search_form" onSubmit={handleSearch}>
                <input
                type="text"
                value={searchCity}
                placeholder="search in the cities"
                className="seach_input"
                onChange={(e) => {setSearchCity(e.target.value)}} />
                    
                
                <button type="submit">Поиск</button>
            </form>

            <div style={{ marginTop: "60px" }}>
        <Row gutter={[30, 30]} justify="center">
        <Flex
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: "30px",
                  marginTop: "60px",
                }}
              >
            {results.length > 0 ? (
                
                results.map((item, index) => (
                    <ContentCard 
                    index = {index} 
                    title = {item.title} 
                    image = {item.image} 
                    description = {item.description} 
                    city = {item.city}
                    id={item.id} 
                    category={item.category}
                    />
                ))
                
            ) : (
                <p>No results found for "{searchCity}".</p> 
            )}
            </Flex>
        </Row>
    </div>

        </div>
        
        
    


    )
}
const SearchingCities = withSearchingBar(SearchingCitiesTemp);

export default SearchingCities;
