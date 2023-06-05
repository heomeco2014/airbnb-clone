import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function IndexPage() {
    const [places, setPlaces] = useState([])
    useEffect(() => {
        axios
            .get('/places')
            .then((res) => setPlaces(res.data))
            .catch((err) => console.log(err))
    }, [])
    return (
        <>
            <div className="mt-8 grid grid-cols-2 gap-4 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {places.map((place, i) => {
                    return (
                        <Link
                            to={'/place/' + place._id}
                            className=""
                            key={i}
                        >
                            <div>
                                <img
                                    src={'http://localhost:4000/uploads/' + place.photos[0]}
                                    alt=""
                                    className=" aspect-square rounded-2xl object-cover"
                                />
                            </div>
                            <h2 className="font-bold">{place.address}</h2>
                            <h3 className="text-sm text-gray-500">{place.title}</h3>
                            <div className="mt-2 font-[450] ">
                                <span className="font-bold">${place.price}</span> /<span className="italic"> 1 night</span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}

export default IndexPage
