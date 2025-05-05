import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDatabase, push, ref, set} from "firebase/database";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const auth = getAuth();
    const db = getDatabase();
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const data = [
        {
            name: "email",
            id: 1
        },
        {
            name: "name",
            id: 2
        },
        {
            name: "password",
            id: 3
        },
    ]

    // handleinput function
    const handleinput = (e) => {
        const { name, value } = e.target;
        if (name == "email") {
            setEmail(value)
        }
        else if (name == "name") {
            setName(value)
        }
        else {
            setPassword(value)
        }


    }
    console.log(name);

    //check given info
    const submitData = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                console.log(user);

            }).then(() => {
                updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: "https://img.freepik.com/premium-vector/male-avatar-flat-icon-design-vector-illustration_549488-103.jpg"
                })
            }).then(() => {
                const userdb = ref(db, 'users/')
                set(push(userdb), {
                    userid: auth.currentUser.uid,
                    username: name,
                    email: email,
                    profile_picture: "Empty"
                });
                navigate("/login")
            })
            .catch((err) => {
                console.log(err, "signup Error");

            })
    }
    // handlesignup implementation
    const handlesignup = (e) => {
        e.preventDefault();
        submitData()

    }
    // submitenter by enter
    const submitenter = (e) => {
        e.preventDefault();
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
                                <label htmlFor={item.name} className="block text-sm font-medium text-gray-700">
                                    {item.name}
                                </label>
                                <input
                                    onChange={handleinput}
                                    type={item.name}
                                    id={item.id}
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
                        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition cursor-pointer"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Signup
