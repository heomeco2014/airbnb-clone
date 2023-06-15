import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, redirect, useParams } from 'react-router-dom'
import LinkAddress from '../components/LinkAddress'
import Gallery from '../components/Gallery'
import BookingDate from '../components/BookingDate'
import { IconTrash } from '@tabler/icons-react'
import { Navigate } from 'react-router-dom'
function BookingPage() {
    let { id } = useParams()
    const [booking, setBooking] = useState(null)
    const [redirect, setRedirect] = useState(false)
    useEffect(() => {
        if (id) {
            axios.get(`/bookings`).then((res) => {
                const foundBooking = res.data.find(({ _id }) => _id === id)
                if (foundBooking) setBooking(foundBooking)
            })
        }
    }, [id])
    useEffect(() => {}, [booking])
    async function handleDelete(ev) {
        ev.preventDefault()
        console.log('delete')
        await axios.delete(`/account/bookings/${id}`)
        setBooking(null)
        setRedirect(true)
    }
    if (!booking && !redirect) return 'Loading...'
    if (redirect) return <Navigate to={'/account/bookings'} />
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
                <button
                    className="btn flex self-start items-center gap-x-1 text-xl font-thin hover:text-white "
                    onClick={(ev) => handleDelete(ev)}
                >
                    <IconTrash />
                    Delete this booking
                </button>
            </div>
            <Gallery place={booking.place} />
        </div>
    )
}

export default BookingPage
