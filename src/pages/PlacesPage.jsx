import { Link, Navigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AccountNav from '../components/AccountNav.jsx'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
function PlacesPage() {
    const [places, setPlaces] = useState([])
    const location = useLocation()
    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
            setPlaces(data)
        })
        console.log(location.pathname.split('/').pop())
    }, [])

    return (
        <>
            <AccountNav subpage={location.pathname.split('/').pop()} />
            <h2></h2>
            <div className="text-center">
                <Link
                    className="mx-auto inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-white"
                    to={'/account/places/new'}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                    Add new places
                </Link>
            </div>
            <div className="mt-4">
                {places.map((place, i) => {
                    return (
                        <Link
                            key={i}
                            to={'/account/places/' + place._id}
                            className="mb-4 flex h-full w-full cursor-pointer gap-4 rounded-2xl bg-gray-100 p-4"
                        >
                            <div className="h-[320px] w-[25%] shrink-0 grow-0 rounded-[inherit] bg-gray-300">
                                {place.photos.length > 0 && (
                                    <img
                                        className="h-full w-full rounded-[inherit] object-cover"
                                        src={'http://localhost:4000/uploads/' + place.photos[0]}
                                        alt=""
                                    />
                                )}
                            </div>

                            <div className="h-50">
                                <h2 className="text-xl font-semibold">{place.title}</h2>
                                <p className="mt-2 text-justify text-[1rem] ">{place.description}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}

export default PlacesPage
