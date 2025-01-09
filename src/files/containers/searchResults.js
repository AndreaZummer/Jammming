import React from 'react';
import Track from './track';
import AddToSpotifyButton from '../components/addToSpotifyButton';
// import {search} from './searchBar';

function SearchResults(props) {

    const searchResults = props.findedResults;

    return (
        <div>
             {/* <h2>Results for "{search}"</h2>  */}
             {searchResults.map((track) => {return (
                <Track track={track}/>
             )}) }
              <div>
                <input type="text"  placeholder="New Playlist" onChange />
                <AddToSpotifyButton />
            </div>
        </div>
    )
};

export default SearchResults;