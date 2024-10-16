import React from 'react';
import { Carousel, Card, Row, Col } from 'antd';
import './contnent.css'; 
import ContentCard from '../Card/ContentCard';
import SearchingCities from '../Header/SearchingBar/searchingCities';

const SearchingResults = ({ searchResults }) => (
  <div>
    {searchResults.length > 0 ? (
        searchResults.map((item) => (
          <ContentCard key={item.id} {...item} />
        ))
      ) : (
        <p>No results found.</p>
      )}
    
  
  </div>
   
);
export default SearchingResults;
