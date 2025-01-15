import './App.css';
import React,{useEffect, useState} from 'react';
import SearchBar from './files/containers/searchBar';
import WelcomeBanner from './files/components/welcomeBanner';
import {getProfile} from './files/utilities/utilities';

function App() {
  useEffect (()=> {
    getProfile();
  }, []);
  
  const [searching, setSearching] = useState(false);
  const [reset, setReset] = useState(false);
  function handleSearching() {
    setSearching(true);
  };
  function handleReset() {
    setSearching(false);
    setReset(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>JAMMMING</h1>
      </header>
      <main>
        <div className='searching'>
          {!searching && <WelcomeBanner />}
          <SearchBar handleSearching={handleSearching} searching={searching} handleReset={handleReset}/>
        </div>
          {reset && <h2>Playlist successfully added to Spotify!</h2>}
        </main>
    </div>
  );
}

export default App;
