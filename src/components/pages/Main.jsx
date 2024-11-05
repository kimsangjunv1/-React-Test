import { Fragment, useEffect, useState } from "react";
import { getCurrentExchange } from "../../api/api_korea_exchange";

import ButtonComponents from "../common/ButtonComponents";
import InputComponents from "../common/InputComponents";
import SelectComponents from "../common/SelectComponents";

const Main = () => {
    const [ list, setList ] = useState([]);
    const [ currencyList, setCurrencyList ] = useState([]);

    const [ targetImage, setTargetImage ] = useState("");
    const [ targetName, setTargetName ] = useState("");
    const [ targetAddress, setTargetAddress ] = useState("");
    const [ targetCurrency, setTargetCurrency ] = useState("");

    const [ targetPrice, setTargetPrice ] = useState(0);
    const [ targetBenefit, setTargetBenefit ] = useState(0);
    const [ targetSubPrice, setTargetSubPrice ] = useState(0);
    const [ targetDeliveryFee, setTargetDeliveryFee ] = useState(0);

    const [ examplePrice, setExamplePrice ] = useState(0);
    const [ exampleCurrency, setExampleCurrency ] = useState(0);


    // 함수 : 현재 입력된 값을 기준으로 삽입
    const setOnList = () => {
        if (checkStateValue()) {
            let data = [
                ...list,
                {
                    imgSrc: targetImage,
                    address: targetAddress,
                    price: targetPrice,
                    subPrice: targetSubPrice,
                    benefit: targetBenefit,
                    name: targetName,
                    deliveryFee: targetDeliveryFee,
                    currency: targetCurrency
                }
            ];

            setList(data);
            setLocalStorage("data_note", data);
            setStateCleanUp();

            alert("저장되었습니다.");
        } else {
            alert("값을 다시 확인해주세요.");
        }
    };

    // 함수 : 현재 state 값 정리
    const setStateCleanUp = () => {
        const inputElements = document.querySelectorAll(".actions input");
        inputElements.forEach(e => e.value = null);

        setTargetName("");
        setTargetImage("");
        setTargetAddress("");
        setTargetPrice(0);
        setTargetBenefit(0);
        setTargetSubPrice(0);
        setTargetDeliveryFee(0);
    };

    // 함수 : 환율정보 가져옴
    const getCurrentCurrency = async() => {
        let data = await getCurrentExchange();

        if (data) {
            let mapping = mappingCurrencyList(data);

            setSessionStorage("data_current_currency", mapping);
            setCurrencyList(mapping);
        } else {
            console.log("환율정보를 받아오지 못했습니다.")
        }
    }
    
    // 함수 : 원화를 구해줌
    const getCurrencyToKRW = (cost, type) => {
        const selectCurrency = currencyList.filter(e => e.cur_unit == type);
        
        if (selectCurrency.length) {
            const exchangeRate = setNumber(selectCurrency[0].deal_bas_r); // 환율 정보
            const standard = selectCurrency[0].cur_unit.includes("(100)");
            const final = Math.round((cost / (standard ? 100 : 1)) * exchangeRate);
            
            return final;
        }
    }
    
    // 함수 : 순수 숫자로 변환
    const setNumber = (target) => {
        return Number(target);
    }

    // 함수 : 입력한 금액을 기준으로 환율을 적용해 환산한 값을 반환
    const calcCurrency = (currency, amount = 1) => {
        return amount / currency;
    }

    // 함수 : state 값 채워졌는지 확인
    const checkStateValue = () => {
        if (!isVisible(targetName)) return false;
        if (!isVisible(targetImage)) return false;
        if (!isVisible(targetPrice)) return false;
        if (!isVisible(targetAddress)) return false;
        if (!isVisible(targetBenefit)) return false;
        if (!isVisible(targetSubPrice)) return false;
        if (!isVisible(targetCurrency)) return false;
        if (!isVisible(targetDeliveryFee)) return false;

        return true
    };

    // 함수 : 값이 존재하는지
    const isVisible = (target) => {
        return target ? true : false;
    };

    // 함수 : 천단위 콤마
    const setCommaOnPrice = (target) => {
        return target.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    };

    // 함수 : 로컬스토리지에 저장
    const setLocalStorage = (name, data) => {
        return localStorage.setItem(name, JSON.stringify(data));
    };

    const setSessionStorage = (name, data) => {
        return sessionStorage.setItem(name, JSON.stringify(data));
    };

    // 함수 : 로컬스토리지에서 가져오기
    const getLocalStorage = (target) => {
        return localStorage.getItem(target);
    };

    // 함수 : 세션스토리지에서 가져오기
    const getSessionStorage = (target) => {
        return sessionStorage.getItem(target);
    };

    // 함수 : 받은 데이터 가공
    const mappingCurrencyList = (data) => {
        const filter = data.rates;
        
        return [
            {
                "result": 1,
                "cur_unit": "JPY(100)",
                "deal_bas_r": calcCurrency(filter.JPY, 100),
                "cur_nm": "일본 엔"
            },
            {
                "result": 1,
                "cur_unit": "USD",
                "deal_bas_r": calcCurrency(filter.USD),
                "cur_nm": "미국 달러"
            },
            {
                "result": 1,
                "cur_unit": "AED",
                "deal_bas_r": calcCurrency(filter.AED),
                "cur_nm": "아랍에미리트 디르함"
            },
            {
                "result": 1,
                "cur_unit": "AUD",
                "deal_bas_r": calcCurrency(filter.AUD),
                "cur_nm": "호주 달러"
            },
            {
                "result": 1,
                "cur_unit": "CAD",
                "deal_bas_r": calcCurrency(filter.CAD),
                "cur_nm": "캐나다 달러"
            },
            {
                "result": 1,
                "cur_unit": "CHF",
                "deal_bas_r": calcCurrency(filter.CHF),
                "cur_nm": "스위스 프랑"
            },
            {
                "result": 1,
                "cur_unit": "CNH",
                "deal_bas_r": calcCurrency(filter.CNH),
                "cur_nm": "중국 위안"
            },
            {
                "result": 1,
                "cur_unit": "DKK",
                "deal_bas_r": calcCurrency(filter.DKK),
                "cur_nm": "덴마크 크로네"
            },
            {
                "result": 1,
                "cur_unit": "EUR",
                "deal_bas_r": calcCurrency(filter.EUR),
                "cur_nm": "유로"
            },
            {
                "result": 1,
                "cur_unit": "GBP",
                "deal_bas_r": calcCurrency(filter.GBP),
                "cur_nm": "영국 파운드"
            },
            {
                "result": 1,
                "cur_unit": "HKD",
                "deal_bas_r": calcCurrency(filter.HKD),
                "cur_nm": "홍콩 달러"
            },
            {
                "result": 1,
                "cur_unit": "KRW",
                "deal_bas_r": calcCurrency(filter.KRW),
                "cur_nm": "한국 원"
            },
            {
                "result": 1,
                "cur_unit": "NOK",
                "deal_bas_r": calcCurrency(filter.NOK),
                "cur_nm": "노르웨이 크로네"
            },
            {
                "result": 1,
                "cur_unit": "NZD",
                "deal_bas_r": calcCurrency(filter.NZD),
                "cur_nm": "뉴질랜드 달러"
            },
            {
                "result": 1,
                "cur_unit": "SEK",
                "deal_bas_r": calcCurrency(filter.SEK),
                "cur_nm": "스웨덴 크로나"
            },
            {
                "result": 1,
                "cur_unit": "SGD",
                "deal_bas_r": calcCurrency(filter.SGD),
                "cur_nm": "싱가포르 달러"
            },
            {
                "result": 1,
                "cur_unit": "THB",
                "deal_bas_r": calcCurrency(filter.THB),
                "cur_nm": "태국 바트"
            },
        ]
    }

    useEffect(() => {
        let data = JSON.parse(getLocalStorage("data_note"));
        let dataCurrency = getSessionStorage("data_current_currency");

        // 세션에 환율 정보가 없다면 경우 환율정보를 받아오고 있다면 환율리스트에 삽입
        if (!dataCurrency) {
            getCurrentCurrency();
        } else {
            setCurrencyList(JSON.parse(dataCurrency));
        };

        data && setList(data);
    }, []);

    return (
        <Fragment>
            {/* 헤더 */}
            <header></header>
            {/* 헤더 END */}

            {/* 메인 */}
            <main>          
                <div className="container-inner">
                    {/* 업데이트 일자 */}
                    <section className="update">
                        <p>UPADATED AT 2024.09.26 18:04:47</p>
                    </section>
                    {/* 업데이트 일자 END */}
                    
                    {/* 내용 */}
                    <section className="contents">
                        {/* 섹션 : 리스트 */}
                        <section className="list">
                            {/* 부제목 */}
                            <div className="item">
                                <p className="target">썸네일</p>
                                <p className="target">주소</p>
                                <p className="target">이름</p>
                                <p className="target">가격</p>
                                <p className="target">배송비</p>
                                <p className="target">배대지 가격</p>
                                <p className="target">마진</p>
                                <p className="target">총합</p>
                            </div>
                            {/* 부제목 END */}

                            {/* 항목 */}
                            {list.length ? list.map((e, i) =>
                                <div className="item" key={i}>
                                    <img className="target" src={e.imgSrc} alt={e.name} />
                                    <a className="target" href={e.address} target="_blank">바로가기</a>
                                    <p className="target">{e.name}</p>
                                    <p className="target">
                                        {e.price} {e.currency} <br/>
                                        {getCurrencyToKRW(e.price, e.currency)} 원
                                    </p>
                                    <p className="target">
                                        {e.deliveryFee} {e.currency} <br/>
                                        {getCurrencyToKRW(e.deliveryFee, e.currency)} 원
                                    </p>
                                    <p className="target">{setCommaOnPrice(e.subPrice)} 원</p>
                                    <p className="target">{setCommaOnPrice(e.benefit)} 원</p>
                                    <p className="target">{
                                        setCommaOnPrice(
                                            setNumber(e.benefit)
                                            + setNumber(e.subPrice)
                                            + setNumber(e.deliveryFee)
                                            + getCurrencyToKRW(e.price, e.currency)
                                        )} 원
                                    </p>
                                </div>
                            ) : (
                                <div className="item no-item">
                                    <p className="target">저장한 항목이 없습니다.</p>
                                </div>
                            )}
                            {/* 항목 END */}
                        </section>
                        {/* 섹션 : 리스트 END */}

                        {/* 섹션 : 입력 */}
                        <section className="actions">
                            {/* 각종 정보 입력 폼 */}
                            <div className="info">
                                <InputComponents type={"string"} placeholder={"이미지 주소"} func={(e) => setTargetImage(e.target.value)} />
                                <InputComponents type={"string"} placeholder={"주소"} func={(e) => {setTargetAddress(e.target.value)}} />
                                <InputComponents type={"string"} placeholder={"이름"} func={(e) => setTargetName(e.target.value)} />
                                <div className="divide">
                                    <InputComponents type={"number"} placeholder={"가격"} func={(e) => setTargetPrice(e.target.value)} />
                                    {currencyList && <SelectComponents data={currencyList} placeholder={"통화 선택"} id={"currency"} func={(e) => setTargetCurrency(e)} />}
                                </div>
                                <InputComponents type={"number"} placeholder={"배송비"} func={(e) => setTargetDeliveryFee(e.target.value)} />
                                <InputComponents type={"number"} placeholder={"배대지 가격"} func={(e) => setTargetSubPrice(e.target.value)} />
                                <InputComponents type={"number"} placeholder={"마진"} func={(e) => setTargetBenefit(e.target.value)} />
                            </div>
                            {/* 각종 정보 입력 폼 END */}

                            <ButtonComponents title={"확인"} func={(e) => setOnList()}/>

                            {/* 간단한 환율 계산 폼 */}
                            <div className="example">
                                <div className="divide">
                                    <InputComponents type={"number"} placeholder={"환율"} func={(e) => setExamplePrice(e.target.value)} />
                                    {currencyList && <SelectComponents data={currencyList} placeholder={"통화 선택"} id={"currency"} func={(e) => setExampleCurrency(e ? e : 0)} />}
                                </div>
                                {exampleCurrency ? (
                                    <Fragment>
                                        <p>{setCommaOnPrice(getCurrencyToKRW(examplePrice, exampleCurrency))} 원</p>
                                    </Fragment>
                                 ) : (
                                    <Fragment>
                                        <p>환율을 선택해주세요.</p>
                                    </Fragment>
                                 )}
                                 <p>환율 DB : 2024-11-05</p>
                            </div>
                            {/* 간단한 환율 계산 폼 END */}
                        </section>
                        {/* 섹션 : 입력 END */}
                    </section>
                    {/* 내용 END */}
                </div>
            </main>
            {/* 메인 END */}

            {/* 푸터 */}
            <footer></footer>
            {/* 푸터 END */}
        </Fragment>
    );
};

export default Main;
