import React, {useState} from 'react';
import SearchResults from './searchResults';
import PLaylist from '../components/playlist';
import AddToSpotifyButton from '../components/addToSpotifyButton';

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
       const [selected, setSelected] = useState([]);
            
        function handleSelectionClick(newSelectedTrack) {
            setSelected([...selected, newSelectedTrack])
        };

        function handleRemoveClick(removedTrack) {
            setSelected((selected) => {return selected.filter(track => track!==removedTrack)})
        };
    
    return (
        <>
            <SearchResults searchResults={tracklist} selectionClick={handleSelectionClick}/>
            <div>
                <PLaylist removeClick={handleRemoveClick} selected={selected}/>
                <AddToSpotifyButton />
            </div>
        </>
    )
};

export default GetDataFromAPI;