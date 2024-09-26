import axios from '../components/utils/axios';

export const getCurrentExchange = async () => {
    const res = await axios.get("/", {
      params: {
        authkey: import.meta.env.VITE_APP_KOR_EXCHANGE_KEY,
        data: "AP01",
        searchdate: "20180102",
      }
    });

    console.log("res : ",res)

    return res.data;
  }
