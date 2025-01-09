import React from 'react';

function PLaylist(props) {

    const playlistSongs = props.selected;

    return (
        <div>
            {playlistSongs.map(track => {return (
                <div style={{color: "green"}}>
                    <h3>{track.title}</h3>
                    <h4>{track.artist}</h4>
                    <h5>{track.album}</h5>
                </div>
            )})}
        </div>
    )
};

export default PLaylist;