import { IconArrowLeft, IconGridDots, IconHeart, IconShare3 } from '@tabler/icons-react'
import React, { useState } from 'react'
import LinkAddress from './LinkAddress.jsx'
function Gallery({ place, className }) {
    const [showAllPhotos, setShowAllPhotos] = useState(false)
    if (showAllPhotos) {
        return (
            <div className="show-box mt-4 min-h-screen min-w-full px-4">
                <div className="grid gap-4 p-8">
                    <div className="">
                        <button
                            className=" animate fixed left-4 top-20"
                            onClick={() => setShowAllPhotos(false)}
                        >
                            <IconArrowLeft />
                        </button>
                    </div>
                    {place.photos.map((photo, i) => {
                        return (
                            <img
                                src={'http://localhost:4000/uploads/' + photo}
                                alt=""
                                key={i}
                                className=" mx-auto w-full rounded-xl object-cover"
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
    return (
        <>
            <div className="relative  rounded-2xl bg-gray-100 p-2">
                <div className=" grid grid-cols-[2fr_1fr] gap-2">
                    <div className="rounded-l-2xl">
                        {place.photos?.[0] && (
                            <img
                                onClick={() => setShowAllPhotos(true)}
                                src={'http://localhost:4000/uploads/' + place.photos[0]}
                                alt=""
                                className=" h-full cursor-pointer rounded-[inherit] object-cover transition-all hover:brightness-90"
                            />
                        )}
                    </div>
                    <div className="grid rounded-tr-2xl">
                        {place.photos?.[1] && (
                            <img
                                onClick={() => setShowAllPhotos(true)}
                                src={'http://localhost:4000/uploads/' + place.photos[1]}
                                alt=""
                                className=" h-full cursor-pointer rounded-[inherit] object-cover transition-all hover:brightness-90"
                            />
                        )}
                        <div className="overflow-hidden rounded-br-2xl border">
                            {place.photos?.[2] && (
                                <img
                                    onClick={() => setShowAllPhotos(true)}
                                    src={'http://localhost:4000/uploads/' + place.photos[2]}
                                    alt=""
                                    className="relative top-2  h-full w-full  cursor-pointer rounded-[inherit] object-cover transition-all hover:brightness-90"
                                />
                            )}
                        </div>
                    </div>
                </div>
                <button
                    className="absolute bottom-2 right-2 m-2 flex items-center gap-2 opacity-50  hover:opacity-100"
                    onClick={() => setShowAllPhotos(true)}
                >
                    <IconGridDots />
                    <span>Show all photos</span>
                </button>
            </div>
        </>
    )
}

export default Gallery
