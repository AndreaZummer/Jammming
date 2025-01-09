import React from 'react';
import Track from './track';

function Tracklist(props) {

    return (
        <div>
            {props.tracklist.map((track) => { return (
                <Track track={track} key={track.title} selectionClick={props.selectionClick} removeClick={props.removeClick}/>
            )
        })}
        </div>
    )
};

export default Tracklist;