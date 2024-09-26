import axios from '../components/utils/axios';

export const getCurrentExchange = async() => {
    const baseKEY = import.meta.env.VITE_APP_KOR_EXCHANGE_KEY;

    const res = await axios.get("", {
        params: {
            authkey: baseKEY,
            data: "AP01",
            searchdate: "20240909"
        }
    });

    const products = res.data;
    return products;
}
