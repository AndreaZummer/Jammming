import React,{useState,useEffect} from 'react';
import Tracklist from '../containers/tracklist';

function PLaylist(props) {
    
    const [name, setName]=useState('');
    const [playlistName, setPlaylistName]=useState('');
    const [disabled, setDisabled] = useState(false);

    useEffect(
        () => {
            const uriList = props.selected.map(track => track.uri);
        }, [props.selected]
    );


    function namingPlaylist(event) {
        setName(event.target.value);
    };

    function handleSubmit(event) {
        event.preventDefault();
        setPlaylistName(name);
        setName('Already Named');
        setDisabled(true);
    };

    function handleChangingNameClick(event) {
      setName(playlistName);
      setPlaylistName('');
      setDisabled(false);  
    };

    return (
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text"  placeholder="New Playlist" onChange={namingPlaylist} value={name} disabled={disabled}/>
                </form>
                <h2>{playlistName}</h2>
                {playlistName && 
                    <button onClick={handleChangingNameClick}> Change Playlist Name</button>}
                <Tracklist tracklistSelected={props.selected} removeClick={props.removeClick} />
            </div>
    )
};

export default PLaylist;
// export {uriList};