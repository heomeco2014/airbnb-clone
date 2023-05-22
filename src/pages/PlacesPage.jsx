import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import Perks from './../Perks'
import axios from 'axios'
function PlacesPage() {
    const { action } = useParams()
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [photoLinks, setPhotoLinks] = useState([])
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfor, setExtraInfor] = useState('')
    const [checkIn, setCheckIn] = useState(0)
    const [checkOut, setCheckOut] = useState(0)
    const [maxGuests, setMaxGuests] = useState(1)
    function preInput(header, description) {
        return (
            <>
                <h2 className="mt-4 text-2xl">{header}</h2>
                <p className="text-infor">{description}</p>
            </>
        )
    }

    async function addPhotoByLink(ev) {
        ev.preventDefault()
        const { data } = await axios.post('/upload-by-link', {
            link: photoLinks,
        })
        setAddedPhotos([...addedPhotos, data])
    }
    return (
        <div>
            {action !== 'new' && (
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
            )}
            {action === 'new' && (
                <div className="">
                    <form>
                        {preInput(
                            'Title',
                            'Title your place, should be short and catchy as in adsvertisement'
                        )}
                        <input
                            type="text"
                            placeholder="title, example: My home"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {preInput(
                            'Address',
                            'Address of your place, should be real address'
                        )}
                        <input
                            type="text"
                            placeholder="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />

                        {preInput('Photos', 'More = better')}
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Add using a link"
                                className=""
                                value={photoLinks}
                                onChange={(e) => setPhotoLinks(e.target.value)}
                            />
                            <button
                                className="w-[7%] rounded-2xl bg-gray-300 px-4 py-2 text-black"
                                onClick={addPhotoByLink}
                            >
                                Add photo
                            </button>
                        </div>
                        <div className="grids-col-3 grid gap-2 md:grid-cols-4 lg:grid-cols-8">
                            {addedPhotos.length > 0 &&
                                addedPhotos.map((photo) => {
                                    return (
                                        <img
                                            className="rounded-2xl "
                                            src={
                                                'http://localhost:4000/uploads/' +
                                                photo
                                            }
                                        />
                                    )
                                })}
                            <button className="inline-flex items-center justify-center gap-3 rounded-2xl border bg-transparent p-8 text-2xl">
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
                                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                    />
                                </svg>
                                Upload
                            </button>
                        </div>
                        {preInput('Description', 'Description of the place')}
                        <textarea
                            className=""
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>

                        {preInput(
                            'Perks',
                            ' Select all the perks that your place has'
                        )}

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
                        {preInput(
                            'Check in & out times',
                            'Add check in and out times, remember to have some time window cleaning the room between guests'
                        )}

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
                                    onChange={(e) =>
                                        setCheckOut(e.target.value)
                                    }
                                />
                            </div>
                            <div className="">
                                <h3 className="mt-2">Max number of guest</h3>
                                <input
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={maxGuests}
                                    onChange={(e) =>
                                        setMaxGuests(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <button className="primary mx-auto mt-2 block max-w-2xl">
                            Save
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default PlacesPage
