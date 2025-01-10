import React,{useState} from 'react';
import Tracklist from '../containers/tracklist';

function PLaylist(props) {

    const [name, setName]=useState('');
    const [playlistName, setPlaylistName]=useState('');

    function namingPlaylist(event) {
        setName(event.target.value);
    };

    function handleSubmit(event) {
        event.preventDefault();
        setPlaylistName(name);
        setName('');
    };

    return (
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text"  placeholder="New Playlist" onChange={namingPlaylist} value={name}/>
                </form>
                <h2>{playlistName}</h2>
                <Tracklist tracklist={props.selected} removeClick={props.removeClick} />
            </div>
    )
};

export default PLaylist;