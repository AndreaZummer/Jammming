import './App.css';
import React,{useEffect, useState} from 'react';
import SearchBar from './files/containers/searchBar';
import WelcomeBanner from './files/components/welcomeBanner';
import { getProfile} from './files/utilities/utilities';

function App() {
  useEffect (()=> {
    getProfile();
  }, []);
  
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
