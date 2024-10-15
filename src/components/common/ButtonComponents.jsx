import React from 'react'

const ButtonComponents = ({ title, func }) => {
    return (
        <button onClick={(e) => func(e)}>{title}</button>
    )
}

export default ButtonComponents