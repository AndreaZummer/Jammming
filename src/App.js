import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import Searching from './files/containers/searching';
import SearchBar from './files/containers/searchBar';
import SearchResults from './files/containers/searchResults';
import PLaylist from './files/components/playlist';
import AddToSpotifyButton from './files/components/addToSpotifyButton';
import WelcomeBanner from './files/components/welcomeBanner';

function App() {
  /*const tracklist = [
    {title: 'Hello',
           artist: "Adele",
           album: "Hello from behind",
          uri: "3382sf5dg1vxf"
          }, 
          {title: "Killing",
              artist: "Cher",
              album: "Mastermind",
              uri: "151sf5dg1"
             }, 
             {title: "Easy",
              artist: "Easy-artist",
              album: "Easy-album",
              uri: "bdf2g31rd521"
             }, 
             {title: "Medium",
              artist: "Medium-artist",
              album: "Medium album",
              uri: "gfd82"
             } 
      ];*/
  let tracklist=[];
   
  const [selected, setSelected] = useState([]);
  const [searching, setSearching] = useState(false);

  function handleSearching() {
    setSearching(true);
  }
              
  function handleSelectionClick(newSelectedTrack) {
    setSelected([...selected, newSelectedTrack])
  };
  
  function handleRemoveClick(removedTrack) {
    setSelected((selected) => {return selected.filter(track => track!==removedTrack)})
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>JAMMMING</h1>
        {!searching? 
          (
            <div>
                <WelcomeBanner />
                <SearchBar />
            </div>
          ):
          (
          <div>
              <SearchBar />
              <SearchResults searchResults={tracklist} selectionClick={handleSelectionClick}/>
              <PLaylist removeClick={handleRemoveClick} selected={selected}/>
              <AddToSpotifyButton />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
