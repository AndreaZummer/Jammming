import React from 'react';
import '../styles/track.css';

function Track(props) {

    function handleRemove() {
        const removedTrack=props.track;
        props.removeClick(removedTrack);
    };

    function handleAdd() {
        const newSelectedTrack = props.track;
        props.selectionClick(newSelectedTrack);
    };

    function addOrRemoveButton () {
        if (props.removeClick) {
            return (
                <button className='add' onClick={handleRemove}><span>-</span> Remove</button>
            )}
        else {
            return (
                <button className='add' onClick={handleAdd}><span>+</span> Add</button>
            )
        }
    };

    function addArtists() {
        const artists = props.track.artists.map(
            (artist,index) => {if (index<3) { return artist.name}}
        );

        return artists.join(', ');
    };

    return (
        <div className='track'>
            <h3>{props.track.name}</h3>
            <h4>{addArtists()}</h4>
            <h5>{props.track.album.name}</h5>
            {addOrRemoveButton()}
        </div>
    )
};

export default Track;