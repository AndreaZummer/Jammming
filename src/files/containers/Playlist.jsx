import React, {useState, useEffect} from 'react';
import Track from '../components/Track';
import AddToSpotifyButton from '../components/AddToSpotifyButton';
import {addTracksToPlaylist} from '../utilities/utilities';
import moreOptionsIcon from './resources/more-horizontal-svgrepo-com.svg';
import note from './resources/note.jpg';
import Dropdown from '../components/Dropdown';
import '../styles/playlist.css';

function PLaylist(props) {
    
    const [uriList, setUriList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [nameChange, setNameChange] =useState(false);
    const [displayCover, setDisplayCover] = useState(null);

    useEffect(
        () => {if(props.selected) {
            setUriList(props.selected.map(track => track.uri))};
        }, [props.selected]
    );

    function dropdownHandling () {
        setVisible(true)
    };

    function dropdownHandling2 () {
        setVisible(false)
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
                    <input 
                        type="text" 
                        onChange={props.namingPlaylist} 
                        defaultValue={props.playlistName} 
                        autoFocus/>
                </form>
            )
        }
    };

    function displayPlaylistCover(uploadImage) {
        setDisplayCover(uploadImage);
    };

    function coverDenied() {
        setDisplayCover(null);
    };

    async function addToSpotify() {
        await addTracksToPlaylist(uriList,props.playlistName);
    };

    return (
        <div className='playlist'>
            <div className='playlistName'>
                {displayCover? 
                    <img 
                        className='coverImage'
                        src={displayCover} 
                        alt='cover'/> 
                    : 
                    <img 
                        className='coverImage' 
                        alt='new playlist' 
                        src={note} 
                        title='playlist cover image'/>}
                {rename()}
                <div className='settings'>
                    <img 
                        id='more' 
                        src={moreOptionsIcon} 
                        alt='more options' 
                        onMouseOver={dropdownHandling} 
                        onMouseLeave={dropdownHandling2}/>
                    <Dropdown 
                        visible={visible} 
                        hover={dropdownHandling} 
                        leave={dropdownHandling2} 
                        nameChangeHandle={nameChangeHandle} 
                        displayPlaylistCover={displayPlaylistCover} 
                        coverDenied={coverDenied}/>
                </div>
            </div>
            <div className='center'>
            <div className='tracklist' data-testid='tracklist'>
                    {props.selected && props.selected.map((track, index) => {return (
                        <Track  
                            track={track} 
                            key={`${index}${track.uri}`} 
                            removeClick={props.removeClick}/>
                    )})}
                </div>
            </div>
            <div className='addToSpotify'>
                <AddToSpotifyButton 
                    id='addToSpotify' 
                    onAdd={addToSpotify} 
                    refreshing={props.refreshing}/>
            </div>
        </div>
    )
};

export default PLaylist;
