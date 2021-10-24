import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getPictures } from '../../services/PixabayAPI';
import Container from '../Container/Container';
import Searchbar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import ErrorView from '../ErrorView/ErrorView';
import PendingView from '../PendingView/PendingView';


function App() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largePicture, setLargePicture] = useState({});

  useEffect(() => {
    if (!searchQuery) return;
    setLoading(true);
    const fetchSearch = () => {
      getPictures(searchQuery, page)
        .then(pictures => {
          setPictures(prev => [...prev, ...pictures]
          );
          if (!page) {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          }
        })
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    }
    fetchSearch();
  }, [searchQuery, page]);

  
  const handleFormSubmit = searchQuery => {
    setPage(1);
    setSearchQuery(searchQuery);
    setPictures([]);
    setLoading(true);
  }
  
  
  const handleLoadMoreClick = fetchSearch => {
    setLoading(true);
    setPage(prev => prev + 1);
    setLoading(false);

}

const handleModalClick= largePicture =>{
  setLargePicture(largePicture);
  toggleModal();
}

const toggleModal = () => setShowModal(!showModal)

      return (
        <Container>
          <ToastContainer/>
          <Searchbar onSubmit={handleFormSubmit}/>
          {pictures.length !== 0 ? (<ImageGallery pictures={pictures} onModalOpen={handleModalClick}/>)
          : (searchQuery !== '' && <ErrorView/>)}
          {loading && <PendingView/>}
          {pictures.length > 0 && <Button onClick={handleLoadMoreClick} />}
          {showModal && (
            <Modal onClose={toggleModal}>
              {loading && <PendingView/>}
              <img 
              src={largePicture.largeImageURL}
                alt={largePicture.tags}
                width='800'
              />
            </Modal>)
  }
    </Container>
  )
  }

export default App;
