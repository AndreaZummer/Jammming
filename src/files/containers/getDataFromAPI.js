import React from 'react';
import SearchResults from './searchResults';

function GetDataFromAPI() {
    const tracklist = [
        {title: 'Hello',
         artist: "Adele",
         album: "Hello from behind"
        }, 
        {title: "Killing",
            artist: "Cher",
            album: "Mastermind"
           }, 
           {title: "Easy",
            artist: "Easy-artist",
            album: "Easy-album"
           }, 
           {title: "Medium",
            artist: "Medium-artist",
            album: "Medium album"
           } 
    ];

    return (
        <>
            <SearchResults findedResults={tracklist} />
        </>
    )
};

export default GetDataFromAPI;