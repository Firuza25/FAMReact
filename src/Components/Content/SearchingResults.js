import React from 'react';
import './contnent.css'; 
import ContentCard from '../Card/ContentCard';

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
