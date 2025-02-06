import React,{useState} from 'react';
import SearchResults from '../components/searchResults';
import PLaylist from './playlist';
import { getSearchResults} from '../utilities/utilities';
import '../styles/searchBar.css';

function SearchBar(props) {

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selected, setSelected] = useState([]);
    
    function handleSelectionClick(newSelectedTrack) {
        if (!selected.includes(newSelectedTrack)) {
            setSelected([...selected, newSelectedTrack])
        }
    };
    
    function handleRemoveClick(removedTrack) {
        setSelected((selected) => {return selected.filter(track => track!==removedTrack)})
    };

    function handleChange(event) {
        setSearch(event.target.value);
    };

    async function handleSearchClick(e) {
        e.preventDefault();
        setSearchResults(await getSearchResults(search));
        setSearch('');
    };

    function refreshing() {
        setSearchResults([]);
        setSelected([]);
        props.handleReset();
    };

    return (
        <div className='searchBar'>
            <form onSubmit={handleSearchClick}>
                <input type="text" placeholder='Song Title / Artist' value={search} onChange={handleChange}/>
            </form>
            <button onClick={handleSearchClick} disabled={search? false: true}> Search </button>
            <div className='columns'>
                <SearchResults searchResults={searchResults} selectionClick={handleSelectionClick}/>
                <PLaylist removeClick={handleRemoveClick} selected={selected} refreshing={refreshing} playlistName={props.playlistName} changePlaylistName={props.changePlaylistName} handleSubmit={props.handleSubmit} namingPlaylist={props.namingPlaylist}/>
            </div>
        </div>
    )    
};

export default SearchBar;