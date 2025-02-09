import React, {useRef} from 'react';
import rename from './resources/rename-svgrepo-com.svg';
import addPhoto from './resources/add-photo-svgrepo-com.svg';
import '../styles/dropdown.css';

function Dropdown (props) {

    const formRef = useRef(null);

    async function autoSubmit(event) {
        const uploadImage = event.target.files[0];

        function toBase64(uploadImage) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base = reader.result;
                    const base64 = base.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");    
                    resolve(base64)
                };
                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(uploadImage)
            })
        };
        const base64 = await toBase64(uploadImage);
        localStorage.setItem('uploadImage', base64);
        // console.log(localStorage.getItem('uploadImage'));
    }

    return (
        <div className={`dropdown-${props.visible}`} onMouseOver={props.hover} /*onMouseLeave={props.leave}*/>
            <ul>
                <li onClick={props.nameChangeHandle}><img alt='rename' src={rename}/>Rename</li>
                <li><label htmlFor='fileUpload'><img alt='add' src={addPhoto}/>Add playlist cover</label></li>
                <input type='file' onChange={autoSubmit} name='coverPicture' id='fileUpload' accept='image/jpeg' ref={formRef}/>
            </ul>
        </div>
    )
}

export default Dropdown;