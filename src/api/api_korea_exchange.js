import axios from '../components/utils/axios';

export const getCurrentExchange = async () => {
    // const today = new Date();

    // const year = today.getFullYear();
    // const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
    // const day = String(today.getDate()).padStart(2, '0');

    // const date = `${year}-${month}-${day}`;
    const today = new Date().toISOString().substring(0,10)

    console.log("어케 댐 : ",today); // 예시 출력: 2024-11-11

    try {
        const params = {
            base: "KRW",
            symbols: "JPY,USD,AED,AUD,CAD,CHF,CNH,DKK,EUR,GBP,HKD,KRW,NOK,NZD,SEK,SGD,THB"
        };

        const res = await axios.get(today, {params});

        return res.data;
    } catch (error) {
        console.log("error ", error)
    }
}
