import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from 'firebase/database';

const Navbar = () => {
const auth = getAuth()
    const db = getDatabase();

    const [userList, setuserList] = useState({})

    useEffect(() => {
        const userlist = ref(db, 'users');
        onValue(userlist, (snapshot) => {
            let useListblankArr = {}
            snapshot.forEach((user) => {
                if(auth.currentUser.uid === user.val().userid)
                useListblankArr = { ...user.val(), userKey: user.key }
            })
            setuserList(useListblankArr)
        });
    }, [])
// console.log(userList);

    return (
        <div className='flex flex-col'>
            <div className='flex bg-gray-500 p-3 text-white font-bold justify-around items-center gap-3'>
                <div>
                    <h1>{userList?.username || auth?.currentUser?.displayName ||"Name"}</h1>
                </div>
                <div className='flex p-3 gap-3'>
                    <Link to="/profile">Profile</Link>
                    <Link to="/message">Message</Link>
                    <Link to="/allusers">Users</Link>
                </div>
                <div >
                    <picture className='h-[40px] w-[40px] cursor-pointer'>
                        <img className='h-[40px] w-[40px] rounded-full object-cover'
                            src="https://img.freepik.com/free-photo/face-pretty-leisure-natural-gray_1157-3737.jpg?semt=ais_hybrid&w=740"
                            alt="Profile"
                        />
                    </picture>
                </div>
            </div>
            <div className='bg-gray-200'>
            <Outlet />
            </div>
        </div>
    );
};

export default Navbar;
