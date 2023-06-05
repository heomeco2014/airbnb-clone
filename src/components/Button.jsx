import React from 'react'

function Button(props) {
    return (
        <button
            className={`btn !block bg-primary ${props.className}`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}

export default Button
