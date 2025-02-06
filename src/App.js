import './App.css';
import React,{useEffect, useState} from 'react';
import SearchBar from './files/containers/searchBar';
import WelcomeBanner from './files/components/welcomeBanner';
import {getProfile, expirationChecker} from './files/utilities/utilities';
import musicalNote from './musical-note-quaver-svgrepo-com.svg';

function App() {
  useEffect (()=> {
    getProfile();
    setInterval(() => {
      expirationChecker()
    }, 400)
  }, []);
  
  const [reset, setReset] = useState(false);
  const [name, setName] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  
  useEffect(() => {
    setTimeout(() => {
      setReset(false)
    }, 5000);
  }, [reset]);

  function namingPlaylist(event) {
    setName(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    setPlaylistName(name);
    setName('');
  };

  function changePlaylistName(newName) {
    setPlaylistName(newName)
  };

  function handleReset() {
    setPlaylistName('');
    setReset(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={musicalNote} alt='musical note' />
        <h1>JAMMMING</h1>
        <img src={musicalNote} alt='musical note' />
      </header>
      <main>
        {reset && <h2 id='success'>Playlist successfully added to Spotify!</h2>}
        {!playlistName && (
          <div className='creating'>
            <WelcomeBanner />
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="+ New Playlist" onChange={namingPlaylist} value={name}/>
              <button>Create Playlist </button>
            </form>
          </div> )}
        {playlistName &&
          <SearchBar handleReset={handleReset} playlistName={playlistName} changePlaylistName={changePlaylistName} handleSubmit={handleSubmit} namingPlaylist={namingPlaylist}/>}
        </main>
    </div>
  )
};

export default App;
