import React from 'react';
import Tracklist from '../containers/tracklist';

function PLaylist(props) {
    console.log(props.selected);
    return (
            <div>
                <input type="text"  placeholder="New Playlist" onChange />
                <Tracklist tracklist={props.selected} removeClick={props.removeClick} />
            </div>
    )
};

export default PLaylist;