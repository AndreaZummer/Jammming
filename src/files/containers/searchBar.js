import React,{useState} from 'react';
import SearchButton from '../components/searchButton';

function SearchBar(props) {

    const [search, setSearch] = useState('');

    function handleChange(event) {
        setSearch(event.target.value)
    };

    return (
        <div>
            <input type="text" placeholder='Song Title / Artist' value={search} onChange={handleChange}/>
            <SearchButton />
        </div>
    )    
};
// export {search};
export default SearchBar;