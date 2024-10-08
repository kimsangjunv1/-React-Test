import { Fragment, useEffect, useState } from "react";
import { getCurrentExchange } from "../../api/api_korea_exchange";
import { currentCurrencyList } from "../utils/current_currency_list";

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

    // 함수 : 환율정보 가져옴
    const getCurrentCurrency = async() => {
        let data = await getCurrentExchange();

        // 임시 : 20240922 데이터 삽입
        if (data == undefined) {
            console.log("undefined 네요", data);
            data = currentCurrencyList
        }

        setSessionStorage("data_current_currency", data);
        setCurrencyList(data);
    }

    // 함수 : 순수 숫자로 변환
    const setNumber = (target) => {
        return Number(target.replace(",",""))
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

    // 로컬스토리지에서 값이 있다면 가져온 후 list에 삽입
    useEffect(() => {
        let data = JSON.parse(getLocalStorage("data_note"));
        let dataCurrency = getSessionStorage("data_current_currency");

        if (!dataCurrency) {
            console.log("없네용",dataCurrency)
            getCurrentCurrency();
        } else {
            console.log("있네용")
            setCurrencyList(JSON.parse(dataCurrency));
        }

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
                            <div>
                                <ComponentsInput type={"string"} placeholder={"이미지 주소"} func={(e) => setTargetImage(e.target.value)} />
                                <ComponentsInput type={"string"} placeholder={"주소"} func={(e) => {setTargetAddress(e.target.value)}} />
                                <ComponentsInput type={"string"} placeholder={"이름"} func={(e) => setTargetName(e.target.value)} />
                                <div className="divide">
                                    <ComponentsInput type={"number"} placeholder={"가격"} func={(e) => setTargetPrice(e.target.value)} />
                                    {currencyList && <ComponentsSelect data={currencyList} placeholder={"통화 선택"} id={"currency"} func={(e) => setTargetCurrency(e)} />}
                                </div>
                                <ComponentsInput type={"number"} placeholder={"배송비"} func={(e) => setTargetDeliveryFee(e.target.value)} />
                                <ComponentsInput type={"number"} placeholder={"배대지 가격"} func={(e) => setTargetSubPrice(e.target.value)} />
                                <ComponentsInput type={"number"} placeholder={"마진"} func={(e) => setTargetBenefit(e.target.value)} />
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
                <option defaultValue="" value="">통화 선택</option>

                {data.map((e, i) => 
                    <option value={e.cur_unit} key={i}>{e.cur_nm}({e.cur_unit})</option>
                )}
            </select>
        </Fragment>
    )
}

export default Main;
