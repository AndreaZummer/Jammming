import './App.css';
import React,{useState} from 'react';
import SearchBar from './files/containers/searchBar';
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
   
  const [searching, setSearching] = useState(false);

  function handleSearching() {
    setSearching(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>JAMMMING</h1>
        <div>
          {!searching && <WelcomeBanner />}
          <SearchBar handleSearching={handleSearching} searching={searching}/>
        </div>
      </header>
    </div>
  );
}

export default App;
