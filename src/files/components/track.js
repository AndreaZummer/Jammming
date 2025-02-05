import React, {useState, useEffect} from 'react';
import '../styles/track.css';
import addButton from './add-circle-svgrepo-com.svg';
import removeButton from './remove-circle-svgrepo-com.svg';

function Track(props) {

    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        setClicked(false)
    }, [])

    function handleRemove() {
        const removedTrack=props.track;
        props.removeClick(removedTrack);
        };

    function handleAdd() {
        const newSelectedTrack = props.track;
        props.selectionClick(newSelectedTrack);
        setClicked(true);
    };

    function addOrRemoveButton () {
        if (props.removeClick) {
            return (
                <img id='remove' onClick={handleRemove} alt='remove' src={removeButton}/>
            )}
        else {
            return (
                <img id='add' src={addButton} alt='add' onClick={handleAdd} className={`added-${clicked? 'yes' : 'no'}`}/>
            )
        }
    };

    function addArtists() {
        const artists = props.track.artists.filter(
            (artist,index) => {return index<3}
        );
        const artist = artists.map(artista => {return artista.name}
        );

        return artist.join(', ');
    };

    return (
        <div className='track'>
            <div className='trackInfo'>
                <h3>{props.track.name}</h3>
                <h4>{addArtists()}</h4>
                <h5>{props.track.album.name}</h5>
            </div>
            <img alt="album cover" src={props.track.album.images[2].url} />
            <div>
            {addOrRemoveButton()}
            </div>
        </div>
    )
};

export default Track;