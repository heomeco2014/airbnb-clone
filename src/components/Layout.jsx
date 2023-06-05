import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <div className="flex min-h-screen flex-col px-20 py-5 select-none">
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout
