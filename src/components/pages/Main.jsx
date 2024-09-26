import { Fragment, useEffect, useState } from "react";
import { getCurrentExchange } from "../../api/api_korea_exchange";

const Main = () => {
    const [ list, setList ] = useState([]);

    const [ targetImage, setTargetImage ] = useState("");
    const [ targetName, setTargetName ] = useState("");
    const [ targetAddress, setTargetAddress ] = useState("");

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

    const test = () => {
        let goood = getCurrentExchange();

        console.log("과연 : ", goood);
    }

    // 로컬스토리지에서 값이 있다면 가져온 후 list에 삽입
    useEffect(() => {
        let data = JSON.parse(getLocalStorage("data_note"));

        if (data) {
            setList(data);

            // test();
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
                    <section>
                        수정상태 : 2024.09.26 18:04:47
                    </section>
                    {/* 섹션 : 입력 */}
                    <section className="actions">
                        <div>
                            <ComponentsInput placeholder={"이미지 주소"} func={(e) => setTargetImage(e.target.value)} />
                            <ComponentsInput placeholder={"주소"} func={(e) => {setTargetAddress(e.target.value)}} />
                            <ComponentsInput placeholder={"이름"} func={(e) => setTargetName(e.target.value)} />
                            <ComponentsInput placeholder={"가격"} func={(e) => setTargetPrice(setCommaOnPrice(e.target.value))} />
                            <ComponentsInput placeholder={"배송비"} func={(e) => setTargetDeliveryFee(setCommaOnPrice(e.target.value))} />
                            <ComponentsInput placeholder={"배대지 가격"} func={(e) => setTargetSubPrice(setCommaOnPrice(e.target.value))} />
                            <ComponentsInput placeholder={"마진"} func={(e) => setTargetBenefit(setCommaOnPrice(e.target.value))} />
                        </div>
                        <ComponentsButton title={"확인"} func={(e) => setOnList()}/>
                    </section>
                    {/* 섹션 : 입력 END */}

                    {/* 섹션 : 리스트 */}
                    <section className="list">
                        <div className="item">
                            <p className="target">썸네일</p>
                            <p className="target">주소</p>
                            <p className="target">이름</p>
                            <p className="target">가격</p>
                            <p className="target">배송비</p>
                            <p className="target">배대지 가격</p>
                            <p className="target">마진</p>
                        </div>
                        {list.length ? list.map((e, i) =>
                            <div className="item" key={i}>
                                <img className="target" src={e.imgSrc} alt={e.name} />
                                <a className="target" href={e.address}>바로가기</a>
                                <p className="target">{e.name}</p>
                                <p className="target">{e.price}</p>
                                <p className="target">{e.deliveryFee}</p>
                                <p className="target">{e.subPrice}</p>
                                <p className="target">{e.benefit}</p>
                            </div>
                        ) : (
                            <div className="item no-item">
                                <p className="target">저장한 항목이 없습니다.</p>
                            </div>
                        )}
                    </section>
                    {/* 섹션 : 리스트 END */}
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
const ComponentsInput = ({ placeholder, func }) => {
    return (
        <input type="text" placeholder={placeholder} onInput={(e) => {func(e)}} />
    )
}

export default Main;
