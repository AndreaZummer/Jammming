import React,{useState, useEffect} from 'react';
import Tracklist from '../components/tracklist';
import AddToSpotifyButton from '../components/addToSpotifyButton';
import {addTracksToPlaylist} from '../utilities/utilities';
import moreOptionsIcon from './more-horizontal-svgrepo-com.svg';
import Dropdown from '../components/dropdown';
import '../styles/playlist.css';

function PLaylist(props) {
    
    const [uriList, setUriList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [nameChange, setNameChange] =useState(false);

    useEffect(
        () => {
            setUriList(props.selected.map(track => track.uri));
        }, [props.selected]
    );

    function dropdownHandling () {
        setVisible(true);
    };

    function dropdownHandling2() {
        setVisible(false);
    };

    function nameChangeHandle() {
        setNameChange(true);
    };

    function renamePlaylist(event) {
        event.preventDefault();
        props.handleSubmit(event);
        // props.changePlaylistName();
        setNameChange(false);
    }

    function rename() {
        if (!nameChange) {
            return <h2>{props.playlistName}</h2>
        } else {
            return (
                <form onSubmit={renamePlaylist}>
                    <input type="text" onChange={props.namingPlaylist} defaultValue={props.playlistName} autoFocus/>
                </form>
            )
        }
    };

    async function addToSpotify() {
        await addTracksToPlaylist(uriList,props.playlistName);
    };

    return (
        <div className='playlist'>
            <div className='playlistName'>
                {rename()}
                <div className='settings'>
                    <img src={moreOptionsIcon} alt='more option' onMouseOver={dropdownHandling} onMouseLeave={dropdownHandling2}/>
                    <Dropdown visible={visible} hover={dropdownHandling} leave={dropdownHandling2} nameChangeHandle={nameChangeHandle}/>
                </div>
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
