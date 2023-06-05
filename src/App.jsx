import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './components/Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import ProfilePage from './pages/ProfilePage'
import PlacesPage from './pages/PlacesPage'
import PlacesFormPage from './pages/PlacesFormPage'
import BookingPage from './pages/BookingPage'
import SinglePage from './pages/SinglePage'
import MyBooking from './pages/MyBooking'

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true
// prettier-ignore
function App() {
    return (
        <UserContextProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<IndexPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/account" element={<ProfilePage />} />
                    <Route path="/account/places" element={<PlacesPage />} />
                    <Route path="/account/places/new" element={<PlacesFormPage />} />
                    <Route path="/account/places/:id" element={<PlacesFormPage />} />
                    <Route path="/account/bookings" element={<MyBooking />} />
                    <Route path="/account/bookings/:id" element={<BookingPage />} />
                    <Route path="/place/:id" element={<SinglePage />} />
                </Route>
            </Routes>
        </UserContextProvider>
    )
}

export default App
