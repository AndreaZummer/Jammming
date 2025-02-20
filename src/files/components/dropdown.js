import React, {useState} from 'react';
import rename from './resources/rename-svgrepo-com.svg';
import addPhoto from './resources/add-photo-svgrepo-com.svg';
import '../styles/dropdown.css';

function Dropdown (props) {

    const [addingCover, setAddingCover] = useState(false);

    function addingCoverHover() {
        setAddingCover(true);
    }

    function addingCoverHover2() {
        setAddingCover(false);
    }

    async function autoSubmit(event) {
        const uploadImage = event.target.files[0];
        
        function toBase64(uploadImage) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base = reader.result;
                    props.displayPlaylistCover(base);
                    const base64 = base.replace(/^data:image\/(jpg|jpeg);base64,/, "");    
                    resolve(base64)
                };
                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(uploadImage)
            })
        };
        const base64 = await toBase64(uploadImage);
        if (uploadImage.size < 191000 & uploadImage.type === "image/jpeg") {
            localStorage.setItem('uploadImage', base64);
        } else {
            await props.coverDenied()
        }
    };

    return (
        <div className='menu'>
            <div className={`dropdown-${props.visible}`} onMouseOver={props.hover} onMouseLeave={props.leave}>
                <ul className='menu'>
                    <li onClick={props.nameChangeHandle}>
                        <img alt='rename' src={rename}/>Rename
                    </li>
                    <li onMouseOver={addingCoverHover} onMouseLeave={addingCoverHover2}>
                        <label htmlFor='fileUpload'>
                            <img alt='add' src={addPhoto}/>Add playlist cover</label>
                    </li>
                    <input 
                        type='file' 
                        onChange={autoSubmit} 
                        name='coverPicture' 
                        id='fileUpload' 
                        accept='image/jpeg'/>
                </ul>
            </div>
            <div id={`addingCoverMenu-${addingCover}`}>
                <ul>
                    <li>Required format: JPEG</li>
                    <li>Max-size: 191KB</li>
                </ul>
            </div>
        </div>
    )
}

export default Dropdown;