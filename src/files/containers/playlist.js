import React,{useState, useEffect} from 'react';
import Tracklist from '../components/tracklist';
import AddToSpotifyButton from '../components/addToSpotifyButton';
import {addTracksToPlaylist} from '../utilities/utilities';
import moreOptionsIcon from './more-horizontal-svgrepo-com.svg';
import accept from './accept-check-good-mark-ok-tick-svgrepo-com.svg';
import denied from './stop-svgrepo-com.svg';
import Dropdown from '../components/dropdown';
import '../styles/playlist.css';

function PLaylist(props) {
    
    const [uriList, setUriList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [nameChange, setNameChange] =useState(false);
    const [playlistCoverAccepted, setPlaylistCoverAccepted] = useState(null);
    const [displayCover, setDisplayCover] = useState('');

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

    function displayPlaylistCover(uploadImage) {
        setDisplayCover(uploadImage);
    };

    function playlistCoverChecker (uploadImage) {
        if (uploadImage.size < 191000 & uploadImage.type === "image/jpeg") {
            setPlaylistCoverAccepted(true)
        } else {
            setPlaylistCoverAccepted(false)
        }
    };

    async function addToSpotify() {
        await addTracksToPlaylist(uriList,props.playlistName);
    };

    return (
        <div className='playlist'>
            <div className='playlistName'>
                {rename()}
                <div className={`playlistCover-${playlistCoverAccepted}`}>
                    {displayCover && <img title='cover image' alt='playlist cover' src={displayCover}/>}
                    
                    {playlistCoverAccepted? <img className='cover' title='playlist cover accepted' alt='accepted' src={accept}/> : <img className='cover' title='wrong format/size' alt='denied' src={denied}/>}
                </div>
                <div className='settings'>
                    <img id='more' src={moreOptionsIcon} alt='more option' onMouseOver={dropdownHandling} onMouseLeave={dropdownHandling2}/>
                    <Dropdown visible={visible} hover={dropdownHandling} leave={dropdownHandling2} nameChangeHandle={nameChangeHandle} displayPlaylistCover={displayPlaylistCover} playlistCoverChecker={playlistCoverChecker}/>
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
