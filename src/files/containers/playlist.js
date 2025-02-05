import React,{useState,useEffect} from 'react';
import Tracklist from '../components/tracklist';
import AddToSpotifyButton from '../components/addToSpotifyButton';
import {addTracksToPlaylist} from '../utilities/utilities';
import moreOptionsIcon from './more-horizontal-svgrepo-com.svg';
import Dropdown from '../components/dropdown';
import '../styles/playlist.css';

function PLaylist(props) {
    
    const [uriList, setUriLits] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(
        () => {
            setUriLits(props.selected.map(track => track.uri));
        }, [props.selected]
    );

    function dropdownHandling () {
        setVisible(true);
    };

    function dropdownHandling2() {
        setVisible(false);
    }

    async function addToSpotify() {
        await addTracksToPlaylist(uriList,props.playlistName);
    };

    return (
        <div className='playlist'>
            <div className='playlistName'>
                <h2>{props.playlistName}</h2>
                <img src={moreOptionsIcon} alt='more option' onMouseOver={dropdownHandling} onMouseLeave={dropdownHandling2}/>
                <Dropdown visible={visible} hover={dropdownHandling} leave={dropdownHandling2}/>
            </div>
            <div className='center'>
                <Tracklist tracklistSelected={props.selected} removeClick={props.removeClick} />
            </div>
            <div className='addToSpotify'>
                <AddToSpotifyButton id='addToSpotify' onAdd={addToSpotify} refreshing={props.refreshing}/>
            </div>
        </div>
    )
};

export default PLaylist;
