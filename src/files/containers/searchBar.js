import React,{useEffect, useState} from 'react';
import SearchButton from '../components/searchButton';
import SearchResults from './searchResults';
import AddToSpotifyButton from '../components/addToSpotifyButton';
import PLaylist from '../components/playlist';
import { getSearchResults} from '../utilities/utilities';

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

    useEffect(() => {
        console.log('Updated searchResults:', searchResults);
    }, [searchResults]);

    return (
        <div>
            <div>
                <input type="text" placeholder='Song Title' value={search} onChange={handleChange}/>
                <SearchButton onClick=/*{() => */{handleSearchClick/*; manageStatesOnClick();}*/}/>
            </div>
            {props.searching && (
            <div>
                <SearchResults searchResults={searchResults} selectionClick={handleSelectionClick}/>
                <PLaylist removeClick={handleRemoveClick} selected={selected}/>
                <AddToSpotifyButton />
            </div>
            )}
        </div>
    )    
};

export default SearchBar;