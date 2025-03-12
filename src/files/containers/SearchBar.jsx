import React, {useState, useEffect} from 'react';
import Track from '../components/Track';
import PLaylist from './Playlist';
import {getSearchResults} from '../utilities/utilities';
import '../styles/searchBar.css';

function SearchBar(props) {

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selected, setSelected] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [visibleSuggestions, setVisibleSuggestions] = useState(false);
    const [suggestionIndex, setSuggestionIndex] = useState(-1);  
    
    useEffect(() => {
        async function getSuggestions() {
            setSuggestions(await getSearchResults(search))
            setVisibleSuggestions(true);
        }

        if(search.length >= 3) {
            getSuggestions();
        }
        return () => setSuggestions([])
    }, [search]);
    
    function filterSuggestions() {
        let suggList = [];
        for (let suggestion of suggestions) {
            let lowerSuggestion = suggestion.name.toLowerCase();
            if(lowerSuggestion.includes(search)) {
                if(!suggList.includes(lowerSuggestion)) {
                    suggList.push(lowerSuggestion);
                }
            } else {
                for (let artist of suggestion.artists) {
                    let lowerSuggestionArtist = artist.name.toLowerCase();
                    if(lowerSuggestionArtist.includes(search)) {
                        if(!suggList.includes(artist.name)) {
                            suggList.push(artist.name);
                        }
                    }
                }
            }
        }
        return suggList
    };

    function handleSelectionClick(newSelectedTrack) {
        setSelected([...selected, newSelectedTrack])
    };
    
    function handleRemoveClick(removedTrack) {
        const removeIndex = selected.lastIndexOf(removedTrack);
        setSelected((selected)=> {
            return selected.filter((track,index) => index!==removeIndex)} 
        )
    };

    function handleChange(event) {
        setSearch(event.target.value.toLowerCase());
    };

    async function handleSearchClick(e) {
        e.preventDefault();
        setSearchResults(await getSearchResults(search));
        setSearch('');
        setVisibleSuggestions(false);
    };

    function refreshing() {
        setSearchResults([]);
        setSelected([]);
        props.handleReset();
    };

    async function suggestionClickHandle(event) {
        if(suggestionIndex === -1) {
            let suggestionSearch = event.target.value;
            setSearchResults(await getSearchResults(suggestionSearch));
        } else {
            let suggestionSearch = filterSuggestions()[suggestionIndex];
            setSearchResults(await getSearchResults(suggestionSearch));
        }
        setVisibleSuggestions(false);
        setSuggestionIndex(-1);
        setSearch('');
    }

    async function searchingHandle(event) {
        if (event.key === 'ArrowDown') {
            if(suggestionIndex < filterSuggestions().length & suggestionIndex < 9) {
                setSuggestionIndex(prevIndex => prevIndex+1)
            }
        } else if (event.key === 'ArrowUp') {
            if(suggestionIndex !== -1) {
                setSuggestionIndex(prevIndex => prevIndex-1)
            }
        } else if (event.key === 'Enter' & event.target.value === search) {
            handleSearchClick()
        }
    }

    return (
        <div className='searchBar'>
            <form>
                <input 
                    type="text" 
                    placeholder='Song Title / Artist' 
                    value={search} 
                    onChange={handleChange}
                    onKeyDown={searchingHandle}/>
                <p className={`suggestions-${visibleSuggestions}`}>{filterSuggestions().map((suggestion, index) => {return index < 10 && <input type='submit' value={suggestion} className={suggestionIndex===index? 'selectedSuggestion' : 'nonselectedSuggestion'} onKeyDown={searchingHandle} onClick={suggestionClickHandle} key={suggestion +`${index}`} />})} 
                </p>
            </form>    
            <button onClick={handleSearchClick} disabled={search? false: true}> Search </button>
            <div className='columns'>
                <div className='searchResults'>
                    <h2>Search Results</h2>
                    {searchResults.map((track,index) => { return (
                        <Track 
                            track={track} 
                            key={`track${index}`} 
                            selectionClick={handleSelectionClick}/>
                    )})}
                </div>
                <PLaylist 
                    removeClick={handleRemoveClick} 
                    selected={selected} 
                    refreshing={refreshing} 
                    playlistName={props.playlistName} 
                    changePlaylistName={props.changePlaylistName} 
                    handleSubmit={props.handleSubmit} 
                    namingPlaylist={props.namingPlaylist}/>
            </div>
        </div>
    )    
};

export default SearchBar;