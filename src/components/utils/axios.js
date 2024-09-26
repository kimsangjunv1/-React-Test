import axios from 'axios';

const instance = axios.create({
    baseURL: '/api',  // 프록시 경로로 설정
    timeout: 180000,
    headers: {
      "Content-Type": "application/json",
    },
  });
  

export default instance;