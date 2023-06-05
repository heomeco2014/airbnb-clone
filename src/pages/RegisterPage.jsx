import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
function RegisterPage() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [retypePassword, setRetypePassword] = useState('')

    function registerUser(ev) {
        ev.preventDefault()
        axios.post('/register', {
            name,
            email,
            password,
            retypePassword,
        })
        alert('Register succesful')
    }
    return (
        <div className="flex min-h-screen flex-col justify-center">
            <div className="mb-64">
                <h1 className="mb-4 text-center text-3xl font-semibold">Register</h1>
                <form
                    className="mx-auto flex max-w-xl flex-col"
                    onSubmit={registerUser}
                >
                    <input
                        type="text"
                        placeholder="Nhat Minh Hoang"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Your@email.com"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                    />
                    <input
                        type="password"
                        value={password}
                        placeholder="password"
                        onChange={(ev) => setPassword(ev.target.value)}
                    />
                    <input
                        type="password"
                        value={retypePassword}
                        placeholder="retype password"
                        onChange={(ev) => setRetypePassword(ev.target.value)}
                    />
                    <button className="primary btn">Register</button>
                    <div className="text-center ">
                        Already have an account ?
                        <Link
                            to={'/login'}
                            className="font-semibold underline"
                        >
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage
