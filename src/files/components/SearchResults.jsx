import React from 'react';
import Track from './Track';

function SearchResults(props) {
    return (
        <div className='searchResults'>
            <h2>Search Results</h2>
            {props.searchResults? 
                props.searchResults.map((track,index) => { return (
                    <Track 
                        track={track} 
                        key={`track${index}`} 
                        selectionClick={props.selectionClick}/>
                )}) 
                : 
                <p style={{fontSize: '1.35rem', padding: '1rem 2rem', }}> No available results...</p>
            }
        </div>
    )
};

export default SearchResults;