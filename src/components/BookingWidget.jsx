import React, { useContext, useEffect, useState } from 'react'
import Button from './Button'
import { differenceInCalendarDays } from 'date-fns'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../UserContext'
function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [numberOfGuests, setNumberOfGuests] = useState(1)
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [redirect, setRedirect] = useState('')
    let numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (user) {
            setName(user.name)
            if (user.phoneNumber) {
                setPhoneNumber(user.phoneNumber)
            }
        }
    }, [])
    async function bookThisPlace() {
        const response = await axios.post('/bookings', { checkIn, checkOut, numberOfGuests, name, phoneNumber, price: place.price * numberOfNights, place: place._id })
        const bookingId = response.data._id
        setRedirect(`/account/bookings/${bookingId}`)
    }
    if (redirect) {
        return <Navigate to={redirect} />
    }
    return (
        <div className="mt-8 rounded-2xl border border-gray-300 bg-white p-4">
            <div className="text-center text-2xl">Price: {place.price}$ / per night</div>
            <div className="flex flex-col rounded-2xl border">
                <div className="flex ">
                    <div className=" grow p-4 border-r">
                        <label
                            htmlFor="check-in"
                            className=""
                        >
                            Check in:
                        </label>
                        <input
                            value={checkIn}
                            type="date"
                            name="check-in"
                            id=""
                            className="date"
                            onChange={(ev) => {
                                setCheckIn(ev.target.value)
                            }}
                        />
                    </div>
                    <div className="grow p-4">
                        <label
                            htmlFor="check-out"
                            className=""
                        >
                            Check out:
                        </label>
                        <input
                            value={checkOut}
                            type="date"
                            name="check-out"
                            id=""
                            className="date"
                            onChange={(ev) => {
                                setCheckOut(ev.target.value)
                            }}
                        />
                    </div>
                </div>
                <div className="border-t px-4 py-3">
                    <label
                        htmlFor="check-out"
                        className=""
                    >
                        Number of guest:
                    </label>
                    <input
                        type="number"
                        name="number-of-guest"
                        value={numberOfGuests}
                        onChange={(ev) => setNumberOfGuests(ev.target.value)}
                        placeholder="1"
                        className="number-remove_arrow w-full !rounded-none !border-b-2 focus:border-blue-500 !border-l-0 !border-r-0 !border-t-0 border-gray-200 !pl-0"
                    />
                </div>
                {numberOfNights > 0 && (
                    <div className="show-box">
                        <div className="border-t px-4 py-3">
                            <label
                                htmlFor="your-full-name"
                                className=""
                            >
                                Your full name:
                            </label>
                            <input
                                type="text"
                                name="your-full-name"
                                value={name}
                                onChange={(ev) => setName(ev.target.value)}
                                placeholder="Example: Nhat Minh"
                                className=" w-full !rounded-none !border-b-2 !border-l-0 !border-r-0 !border-t-0 border-gray-200 !pl-0 focus:border-blue-500"
                            />
                        </div>
                        <div className="border-t px-4 py-3">
                            <label
                                htmlFor="check-out"
                                className=""
                            >
                                Phone number:
                            </label>
                            <input
                                type="tel"
                                name="phone-number"
                                value={phoneNumber}
                                onChange={(ev) => setPhoneNumber(ev.target.value)}
                                placeholder="Example: +123 456 789"
                                className=" w-full !rounded-none !border-b-2 focus:border-blue-500 !border-l-0 !border-r-0 !border-t-0 border-gray-200 !pl-0"
                            />
                        </div>
                    </div>
                )}
            </div>
            <Button
                className="mt-2 w-full bg-primary text-white"
                onClick={bookThisPlace}
            >
                Book this place for
                {checkIn && checkOut && <span className=""> ${numberOfNights * place.price}</span>}
            </Button>
        </div>
    )
}

export default BookingWidget
