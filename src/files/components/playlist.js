import React from 'react';
import Track from './track';
import AddToSpotifyButton from './addToSpotifyButton';

function PLaylist(props) {
    return (
        <div>
            <input type="text" value={playlistName} placeholder="New Playlist" onChange />
            {/* len tie co su vybrane */}
            <Track selected={true} />
            <AddToSpotifyButton />
        </div>
    )
}