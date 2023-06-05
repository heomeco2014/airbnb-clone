import React from 'react'

function PlaceImg({ place, index = 0, className = null }) {
    if (!place.photos?.length) {
        return ''
    }
    if (!className) {
        className = ''
    }
    return (
        <img
            className={className}
            src={`http://localhost:4000/uploads/` + place.photos[index]}
        />
    )
}

export default PlaceImg
