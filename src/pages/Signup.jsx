import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
    const auth = getAuth();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const data = [
        {
            name: "email",
            id: 1
        },
        {
            name: "password",
            id: 2
        },
    ]

    // handleinput function
    const handleinput = (e) => {
        const { name, value } = e.target;
        if (name == "email") {
            setEmail(value)
        }
        else {
            setPassword(value)
        }


    }

    //check given info
    const submitData = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                console.log(user);

            })
    }
    // handlesignup implementation
    const handlesignup = (e) => {
        e.preventDefault();
        console.log(email, password);
        submitData()

    }
    // submitenter by enter
    const submitenter = (e) => {
        console.log(e.key)
        if (e.key == Enter) {
            submitData()
        }

    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">SignUp</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div>
                        {data.map((item) => (
                            <div key={item.id} className='mb-4'>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    {item.name}
                                </label>
                                <input
                                    onChange={handleinput}
                                    type={item.name}
                                    id="email"
                                    name={item.name}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        ))}

                    </div>

                    <button
                        onClick={handlesignup}
                        onKeyDown={submitenter}
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Signup
