import { Fragment, useEffect, useState } from "react";
import { getCurrentExchange } from "../../api/api_korea_exchange";

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
            setLocalStorage(data);
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

    // 함수 : state 값 채워졌는지 확인
    const checkStateValue = () => {
        if (!isVisible(targetName)) return false;
        if (!isVisible(targetImage)) return false;
        if (!isVisible(targetPrice)) return false;
        if (!isVisible(targetAddress)) return false;
        if (!isVisible(targetBenefit)) return false;
        if (!isVisible(targetSubPrice)) return false;
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
    const setLocalStorage = (target) => {
        return localStorage.setItem("data_note", JSON.stringify(target));
    };

    // 함수 : 로컬스토리지에서 가져오기
    const getLocalStorage = (target) => {
        return localStorage.getItem(target);
    };

    // 함수 : 환율정보 가져옴
    const getCurrentCurrency = async() => {
        let goood = [
            {
                "result": 1,
                "cur_unit": "AED",
                "ttb": "288.78",
                "tts": "294.61",
                "deal_bas_r": "291.7",
                "bkpr": "291",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "291",
                "kftc_deal_bas_r": "291.7",
                "cur_nm": "아랍에미리트 디르함"
            },
            {
                "result": 1,
                "cur_unit": "ATS",
                "ttb": "0",
                "tts": "0",
                "deal_bas_r": "93.52",
                "bkpr": "0",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "0",
                "kftc_deal_bas_r": "93.52",
                "cur_nm": "오스트리아 실링"
            },
            {
                "result": 1,
                "cur_unit": "AUD",
                "ttb": "827.91",
                "tts": "844.64",
                "deal_bas_r": "836.28",
                "bkpr": "836",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "836",
                "kftc_deal_bas_r": "836.28",
                "cur_nm": "호주 달러"
            },
            {
                "result": 1,
                "cur_unit": "BEF",
                "ttb": "0",
                "tts": "0",
                "deal_bas_r": "31.9",
                "bkpr": "0",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "0",
                "kftc_deal_bas_r": "31.9",
                "cur_nm": "벨기에 프랑"
            },
            {
                "result": 1,
                "cur_unit": "BHD",
                "ttb": "2,811.48",
                "tts": "2,868.27",
                "deal_bas_r": "2,839.88",
                "bkpr": "2,839",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "2,839",
                "kftc_deal_bas_r": "2,839.88",
                "cur_nm": "바레인 디나르"
            },
            {
                "result": 1,
                "cur_unit": "CAD",
                "ttb": "844.72",
                "tts": "861.79",
                "deal_bas_r": "853.26",
                "bkpr": "853",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "853",
                "kftc_deal_bas_r": "853.26",
                "cur_nm": "캐나다 달러"
            },
            {
                "result": 1,
                "cur_unit": "CHF",
                "ttb": "1,088.44",
                "tts": "1,110.43",
                "deal_bas_r": "1,099.44",
                "bkpr": "1,099",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "1,099",
                "kftc_deal_bas_r": "1,099.44",
                "cur_nm": "스위스 프랑"
            },
            {
                "result": 1,
                "cur_unit": "CNH",
                "ttb": "162.01",
                "tts": "165.28",
                "deal_bas_r": "163.65",
                "bkpr": "163",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "163",
                "kftc_deal_bas_r": "163.65",
                "cur_nm": "위안화"
            },
            {
                "result": 1,
                "cur_unit": "DEM",
                "ttb": "0",
                "tts": "0",
                "deal_bas_r": "657.98",
                "bkpr": "0",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "0",
                "kftc_deal_bas_r": "657.98",
                "cur_nm": "독일 마르크"
            },
            {
                "result": 1,
                "cur_unit": "DKK",
                "ttb": "171.14",
                "tts": "174.59",
                "deal_bas_r": "172.87",
                "bkpr": "172",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "172",
                "kftc_deal_bas_r": "172.87",
                "cur_nm": "덴마아크 크로네"
            },
            {
                "result": 1,
                "cur_unit": "ESP(100)",
                "ttb": "0",
                "tts": "0",
                "deal_bas_r": "773",
                "bkpr": "0",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "0",
                "kftc_deal_bas_r": "773",
                "cur_nm": "스페인 페세타"
            },
            {
                "result": 1,
                "cur_unit": "EUR",
                "ttb": "1,274.04",
                "tts": "1,299.77",
                "deal_bas_r": "1,286.91",
                "bkpr": "1,286",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "1,286",
                "kftc_deal_bas_r": "1,286.91",
                "cur_nm": "유로"
            },
            {
                "result": 1,
                "cur_unit": "FIM",
                "ttb": "0",
                "tts": "0",
                "deal_bas_r": "216.44",
                "bkpr": "0",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "0",
                "kftc_deal_bas_r": "216.44",
                "cur_nm": "핀란드 마르카"
            },
            {
                "result": 1,
                "cur_unit": "FRF",
                "ttb": "0",
                "tts": "0",
                "deal_bas_r": "196.18",
                "bkpr": "0",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "0",
                "kftc_deal_bas_r": "196.18",
                "cur_nm": "프랑스 프랑"
            },
            {
                "result": 1,
                "cur_unit": "GBP",
                "ttb": "1,432.82",
                "tts": "1,461.77",
                "deal_bas_r": "1,447.3",
                "bkpr": "1,447",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "1,447",
                "kftc_deal_bas_r": "1,447.3",
                "cur_nm": "영국 파운드"
            },
            {
                "result": 1,
                "cur_unit": "HKD",
                "ttb": "135.75",
                "tts": "138.5",
                "deal_bas_r": "137.13",
                "bkpr": "137",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "137",
                "kftc_deal_bas_r": "137.13",
                "cur_nm": "홍콩 달러"
            },
            {
                "result": 1,
                "cur_unit": "IDR(100)",
                "ttb": "7.82",
                "tts": "7.97",
                "deal_bas_r": "7.9",
                "bkpr": "7",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "7",
                "kftc_deal_bas_r": "7.9",
                "cur_nm": "인도네시아 루피아"
            },
            {
                "result": 1,
                "cur_unit": "ITL(100)",
                "ttb": "0",
                "tts": "0",
                "deal_bas_r": "66.46",
                "bkpr": "0",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "0",
                "kftc_deal_bas_r": "66.46",
                "cur_nm": "이태리 리라"
            },
            {
                "result": 1,
                "cur_unit": "JPY(100)",
                "ttb": "941.53",
                "tts": "960.56",
                "deal_bas_r": "951.05",
                "bkpr": "951",
                "yy_efee_r": "0.96833",
                "ten_dd_efee_r": "0.0242",
                "kftc_bkpr": "951",
                "kftc_deal_bas_r": "951.05",
                "cur_nm": "일본 옌"
            },
            {
                "result": 1,
                "cur_unit": "KRW",
                "ttb": "0",
                "tts": "0",
                "deal_bas_r": "1",
                "bkpr": "1",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "1",
                "kftc_deal_bas_r": "1",
                "cur_nm": "한국 원"
            },
            {
                "result": 1,
                "cur_unit": "KWD",
                "ttb": "3,509.87",
                "tts": "3,580.78",
                "deal_bas_r": "3,545.33",
                "bkpr": "3,545",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "3,545",
                "kftc_deal_bas_r": "3,545.33",
                "cur_nm": "쿠웨이트 디나르"
            },
            {
                "result": 1,
                "cur_unit": "MYR",
                "ttb": "262.09",
                "tts": "267.38",
                "deal_bas_r": "264.74",
                "bkpr": "264",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "264",
                "kftc_deal_bas_r": "264.74",
                "cur_nm": "말레이지아 링기트"
            },
            {
                "result": 1,
                "cur_unit": "NLG",
                "ttb": "0",
                "tts": "0",
                "deal_bas_r": "583.97",
                "bkpr": "0",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "0",
                "kftc_deal_bas_r": "583.97",
                "cur_nm": "네델란드 길더"
            },
            {
                "result": 1,
                "cur_unit": "NOK",
                "ttb": "129.44",
                "tts": "132.05",
                "deal_bas_r": "130.75",
                "bkpr": "130",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "130",
                "kftc_deal_bas_r": "130.75",
                "cur_nm": "노르웨이 크로네"
            },
            {
                "result": 1,
                "cur_unit": "NZD",
                "ttb": "752.76",
                "tts": "767.97",
                "deal_bas_r": "760.37",
                "bkpr": "760",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "760",
                "kftc_deal_bas_r": "760.37",
                "cur_nm": "뉴질랜드 달러"
            },
            {
                "result": 1,
                "cur_unit": "SAR",
                "ttb": "282.84",
                "tts": "288.55",
                "deal_bas_r": "285.7",
                "bkpr": "285",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "285",
                "kftc_deal_bas_r": "285.7",
                "cur_nm": "사우디 리얄"
            },
            {
                "result": 1,
                "cur_unit": "SEK",
                "ttb": "129.3",
                "tts": "131.91",
                "deal_bas_r": "130.61",
                "bkpr": "130",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "130",
                "kftc_deal_bas_r": "130.61",
                "cur_nm": "스웨덴 크로나"
            },
            {
                "result": 1,
                "cur_unit": "SGD",
                "ttb": "793.06",
                "tts": "809.09",
                "deal_bas_r": "801.08",
                "bkpr": "801",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "801",
                "kftc_deal_bas_r": "801.08",
                "cur_nm": "싱가포르 달러"
            },
            {
                "result": 1,
                "cur_unit": "THB",
                "ttb": "32.57",
                "tts": "33.22",
                "deal_bas_r": "32.9",
                "bkpr": "32",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "32",
                "kftc_deal_bas_r": "32.9",
                "cur_nm": "태국 바트"
            },
            {
                "result": 1,
                "cur_unit": "USD",
                "ttb": "1,056.23",
                "tts": "1,077.56",
                "deal_bas_r": "1,066.9",
                "bkpr": "1,066",
                "yy_efee_r": "2.69465",
                "ten_dd_efee_r": "0.07485",
                "kftc_bkpr": "1,071",
                "kftc_deal_bas_r": "1,071.4",
                "cur_nm": "미국 달러"
            },
            {
                "result": 1,
                "cur_unit": "XOF",
                "ttb": "0",
                "tts": "0",
                "deal_bas_r": "1.9618",
                "bkpr": "0",
                "yy_efee_r": "0",
                "ten_dd_efee_r": "0",
                "kftc_bkpr": "0",
                "kftc_deal_bas_r": "1.9618",
                "cur_nm": "씨에프에이 프랑(비씨에이오)"
            }
        ]
        // let goood = await getCurrentExchange();

        setCurrencyList(goood);
    }

    // 함수 : 순수 숫자로 변환
    const setNumber = (target) => {
        return Number(target.replace(",",""))
    }

    // 함수 : 원화를 구해줌
    const getCurrencyToKRW = (target, type) => {
        const selectCurrency = currencyList.filter(e => e.cur_unit == type);
        
        if (selectCurrency.length) {
            const cost = setNumber(target);
            const exchangeRate = setNumber(selectCurrency[0].deal_bas_r); // 환율 정보
            
            return cost * exchangeRate;
            // return setCommaOnPrice(cost * exchangeRate);
        }
    }

    useEffect(() => {
        console.log("현재 세팅 재화 : ", targetCurrency);
    }, [targetCurrency])

    // 로컬스토리지에서 값이 있다면 가져온 후 list에 삽입
    useEffect(() => {
        getCurrentCurrency();
        
        let data = JSON.parse(getLocalStorage("data_note"));

        if (data) {
            setList(data);
        }
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
                                    <a className="target" href={e.address}>바로가기</a>
                                    <p className="target">{e.name}</p>
                                    <p className="target">
                                        {e.price} {e.currency} <br/>
                                        {getCurrencyToKRW(e.price, e.currency)} 원
                                    </p>
                                    <p className="target">{e.deliveryFee} 원</p>
                                    <p className="target">{e.subPrice} 원</p>
                                    <p className="target">{e.benefit} 원</p>
                                    <p className="target">
                                        {
                                            setNumber(e.benefit)
                                            + setNumber(e.subPrice)
                                            + setNumber(e.deliveryFee)
                                            + getCurrencyToKRW(e.price, e.currency)
                                        }
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
                            <div>
                                <ComponentsInput type={"string"} placeholder={"이미지 주소"} func={(e) => setTargetImage(e.target.value)} />
                                <ComponentsInput type={"string"} placeholder={"주소"} func={(e) => {setTargetAddress(e.target.value)}} />
                                <ComponentsInput type={"string"} placeholder={"이름"} func={(e) => setTargetName(e.target.value)} />
                                <div className="divide">
                                    <ComponentsInput type={"number"} placeholder={"가격"} func={(e) => setTargetPrice(setCommaOnPrice(e.target.value))} />
                                    <ComponentsSelect data={currencyList} placeholder={"통화 선택"} id={"currency"} func={(e) => setTargetCurrency(e)} />
                                </div>
                                <ComponentsInput type={"number"} placeholder={"배송비"} func={(e) => setTargetDeliveryFee(setCommaOnPrice(e.target.value))} />
                                <ComponentsInput type={"number"} placeholder={"배대지 가격"} func={(e) => setTargetSubPrice(setCommaOnPrice(e.target.value))} />
                                <ComponentsInput type={"number"} placeholder={"마진"} func={(e) => setTargetBenefit(setCommaOnPrice(e.target.value))} />
                            </div>

                            <ComponentsButton title={"확인"} func={(e) => setOnList()}/>
                        </section>
                        {/* 섹션 : 입력 END */}
                    </section>
                </div>
            </main>
            {/* 메인 END */}

            {/* 푸터 */}
            <footer></footer>
            {/* 푸터 END */}
        </Fragment>
    );
};

// 공통 컴포넌트 : 버튼
const ComponentsButton = ({ title, func }) => {
    return (
        <button onClick={(e) => func(e)}>{title}</button>
    )
}

// 공통 컴포넌트 : 인풋
const ComponentsInput = ({ type, placeholder, func }) => {
    return (
        <input type={type} placeholder={placeholder} onInput={(e) => {func(e)}} />
    )
}

const ComponentsSelect = ({ data, placeholder, id, func }) => {
    return (
        <Fragment>
            {/* <label for="currency">통화 선택:</label> */}
            <select id="currency" onChange={(e) => func(e.target.value)}>
                <option selected value="">통화 선택</option>

                {data.map((e, i) => 
                    <option value={e.cur_unit} key={i}>{e.cur_nm}({e.cur_unit})</option>
                )}
            </select>
        </Fragment>
    )
}

export default Main;
