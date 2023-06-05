import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './../UserContext'

function Header() {
    const { user } = useContext(UserContext)
    return (
        <header className="flex items-center justify-between">
            <Link
                to={'/'}
                className="flex items-center"
            >
                <img
                    src="/src/assets/logo.png"
                    className="h-[30px] w-[30px] "
                />
                <span className="ml-1 text-xl font-[750] text-[#FF385C]">airbnb</span>
            </Link>

            <div className="border-black-400 flex rounded-full border px-4 py-2 font-semibold leading-6 shadow-md shadow-gray-200">
                <div className="mx-2">Anywhere</div>
                <div className="border-l border-gray-300"></div>
                <div className="mx-2">Any week</div>
                <div className="border-l border-gray-300"></div>
                <div className="mx-2">Add guest</div>

                <button className="btn rounded-full bg-primary p-1 text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </button>
            </div>

            <Link
                to={user ? '/account' : '/login'}
                className="border-black-400 flex items-center rounded-full border px-4 py-2 leading-6 shadow-md"
            >
                <div className="mr-2">
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
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                </div>
                <div className="rounded-full border border-gray-500 bg-gray-500 text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="relative top-[5px] h-6 w-6"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                {user ? <span className="ml-1">{user.name}</span> : ''}
            </Link>
        </header>
    )
}

export default Header
