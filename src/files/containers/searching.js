import React, {useState} from 'react';
import Welcomebanner from '../components/welcomeBanner';
import SearchBar from './searchBar';
import SearchResults from './searchResults';

function Searching() {

    const [searching, setSearching] = useState(false);

    function handleSearching() {
        setSearching(true);
    }

    if (!searching) {
        return (
            <div>
                <Welcomebanner />
                <SearchBar />
            </div>
        );
    } else {
        return (
            <div>
                <SearchBar />
                <SearchResults />
            </div>
        )

    }
};

export default Searching;