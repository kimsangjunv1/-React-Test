import { Fragment } from 'react'

const SelectComponents = ({ data, placeholder, id, func }) => {
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

export default SelectComponents