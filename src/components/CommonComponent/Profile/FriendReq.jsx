import { getAuth } from 'firebase/auth';
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
import moment from 'moment';
import React, { useEffect, useState } from 'react'

const FriendReq = () => {
    const auth = getAuth()
    const db = getDatabase();

    const [frReqList, setfrReqList] = useState([])

    useEffect(() => {
        const frReq = ref(db, 'friendRequest');
        onValue(frReq, (snapshot) => {
            const frReqListblankArr = []

            snapshot.forEach((user) => {
                if (auth.currentUser.uid === user.val().reciverData.uid)
                    frReqListblankArr.push({ ...user.val(), userKey: user.key })
            })
            setfrReqList(frReqListblankArr)
        });
    }, [])


    //handleAccept
    const handleAccept = (acceptData) => {
        const friendListdb = ref(db, 'friendList/')
        set(push(friendListdb), {
            senderData: {
                name: acceptData?.senderData?.name,
                email: acceptData?.senderData?.email,
                profileImage: acceptData?.senderData?.profileImage,
                uid: acceptData?.senderData?.uid
            },
            reciverData: {
                name: acceptData?.reciverData?.name,
                email: acceptData?.reciverData?.email,
                profileImage: acceptData?.reciverData?.profileImage,
                uid: acceptData?.reciverData?.uid
            },
            createdAt: moment().format('MMMM Do YYYY, h:mm:ss a')

        }).then(() => {
            const delReq = ref(db, `friendRequest/${acceptData.userKey}`); // to delete user from DB.
            remove(delReq);
            // console.log(acceptData);
        })



    }

    // handelReject
    const handelReject = (rejectData) => {
        const delReq = ref(db, `friendRequest/${rejectData.userKey}`); // to delete user from DB.
        remove(delReq);
        // console.log("Time",moment().format('MMMM Do YYYY, h:mm:ss'));

    }

    return (
        <div className='w-1/3 ' >
            <div class="w-full max-h-screen max-w-md p-4 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div class="flex items-center justify-between mb-4">
                    <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Friend request</h5>
                    <a href="#" class=" flex justify-center items-center rounded-full text-sm font-medium text-white bg-blue-600 h-6 w-6">
                        {frReqList.length < 100 ? frReqList.length : "99+"}
                    </a>
                </div>
                <div class=" max-h-screen overflow-y-scroll">
                    <ul role="list" class="divide-y h-[90%]  divide-gray-200 dark:divide-gray-700">
                        {
                            frReqList.map((info, index) => (
                                <li class="py-3 sm:py-4" id={index}>
                                    <div class="flex items-center">
                                        <div class="shrink-0">
                                            <img class="w-10 h-10 rounded-full  border-[.5px] border-gray-300 object-cover cursor-pointer" src={info?.senderData.profileImage} alt="Neil image" />
                                        </div>
                                        <div class="flex-1 min-w-0 ms-4">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                {info?.senderData.name}
                                            </p>
                                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                {info?.createdAt
                                                }
                                            </p>
                                        </div>
                                        <div className=' gap-y-1'>
                                            <button type="button" onClick={() => handleAccept(info)} className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-sm text-sm w-[60px] py-1 text-center me-2 cursor-pointer">Accept</button>
                                            <button type="button" onClick={() => handelReject(info)} className="text-white bg-red-500 hover:bg-red-600  font-medium rounded-sm text-sm w-[60px] py-1 text-center  cursor-pointer">Recect</button>
                                        </div>
                                    </div>
                                </li>

                            ))
                        }
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default FriendReq
