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
                    className="w-[7%] rounded-2xl bg-gray-300 px-4 py-2 text-black"
                    onClick={addPhotoByLink}
                >
                    Add photo
                </button>
            </div>
            <div className="grids-col-3 grid gap-2 md:grid-cols-4 lg:grid-cols-8">
                {addedPhotos.length > 0 &&
                    addedPhotos.map((photo, index) => {
                        return (
                            <div
                                className="flex h-32"
                                key={index}
                            >
                                <img
                                    className="w-full rounded-2xl object-cover"
                                    src={'http://localhost:4000/uploads/' + photo}
                                />
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
