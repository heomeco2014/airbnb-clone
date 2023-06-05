import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()
    async function handleLoginSubmit(e) {
        e.preventDefault()
        try {
            const { data } = await axios.post('/login', { email, password })
            setUser(data)
            console.log(data)
            setRedirect(true)
        } catch (erorr) {
            alert('Login failed')
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }
    return (
        <div className="flex min-h-screen flex-col justify-center">
            <div className="mb-64">
                <h1 className="mb-4 text-center text-3xl font-semibold">Login</h1>
                <form
                    className="mx-auto flex max-w-xl flex-col"
                    onSubmit={handleLoginSubmit}
                >
                    <input
                        type="email"
                        value={email}
                        placeholder="Your@email.com"
                        onChange={(ev) => setEmail(ev.target.value)}
                    />
                    <input
                        type="password"
                        value={password}
                        placeholder="password"
                        onChange={(ev) => setPassword(ev.target.value)}
                    />
                    <button className="primary btn">Login</button>
                    <div className="text-center">
                        Don't have an account yet ?
                        <Link
                            to={'/register'}
                            className="font-semibold underline"
                        >
                            Register now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
