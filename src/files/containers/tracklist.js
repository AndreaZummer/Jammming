import React from 'react';
import Track from './track';

function Tracklist(props) {
    return (
        <div>
            {props.tracklistSelected.map((track,index) => { return (
                <Track track={track} key={index} removeClick={props.removeClick}/>
            )
        })}
        </div>
    )
};

export default Tracklist;