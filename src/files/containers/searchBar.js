import React,{useState} from 'react';
import SearchResults from '../components/searchResults';
import PLaylist from './playlist';
import { getSearchResults} from '../utilities/utilities';
import '../styles/searchBar.css';

function SearchBar(props) {

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [selected, setSelected] = useState([]);

    function refreshing() {
        setSearchResults(null);
        setSelected([]);
        props.handleReset();
    }
                  
    function handleSelectionClick(newSelectedTrack) {
        setSelected([...selected, newSelectedTrack])
    };
      
    function handleRemoveClick(removedTrack) {
        setSelected((selected) => {return selected.filter(track => track!==removedTrack)})
    };

    function handleChange(event) {
        setSearch(event.target.value);
    };

    async function handleSearchClick() {
        setSearchResults(await getSearchResults(search));
        setSearch('');
        props.handleSearching();
    };

    return (
        <div className='searchBar'>
            <div id='searchBarAfter'>
                <input type="text" placeholder='Song Title / Artist' value={search} onChange={handleChange}/>
                <button onClick={handleSearchClick}> Search </button>
            </div>
            {props.searching && (
            <div>
                <SearchResults searchResults={searchResults} selectionClick={handleSelectionClick}/>
                <PLaylist removeClick={handleRemoveClick} selected={selected} refreshing={refreshing}/>
            </div>
            )}
        </div>
    )    
};

export default SearchBar;