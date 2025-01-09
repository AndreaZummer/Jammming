import React from 'react';
import Tracklist from './tracklist';
// import {search} from './searchBar';

function SearchResults(props) {
    return (
        <div>
            <Tracklist tracklist={props.searchResults} selectionClick={props.selectionClick}/>
        </div>
    )
};

export default SearchResults;