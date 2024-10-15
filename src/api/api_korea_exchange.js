import axios from '../components/utils/axios';

export const getCurrentExchange = async () => {
    try {
        const params = {
            base: "KRW",
            symbols: "JPY,USD,AED,AUD,CAD,CHF,CNH,DKK,EUR,GBP,HKD,KRW,NOK,NZD,SEK,SGD,THB"
        };

        const res = await axios.get("2024-10-14", {params});

        return res.data;
    } catch (error) {
        console.log("error ", error)
    }
}
