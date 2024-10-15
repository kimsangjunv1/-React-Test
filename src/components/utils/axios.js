import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_KOR_EXCHANGE_BASEURL,  // 프록시 경로로 설정
    timeout: 300000,  // 타임아웃 시간을 늘림
    headers: {
      "apikey": import.meta.env.VITE_APP_KOR_EXCHANGE_KEY
    },
  });

export default instance;