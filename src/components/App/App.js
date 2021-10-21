import { Component } from 'react';
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


class App extends Component {
  state = {
    page: 1,
    searchQuery: '',
    pictures: [],
    loading: false,
    showModal: false,
    largePicture: {},
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      this.fetchSearch()
        .catch(err => console.log(err))
        .finally(() => this.setState({ loading: false }));
      
    }
    
  }

  fetchSearch() {
    const { searchQuery, page } = this.state;
    this.setState({ loading: true });
    return getPictures(searchQuery, page).then(pictures => {
      this.setState(prev => ({
        pictures: [...prev.pictures, ...pictures],
        page: prev.page + 1,
      }));
    });
  }

  
  handleFormSubmit = searchQuery => {
    this.setState({
      page: 1, 
      searchQuery, 
      pictures: []
    });
  }
  
  
handleLoadMoreClick =()=>{
  this.setState({loading:true});
  this.fetchSearch()
  .then(()=>{
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  })
  .catch((err)=> console.log(err))
  .finally(() => this.setState({loading: false }));
}

handleModalClick= largePicture =>{
  this.setState({largePicture});
  this.toggleModal();
}

toggleModal = () => {
  this.setState(({showModal}) => ({
    showModal: !showModal,
  }))
}


  render() {
    const { loading, searchQuery, pictures, largePicture, showModal } = this.state;
      return (
        <Container>
          <ToastContainer/>
          <Searchbar onSubmit={this.handleFormSubmit}/>
          {loading && <PendingView/>}
          {pictures.length !== 0 ? (<ImageGallery pictures={pictures} onModalOpen={this.handleModalClick}/>)
          : (searchQuery !== '' && <ErrorView/>)}
          {loading && <PendingView/>}
          {pictures.length > 0 && <Button onClick={this.handleLoadMoreClick}/>}
          {showModal && (
            <Modal onClose={this.toggleModal}>
              {loading && <PendingView/>}
              <img 
              src={largePicture.largeImageURL}
              alt={largePicture.tags}
              />
            </Modal>)
  }
    </Container>
  )
  }
}

export default App;
