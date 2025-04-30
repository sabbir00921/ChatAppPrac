import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
const Login = () => {

    const navigate = useNavigate();
    const auth = getAuth();
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    // OnChange handler to update state
    const loginChange = (e) => {
        const { name, value } = e.target;
        setData((oldDatd) => ({
            ...oldDatd,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = data
        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                console.log(user.user);
                navigate("/")
            })
            .catch((error) => {
                console.log(error);

            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
                <form  onSubmit={(e) => e.preventDefault()}>
                    <div className='mb-4'>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            onChange={loginChange}
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            onChange={loginChange}
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
