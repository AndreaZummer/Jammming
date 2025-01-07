import React from 'react';
import Track from './track';

function SearchResults(props) {
    return (
        <div>
            <h2>Results for "{searchingText}"</h2>
            {props.map(song => {<Track song={song}/>})}
        </div>
    )
};

export default SearchResults;