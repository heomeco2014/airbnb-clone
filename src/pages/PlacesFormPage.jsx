import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import PhotoUploader from './../components/PhotoUploader.jsx'
import Perks from '../components/Perks.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import AccountNav from '../components/AccountNav.jsx'
import useAutosizeTextArea from '../Hooks/useAutoSizeTextArea.jsx'
function PlacesFormPage() {
    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfor, setExtraInfor] = useState('')
    const [checkIn, setCheckIn] = useState(0)
    const [checkOut, setCheckOut] = useState(0)
    const [maxGuests, setMaxGuests] = useState(1)
    const navigate = useNavigate()

    function preInput(header, description) {
        return (
            <>
                <h2 className="mt-4 text-2xl">{header}</h2>
                <p className="text-infor">{description}</p>
            </>
        )
    }

    async function addNewPlace(ev) {
        ev.preventDefault()
        await axios.post('/places', { title, address, addedPhotos, description, perks, extraInfor, checkIn, checkOut, maxGuests })
        navigate('/account/places')
    }
    useEffect(() => {
        console.log(textAreaRef.current)
        if (id) {
            axios.get('/places').then(({ data }) => {
                const place = data.find((place) => place._id === id)
                setTitle(place.title)
                setAddress(place.address)
                setAddedPhotos(place.photos)
                setDescription(place.description)
                setPerks(place.perks)
                setExtraInfor(place.extraInfor)
                setCheckIn(place.checkIn)
                setCheckOut(place.checkOut)
                setMaxGuests(place.maxGuests)
            })
        }
        return
    }, [])
    const textAreaRef = useRef(null)
    const useAutosizeTextArea = (textAreaRef, value) => {
        useEffect(() => {
            if (textAreaRef) {
                textAreaRef.style.height = '0px'
                const scrollHeight = textAreaRef.scrollHeight

                // We then set the height directly, outside of the render loop
                // Trying to set this with state or a ref will product an incorrect value.
                textAreaRef.style.height = scrollHeight + 'px'
            }
        }, [textAreaRef, value])
    }
    useAutosizeTextArea(textAreaRef.current, description)
    return (
        <div className="">
            <AccountNav />
            <form onSubmit={addNewPlace}>
                {preInput('Title', 'Title your place, should be short and catchy as in adsvertisement')}
                <input
                    type="text"
                    placeholder="title, example: My home"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {preInput('Address', 'Address of your place, should be real address')}
                <input
                    type="text"
                    placeholder="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                {preInput('Photos', 'More = better')}
                <PhotoUploader
                    addedPhotos={addedPhotos}
                    setAddedPhotos={setAddedPhotos}
                />
                {preInput('Description', 'Description of the place')}
                <textarea
                    className=""
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    ref={textAreaRef}
                    rows={1}
                ></textarea>

                {preInput('Perks', ' Select all the perks that your place has')}

                <Perks
                    selected={perks}
                    onChange={setPerks}
                />

                {preInput('Extra info', 'House rules, etc')}
                <textarea
                    className=""
                    value={extraInfor}
                    onChange={(e) => setExtraInfor(e.target.value)}
                ></textarea>
                {preInput('Check in & out times', 'Add check in and out times, remember to have some time window cleaning the room between guests')}

                <div className="grid gap-2 sm:grid-cols-3">
                    <div className="">
                        <h3 className="mt-2">Check in times</h3>
                        <input
                            type="time"
                            className=""
                            placeholder="13:00"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                        />
                    </div>
                    <div className="">
                        <h3 className="mt-2">Check out times</h3>
                        <input
                            type="time"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                        />
                    </div>
                    <div className="">
                        <h3 className="mt-2">Max number of guest</h3>
                        <input
                            type="number"
                            min={0}
                            max={100}
                            value={maxGuests}
                            onChange={(e) => setMaxGuests(e.target.value)}
                        />
                    </div>
                </div>
                <button className="primary mx-auto mt-2 block max-w-2xl">Save</button>
            </form>
        </div>
    )
}

export default PlacesFormPage
