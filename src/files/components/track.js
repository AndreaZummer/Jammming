import React from 'react';

function Track(props) {
    return (
        <div>
            <h3>{props.title}</h3>
            <h4>{props.artist}</h4>
            <h5>{props.album}</h5>
            <button onChange ><span>+</span>Add to Playlist</button>
        </div>
    )
};

export default Track;