import { Link, useParams } from 'react-router-dom'

function PlacesPage() {
    const { action } = useParams()
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
                        <h2 className="mt-4 text-2xl">Title</h2>
                        <p className="text-xm text-gray-500">
                            Title for your place, should be short and catchy as
                            in adsvertisement
                        </p>
                        <input
                            type="text"
                            placeholder="title, for example: My home"
                        />
                        <h2 className="mt-4 text-2xl">Address</h2>
                        <p className="text-xm text-gray-500">
                            Address of your place, should be real address
                        </p>
                        <input type="text" placeholder="address" />
                        <h2 className="mt-4 text-2xl">Photos</h2>
                        <p className="text-xm text-gray-500">More = better</p>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Add using a link"
                                className=""
                            />
                            <button className="w-[7%] rounded-2xl bg-gray-300 px-4 py-2 text-black">
                                Add photo
                            </button>
                        </div>
                        <div className="grids-col-3 grid md:grid-cols-4 lg:grid-cols-8">
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
                    </form>
                </div>
            )}
        </div>
    )
}

export default PlacesPage
