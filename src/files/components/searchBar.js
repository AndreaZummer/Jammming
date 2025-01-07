import React from 'react';
import SearchButton from './searchButton';

function SearchBar(props) {
    return (
        <div>
            <input type="text" placeholder='Song Title / Artist' value={searchingText}/>
            <SearchButton />
        </div>
    )    
};

export default SearchBar;