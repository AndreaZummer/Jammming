import React from 'react';
import Track from './track';

function Tracklist(props) {
    return (
        <div>
            {props.tracklistSelected.map((track) => {return (
                <Track track={track} key={track.uri} removeClick={props.removeClick}/>
            )
        })}
        </div>
    )
};

export default Tracklist;