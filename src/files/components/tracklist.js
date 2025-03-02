import React from 'react';
import Track from './track';

function Tracklist(props) {
    return (
        <div className='tracklist'>
            {props.tracklistSelected.map((track,index) => {return (
                <Track 
                    track={track} 
                    key={`${index}${track.uri}`} 
                    removeClick={props.removeClick}/>
            )
        })}
        </div>
    )
};

export default Tracklist;