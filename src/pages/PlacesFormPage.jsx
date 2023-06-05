import axios, { Axios } from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import PhotoUploader from './../components/PhotoUploader.jsx'
import Perks from '../components/Perks.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import AccountNav from '../components/AccountNav.jsx'
import useAutosizeTextArea from '../Hooks/useAutoSizeTextArea.jsx'
import { IconTrash, IconBoxMultiple } from '@tabler/icons-react'
import Modal from '../components/Modal.jsx'

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
    const [price, setPrice] = useState(0)
    const [isEditMode, setIsEditMode] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [showModal, setShowModal] = useState(false)
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
        await axios.post('/places', { title, address, addedPhotos, description, perks, extraInfor, checkIn, checkOut, maxGuests, price })
        navigate('/account/places')
    }
    async function editPlace(ev) {
        ev.preventDefault()
        await axios.put(`/places/${id}`, { title, address, addedPhotos, description, perks, extraInfor, checkIn, checkOut, maxGuests, price })
        navigate('/account/places')
    }
    function preventSubmitTwice() {
        setIsSubmitted(true)
    }
    async function deletePlace(ev) {
        ev.preventDefault()
        await axios.delete(`/places/${id}`)
        navigate('/account/places')
    }
    function handleCloseOpenModal(ev) {
        ev.preventDefault()
        setShowModal(!showModal)
    }
    useEffect(() => {
        if (isSubmitted) {
            setTimeout(() => {
                setIsSubmitted(false)
            }, 2000)
        }
        return
    }, [isSubmitted])
    useEffect(() => {
        if (id) {
            setIsEditMode(true)
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
                setPrice(place.price)
            })
        }
        return
    }, [])
    const textAreaRef = useRef(null)

    useAutosizeTextArea(textAreaRef.current, description)
    return (
        <div className="">
            <AccountNav />

            <form
                onSubmit={isEditMode ? editPlace : addNewPlace}
                disabled={isSubmitted}
                className="relative"
            >
                {isEditMode && (
                    <button
                        className="btn flex items-center gap-x-1 text-xl font-thin hover:text-white"
                        onClick={(ev) => handleCloseOpenModal(ev)}
                    >
                        <IconTrash />
                        Delete this place
                    </button>
                )}
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
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="">
                        <h3 className="mt-2">Check in times</h3>
                        <input
                            type="time"
                            className="w-[30%]"
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
                    <div className="relative">
                        <h3 className="mt-2">Price per night</h3>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="absolute left-2 top-[46px] h-6 w-6 p-[2px]"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <input
                            type="number"
                            min={1}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder=""
                            className="indent-5"
                        />
                    </div>
                </div>
                {isEditMode ? (
                    <button className="primary btn mx-auto mt-2 block max-w-2xl">Save Edit</button>
                ) : (
                    <button
                        className="primary btn mx-auto mt-2 block max-w-2xl"
                        onClick={preventSubmitTwice}
                    >
                        Save
                    </button>
                )}
                <Modal
                    title="Confirm delete"
                    show={showModal}
                    yes={deletePlace}
                    no={() => setShowModal(false)}
                >
                    <p>Are you sure want to delete ?</p>
                </Modal>
            </form>
        </div>
    )
}

export default PlacesFormPage
