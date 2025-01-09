import React,{useState} from 'react';

function Track(props) {

    const [selected, setSelected]= useState(false);

    function handleRemove() {
        /*doplnit odstranenie z PL*/
        setSelected(false);
    };

    function handleAdd() {
        /*doplnit pridanie na PL*/
        setSelected(true);
    };

    function addOrRemoveButton () {
        if (selected) {
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