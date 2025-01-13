import React from 'react';

function Track(props) {

    function handleRemove() {
        const removedTrack=props.track;
        props.removeClick(removedTrack);
        /*opravit*/
    };

    function handleAdd() {
        const newSelectedTrack = props.track;
        props.selectionClick(newSelectedTrack);
    };

    function addOrRemoveButton () {
        if (props.removeClick) {
            return (
                <button onClick={handleRemove}><span>-</span> Remove from Playlist</button>
            )}
        else {
            return (
                <button onClick={handleAdd}><span>+</span> Add to Playlist</button>
            )
        }
    };

    return (
        <div>
                <h3>{props.track.name}</h3>
                {props.track.artists.map((artist) => <h4>{artist.name}</h4>)}
                <h5>{props.track.album.name}</h5>
                {addOrRemoveButton()}
        </div>
    )
};

export default Track;