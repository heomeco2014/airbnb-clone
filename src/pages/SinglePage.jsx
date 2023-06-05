import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IconShare3, IconHeart, IconGridDots, IconArrowLeft, IconMapSearch } from '@tabler/icons-react'
import BookingWidget from '../components/BookingWidget'
import Gallery from '../components/Gallery'
import LinkAddress from '../components/LinkAddress'

function SinglePage() {
    const { id } = useParams()
    const [place, setPlace] = useState({})
    function getPlace() {
        if (!id) return console.log('No id')
        axios
            .get('/place/' + id)
            .then((res) => setPlace(res.data))
            .catch((err) => console.log(err))
    }
    useEffect(() => {
        getPlace()
    }, [id])
    if (!place) return <div>Loading...</div>

    return (
        <>
            <div className=" mt-4 flex justify-between py-8">
                <div>
                    <h1 className="text-2xl">{place.title}</h1>
                    <LinkAddress place={place.address} />
                </div>
                <div className="flex translate-y-2 items-end justify-between gap-2">
                    <div className="flex flex-wrap rounded-xl p-2 transition-colors hover:bg-slate-200 ">
                        <IconShare3 />
                        <span className="ml-2 cursor-pointer font-[500] underline ">Share</span>
                    </div>
                    <div className="flex flex-wrap rounded-xl p-2 transition-colors hover:bg-slate-200 ">
                        <IconHeart />
                        <span className="ml-2 cursor-pointer font-[500] underline ">Save</span>
                    </div>
                </div>
            </div>
            <Gallery place={place} />

            <div className="grids-col-1 ml-4 grid grid-cols-[5fr_2fr] gap-8">
                <div>
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold">Description</h2>
                        <p className="">{place.description}</p>
                    </div>
                    Check-in: {place.checkIn}
                    <br />
                    Check-out: {place.checkOut}
                    <br />
                    Max number of guest: {place.maxGuests}
                </div>
                <BookingWidget place={place} />
            </div>
            <div className="mt-4 bg-gray-100 px-8 py-8">
                <h2 className="-ml-4 text-2xl font-semibold">Extra info</h2>
                <div className="-ml-4 flex flex-col">
                    <div className="">{place.extraInfor}</div>
                </div>
            </div>
        </>
    )
}

export default SinglePage
