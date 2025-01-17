import React,{useState} from 'react';
import SearchResults from '../components/searchResults';
import PLaylist from './playlist';
import { getSearchResults} from '../utilities/utilities';
import '../styles/searchBar.css';

function SearchBar(props) {

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [selected, setSelected] = useState([]);
                  
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

    function refreshing() {
        setSearchResults(null);
        setSelected([]);
        props.handleReset();
    };

    return (
        <div className='searchBar'>
            <div className={props.searching? 'afterSearching' : 'beforeSearching'}>
                <input type="text" placeholder='Song Title / Artist' value={search} onChange={handleChange}/>
                <button onClick={handleSearchClick} disabled={search? false: true}> Search </button>
            </div>
            {props.searching && (
            <div className='columns'>
                <SearchResults searchResults={searchResults} selectionClick={handleSelectionClick}/>
                <PLaylist removeClick={handleRemoveClick} selected={selected} refreshing={refreshing}/>
            </div>
            )}
        </div>
    )    
};

export default SearchBar;