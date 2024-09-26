import axios from '../components/utils/axios';

export const getCurrentExchange = async () => {
    try {
        const res = await axios.get("", {
          params: {
            authkey: import.meta.env.VITE_APP_KOR_EXCHANGE_KEY,
            data: "AP01",
            searchdate: "20180102",
          }
        });

        return res.data;
    } catch (error) {
        console.log("error ", error)
    }


  }
