import './App.css';
import React, {useEffect, useState} from 'react';
import SearchBar from './files/containers/searchBar';
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
    if (!name) {
      setPlaylistName('New Playlist')
    }
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
        {!playlistName && (
          <div className='creating'>
            <form onSubmit={handleSubmit}>
              <h2 className={`success-${reset}`}>Playlist successfully added to Spotify!</h2>
              <input type="text" placeholder="Enter Playlist name..." onChange={namingPlaylist} value={name}/>
              <button>Create Playlist</button>
            </form>
          </div> )}
        {playlistName &&
          <SearchBar handleReset={handleReset} playlistName={playlistName} changePlaylistName={changePlaylistName} handleSubmit={handleSubmit} namingPlaylist={namingPlaylist}/>}
        </main>
    </div>
  )
};

export default App;
