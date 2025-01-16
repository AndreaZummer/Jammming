import React from 'react';
import Track from './track';

function SearchResults(props) {
    return (
        <div className='searchResults'>
            {props.searchResults.map((track,index) => { return (
                <Track track={track} key={`track${index}`} selectionClick={props.selectionClick}/>
            )})}
        </div>
    )
};

export default SearchResults;