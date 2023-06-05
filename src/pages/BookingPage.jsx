import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import LinkAddress from '../components/LinkAddress'
import Gallery from '../components/Gallery'
import BookingDate from '../components/BookingDate'

function BookingPage() {
    const { id } = useParams()
    const [booking, setBooking] = useState(null)
    useEffect(() => {
        if (id) {
            axios.get(`/bookings`).then((res) => {
                const foundBooking = res.data.find(({ _id }) => _id === id)
                if (foundBooking) setBooking(foundBooking)
            })
        }
    }, [])

    if (!booking) return 'Loading...'
    return (
        <div className="">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <LinkAddress
                place={booking.place.address}
                className="my-2"
            />
            <div className="bg-gray-200 px-4 py-2 rounded-2xl flex flex-col">
                <div className="text-2xl translate-y-6 -my-4">Your booking information</div>
                <BookingDate booking={booking} />
            </div>
            <Gallery place={booking.place} />
        </div>
    )
}

export default BookingPage
