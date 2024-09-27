import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_KOR_EXCHANGE_BASEURL,  // 프록시 경로로 설정
    timeout: 180000,
    headers: {
      "Content-Type": "application/json",
    },
  });

export default instance;