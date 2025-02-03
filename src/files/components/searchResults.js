import React from 'react';
import Track from './track';

function SearchResults(props) {
    return (
        <div className='searchResults'>
            <h2>Search Results</h2>
            {props.searchResults.map((track,index) => { return (
                <Track track={track} key={`track${index}`} selectionClick={props.selectionClick}/>
            )})}
        </div>
    )
};

export default SearchResults;