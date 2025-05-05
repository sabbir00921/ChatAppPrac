import { getAuth } from 'firebase/auth';
import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'



const Friendslist = () => {
    const auth = getAuth()
    const db = getDatabase();

    const [friendList, setfriendList] = useState([])

    useEffect(() => {
        const friendList = ref(db, 'friendList');
        onValue(friendList, (snapshot) => {
            const friendListblankArr = []
            snapshot.forEach((user) => {
                // console.log(user.val());

                if (auth.currentUser.uid === user.val().reciverData.uid || auth.currentUser.uid === user.val().senderData.uid)
                    friendListblankArr.push({ ...user.val(), userKey: user.key })
            })
            setfriendList(friendListblankArr)
        });
    }, [])
    console.log(friendList);


    let list = 10
    return (
        <div className='w-1/3'>
            <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div class="flex items-center justify-between mb-4">
                    <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Friend List</h5>
                    <a href="#" class=" flex justify-center items-center rounded-full text-sm font-medium text-white bg-blue-600 h-6 w-6">
                        {friendList.length < 100 ? friendList.length : "99+"}
                    </a>
                </div>
                <div class="flow-root">
                    <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                        {
                            friendList?.map((singleFrnd) => (
                                <li class="py-3 sm:py-4" id="">
                                    <div class="flex items-center">
                                        <div class="shrink-0">
                                            <img class="w-10 h-10 rounded-full  border-[.5px] border-gray-300 object-cover cursor-pointer" src={singleFrnd?.senderData.profileImage} alt="Neil image" />
                                        </div>
                                        <div class="flex-1 min-w-0 ms-4">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                {auth.currentUser.uid ==singleFrnd?.reciverData?.uid ? singleFrnd?.senderData?.name :singleFrnd?.reciverData?.name}
                                            </p>
                                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                {singleFrnd?.createdAt}
                                            </p>
                                        </div>
                                        <div className=' gap-y-1'>
                                            <button type="button" className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-sm text-sm w-[60px] py-1 text-center me-2 cursor-pointer">Unfriend</button>

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

export default Friendslist
