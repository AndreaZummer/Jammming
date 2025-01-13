import React from 'react';
import Track from './track';

function SearchResults(props) {
    return (
        <div>
            {props.searchResults.map((track,index) => { return (
                <Track track={track} key={index} selectionClick={props.selectionClick}/>
            )})}
        </div>
    )
};

export default SearchResults;