import React,{useState,useEffect} from 'react';
import Tracklist from '../components/tracklist';
import AddToSpotifyButton from '../components/addToSpotifyButton';
import {addTracksToPlaylist} from '../utilities/utilities';

function PLaylist(props) {
    
    const [name, setName]=useState('');
    const [playlistName, setPlaylistName]=useState('New Playlist');
    const [disabled, setDisabled] = useState(false);
    const [uriList, setUriLits] = useState([]);

    useEffect(
        () => {
            setUriLits(props.selected.map(track => track.uri));
        }, [props.selected]
    );

    function namingPlaylist(event) {
        setName(event.target.value);
    };

    function handleSubmit(event) {
        event.preventDefault();
        setPlaylistName(name);
        setName('Already Named');
        setDisabled(true);
    };

    function handleChangingNameClick() {
      setName(playlistName);
      setPlaylistName('');
      setDisabled(false);  
    };

    async function addToSpotify() {
        await addTracksToPlaylist(uriList,playlistName);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="New Playlist" onChange={namingPlaylist} value={name} disabled={disabled}/>
            </form>
            <h2>{playlistName}</h2>
            {playlistName && 
                <button onClick={handleChangingNameClick}> Change Playlist Name</button>}
            <Tracklist tracklistSelected={props.selected} removeClick={props.removeClick} />
            <AddToSpotifyButton onAdd={addToSpotify}/>
        </div>
    )
};

export default PLaylist;
