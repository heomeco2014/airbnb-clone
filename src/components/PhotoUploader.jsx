import axios from 'axios'
import React, { useState } from 'react'

function PhotoUploader({ addedPhotos, setAddedPhotos }) {
    const [photoLinks, setPhotoLinks] = useState([])
    async function addPhotoByLink(ev) {
        ev.preventDefault()
        const { data } = await axios.post('/upload-by-link', {
            link: photoLinks,
        })
        setAddedPhotos([...addedPhotos, data])
        setPhotoLinks('')
    }

    function uploadPhoto(ev) {
        const file = ev.target.files
        const data = new FormData()
        for (let i = 0; i < file.length; i++) {
            data.append('file', file[i])
        }
        axios.post('/upload-local', data, { headers: { 'Content-Type': 'multipart/form-data' } }).then((response) => {
            const { data: filename } = response
            setAddedPhotos([...addedPhotos, ...filename])
        })
    }
    function handleDeletePhoto(photo) {
        return () => {
            setAddedPhotos(addedPhotos.filter((p) => p !== photo))
        }
    }
    function setCoverPhoto(photo) {
        return () => {
            setAddedPhotos([photo, ...addedPhotos.filter((p) => p !== photo)])
        }
    }
    return (
        <>
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Add using a link"
                    className=""
                    value={photoLinks}
                    onChange={(e) => setPhotoLinks(e.target.value)}
                />
                <button
                    className="btn w-[150px] rounded-2xl bg-gray-300 px-4 py-2 text-black"
                    onClick={addPhotoByLink}
                >
                    Add photo
                </button>
            </div>
            <div className="grids-col-3 grid gap-2 md:grid-cols-4 lg:grid-cols-8">
                {addedPhotos.length > 0 &&
                    addedPhotos.map((photo, index) => {
                        return index === 0 ? (
                            <div
                                className="relative flex h-32"
                                key={index}
                            >
                                <img
                                    className="w-full rounded-xl object-cover"
                                    src={'http://localhost:4000/uploads/' + photo}
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="absolute bottom-1 right-1 h-6 w-6 cursor-pointer rounded-xl bg-slate-600 p-1 text-white opacity-70 transition-all hover:text-red-500 hover:opacity-100"
                                    onClick={handleDeletePhoto(photo)}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                </svg>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="absolute right-1 top-1 h-6 w-6 cursor-pointer rounded-xl bg-slate-600 p-1 text-red-500 opacity-70 transition-all hover:text-red-500 hover:opacity-100"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        ) : (
                            <div
                                className="relative flex h-32"
                                key={index}
                            >
                                <img
                                    className="w-full rounded-xl object-cover"
                                    src={'http://localhost:4000/uploads/' + photo}
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="absolute bottom-1 right-1 h-6 w-6 cursor-pointer rounded-xl bg-slate-600 p-1 text-white opacity-70 transition-all hover:text-red-500 hover:opacity-100"
                                    onClick={handleDeletePhoto(photo)}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="absolute right-1 top-1 h-6 w-6 cursor-pointer rounded-xl bg-slate-600 p-1 text-white opacity-70 transition-all hover:text-red-500 hover:opacity-100"
                                    onClick={setCoverPhoto(photo)}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                    />
                                </svg>
                            </div>
                        )
                    })}
                <label className="inline-flex items-center justify-center gap-3 rounded-2xl border bg-transparent p-8 text-2xl">
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
                    <input
                        type="file"
                        className="hidden"
                        onChange={uploadPhoto}
                        multiple
                    />
                    Upload
                </label>
            </div>
        </>
    )
}

export default PhotoUploader
