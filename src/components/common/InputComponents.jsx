import React from 'react'

const InputComponents = ({ type, placeholder, func }) => {
    return (
        <input type={type} placeholder={placeholder} onInput={(e) => {func(e)}} />
    )
}

export default InputComponents