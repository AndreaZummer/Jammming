import React from 'react';
import rename from './resources/rename-svgrepo-com.svg';
import addPhoto from './resources/add-photo-svgrepo-com.svg';
import '../styles/dropdown.css';

function Dropdown (props) {

    return (
        <div className={`dropdown-${props.visible}`} onMouseOver={props.hover} onMouseLeave={props.leave}>
            <ul>
                <li onClick={props.nameChangeHandle}><img alt='rename' src={rename}/>Rename</li>
                <li><img alt='add' src={addPhoto}/>Add playlist cover</li>
            </ul>
        </div>
    )
}

export default Dropdown;