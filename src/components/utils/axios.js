import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_KOR_EXCHANGE_BASEURL
});

export default instance;