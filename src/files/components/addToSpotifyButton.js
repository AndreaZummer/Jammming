import React from "react";

function AddToSpotifyButton(props) {

    async function handleAddClick() {
        await props.onAdd();
        props.refreshing();
    }
    return <button onClick={handleAddClick}>Add Playlist To Spotify</button>
};

export default AddToSpotifyButton; 