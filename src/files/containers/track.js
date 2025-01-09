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
                <h3>{props.track.title}</h3>
                <h4>{props.track.artist}</h4>
                <h5>{props.track.album}</h5>
                {addOrRemoveButton()}
        </div>
    )
};

export default Track;