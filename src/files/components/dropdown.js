import React, {useRef} from 'react';
import rename from './resources/rename-svgrepo-com.svg';
import addPhoto from './resources/add-photo-svgrepo-com.svg';
import '../styles/dropdown.css';

function Dropdown (props) {

    const formRef = useRef(null);

    function autoSubmit() {
        console.log(formRef.current);
        formRef.current.submit();
    }

    return (
        <div className={`dropdown-${props.visible}`} onMouseOver={props.hover} /*onMouseLeave={props.leave}*/>
            <ul>
                <li onClick={props.nameChangeHandle}><img alt='rename' src={rename}/>Rename</li>
                <li><label htmlFor='fileupload'><img alt='add' src={addPhoto}/>Add playlist cover</label></li>
                <form method='POST' action='..\utilities\uploadedPicture.js' ref={formRef}>
                    <input type='file' onChange={autoSubmit} name='coverPicture' id='fileupload' accept='image/*'/>
                </form>
            </ul>
        </div>
    )
}

export default Dropdown;