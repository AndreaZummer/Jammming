import React,{useState,useEffect} from 'react';
import Tracklist from '../components/tracklist';
import AddToSpotifyButton from '../components/addToSpotifyButton';
import {addTracksToPlaylist} from '../utilities/utilities';
import moreOptionsIcon from './more-horizontal-svgrepo-com.svg';
import '../styles/playlist.css';

function PLaylist(props) {
    
    const [uriList, setUriLits] = useState([]);

    useEffect(
        () => {
            setUriLits(props.selected.map(track => track.uri));
        }, [props.selected]
    );

    function handleChangingNameClick(newName) {
        props.changePlaylistName(newName)
    };

    async function addToSpotify() {
        await addTracksToPlaylist(uriList,props.playlistName);
    };

    return (
        <div className='playlist'>
            <div className='playlistName'>
                <h2>{props.playlistName}</h2>
                <img src={moreOptionsIcon} alt='more option'/>
            </div>
            <div className='tracklist'>
                <Tracklist tracklistSelected={props.selected} removeClick={props.removeClick} />
            </div>
            <div className='addToSpotify'>
                <AddToSpotifyButton id='addToSpotify' onAdd={addToSpotify} refreshing={props.refreshing}/>
            </div>
        </div>
    )
};

export default PLaylist;
