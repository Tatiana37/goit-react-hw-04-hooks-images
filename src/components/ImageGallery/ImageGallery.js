import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
// import shortid from "shortid";

// const elId = shortid.generate();
export default function ImageGallery({pictures, onModalOpen}){
    return (
        <ul className={s.ImageGallery} >
        {pictures.map(picture=> (
            <ImageGalleryItem picture={picture} onModalOpen={onModalOpen}/>
        ))
        }
        </ul>
    )
}

ImageGallery.propTypes = {
    pictures: PropTypes.arrayOf(PropTypes.shape).isRequired,
    onModalOpen: PropTypes.func,
}
