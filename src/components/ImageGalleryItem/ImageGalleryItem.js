import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';


export default function ImageGalleryItem({picture, onModalOpen}) {
    return (
        <>
            <img 
            src={picture.webformatURL} 
            alt={picture.tags} 
            className={s.ImageGalleryItemImage}
            onClick={() => onModalOpen(picture)} />
        </>
    )
}

ImageGalleryItem.propTypes = {
    picture: PropTypes.object,
    onModalOpen: PropTypes.func,
}