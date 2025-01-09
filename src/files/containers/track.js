import React,{useState} from 'react';
import Playlist from '../components/playlist';

function Track(props) {

    const [ selected, setSelected] = useState([]);
        
    function handleSelectionClick() {
        setSelected((selectedTracks) => [...selectedTracks,props.track])
    };

    return (
        <div>
            <div>
                <h3>{props.track.title}</h3>
                <h4>{props.track.artist}</h4>
                <h5>{props.track.album}</h5>
                <button onClick={handleSelectionClick}><span>+</span>Add to Playlist</button>
            </div>
            <div>
                <Playlist selected={selected} />
            </div>
        </div>
    )
};

export default Track;