import { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import PlacesPage from './PlacesPage'
import AccountNav from '../components/AccountNav'

function ProfilePage() {
    const { user, ready, setUser } = useContext(UserContext)
    const [redirect, setRedirect] = useState(null)
    let { subpage } = useParams()
    if (subpage === undefined) {
        subpage = 'profile'
    }
    async function logout() {
        await axios.post('/logout')
        setRedirect('/')
        setUser(null)
    }
    if (!ready) return 'Loading...'
    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <AccountNav subpage={subpage} />
            {subpage === 'profile' && (
                <div className="mx-auto mt-10 max-w-lg text-center">
                    Logged in as {user.name} ({user.email})
                    <button
                        onClick={logout}
                        className="primary btn mt-2 max-w-sm"
                    >
                        Logout
                    </button>
                </div>
            )}
            {subpage === 'places' && <PlacesPage />}
        </div>
    )
}

export default ProfilePage
