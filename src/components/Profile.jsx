import { getAuth } from 'firebase/auth';
import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'

const Profile = () => {
  const auth = getAuth()
  const db = getDatabase();

  const [frReqList, setfrReqList] = useState([])

  useEffect(() => {
    const frReq = ref(db, 'friendRequest');
    onValue(frReq, (snapshot) => {
      const frReqListblankArr = []
      
      snapshot.forEach((user) => {
        console.log(auth.currentUser.uid ,"and", user.val().reciverData.uid);
        if (auth.currentUser.uid === user.val().reciverData.uid)
          frReqListblankArr.push({ ...user.val(), userKey: user.key })
      })
      setfrReqList(frReqListblankArr)
    });
  }, [])
  console.log(frReqList);



  return (
    <div>
      <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Friend request</h5>
          {/* <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            View all
          </a> */}
        </div>
        <div class="flow-root">
          <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
          {
              frReqList.map((info) => (
                <li class="py-3 sm:py-4">
                  <div class="flex items-center">
                    <div class="shrink-0">
                      <img class="w-10 h-10 rounded-full  border-[.5px] border-gray-300 object-cover cursor-pointer" src={info?.senderData.profileImage} alt="Neil image" />
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                      <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {info?.senderData.name}
                      </p>
                      <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                        {info?.senderData.email}
                      </p>
                    </div>
                    <button type="button" className="text-white bg-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-5 py-2 text-center me-2 cursor-pointer">Add Friend</button>
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

export default Profile
