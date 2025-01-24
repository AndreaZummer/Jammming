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
                <button className='remove' onClick={handleRemove}><span id='remove'>-</span></button>
            )}
        else {
            return (
                <button className='add' onClick={handleAdd}><span>+</span> Add</button>
            )
        }
    };

    function addArtists() {
        const artists = props.track.artists.filter(
            (artist,index) => {return index<3}
        );
        const artist = artists.map(artista => {return artista.name}
        );

        return artist.join(', ');
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