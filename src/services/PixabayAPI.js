import axios from 'axios';

const MY_API_KEY = '23191493-c555b110853d44812f8f12711';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getPictures(query, page = 1) {
    const { data: { hits } } = await axios.get(`?q=${query}&page=${page}
    &per_page=12&image_type=photo&orientation=horizontal&key=${MY_API_KEY}`)
    
    return hits;
}