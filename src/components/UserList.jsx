import { getAuth } from 'firebase/auth';
import { getDatabase, onValue, push, ref, set } from 'firebase/database';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Usersskeleton from '../Skeleton/Usersskeleton';

const UserList = () => {

  const auth = getAuth()
  const db = getDatabase();

  const [alluserList, setalluserList] = useState([])
  const [friendUid, setfriendUid] = useState([]) // compare usrelist button
  const [friendRequid, setfriendRequid] = useState([]) // compare usrelist button
  const [loading, setloading] = useState(true) // compare usrelist button


  // fetch data from user
  useEffect(() => {
    const userlist = ref(db, 'users');
    onValue(userlist, (snapshot) => {
      const useListblankArr = []
      snapshot.forEach((user) => {
        if (auth.currentUser.uid !== user.val().userid)
          useListblankArr.push({ ...user.val(), userKey: user.key })
      })
      setalluserList(useListblankArr)
      setloading(false)
    })
  }, [])
  // console.log(alluserList);

  // fetch data from friendlist
  useEffect(() => {
    const friendUid = ref(db, 'friendList');
    onValue(friendUid, (snapshot) => {
      const friendUidblankArr = []
      snapshot.forEach((user) => {
        // console.log(user.val().reciverData.uid);
        // console.log(auth?.currentUser.uid);
        /**
         * This is the complecated logik for my side to check friend from friend list
         */
        if (auth?.currentUser.uid === user.val().reciverData.uid) {
          friendUidblankArr.push(user.val().senderData.uid) /* set senderData.uid reciver can check using Userlist sender uid*/
        }
        else if (auth?.currentUser.uid === user.val().senderData.uid) {
          friendUidblankArr.push(user.val().reciverData.uid) /* set reciverData.uid sender can check using Userlist reciver uid*/
        }
      })
      setfriendUid(friendUidblankArr)
    });
  }, [])


  // fetch data from friendReq
  useEffect(() => {
    const friendRequid = ref(db, 'friendRequest');
    onValue(friendRequid, (snapshot) => {
      const friendRequidblankArr = []
      snapshot.forEach((user) => {
        console.log(user.val().reciverData.uid, "friendRequest fetch");
        console.log(auth?.currentUser.uid, "auth");
        /**
         * This is the complecated logik for my side to check friend from friend list
         */
        if (auth?.currentUser.uid === user.val().reciverData.uid) {
          friendRequidblankArr.push(user.val().senderData.uid) /* set senderData.uid reciver can check using Userlist sender uid*/
        }
        else if (auth?.currentUser.uid === user.val().senderData.uid) {
          friendRequidblankArr.push(user.val().reciverData.uid) /* set reciverData.uid sender can check using Userlist reciver uid*/
        }
      })
      setfriendRequid(friendRequidblankArr)
    });
  }, [])
  console.log(friendRequid);


  // handleRequestsent implement
  const handleRequestsent = (sentFrdata) => {
    // console.log(auth.currentUser);

    const userdb = ref(db, 'friendRequest/')
    set(push(userdb), {
      senderData: {
        name: auth?.currentUser?.displayName,
        email: auth?.currentUser?.email,
        profileImage: auth?.currentUser?.photoURL,
        uid: auth?.currentUser?.uid
      },
      reciverData: {
        name: sentFrdata?.username,
        email: sentFrdata?.email,
        profileImage: sentFrdata?.profile_picture,
        uid: sentFrdata?.userid
      },
      createdAt: moment().format('MMMM Do YYYY, h:mm:ss a')

    });

  }
  // console.log(friendUid?.includes(auth.currentUser.uid));

  return (
    <div>
      <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">All Users</h5>
          <a href="#" class=" flex justify-center items-center rounded-full text-sm font-medium text-white bg-blue-600 h-6 w-6">
            {alluserList.length < 100 ? alluserList.length : "99+"}
          </a>
        </div>
        <div class="flow-root">
          <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ?
              <Usersskeleton />
              :
              alluserList.map((info, index) => (
                <li class="py-3 sm:py-4" key={index}>
                  <div class="flex items-center">
                    <div class="shrink-0">
                      <img class="w-10 h-10 rounded-full  border-[.5px] border-gray-300 object-cover cursor-pointer" src="https://img.freepik.com/premium-vector/male-avatar-flat-icon-design-vector-illustration_549488-103.jpg" alt="Neil image" />
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                      <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {info?.username}
                      </p>
                      <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                        {info?.email}
                      </p>
                    </div>
                    {
                      friendUid?.includes(info?.userid) ? <button type="button" className="text-white bg-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br  font-medium rounded-lg text-sm w-[100px] py-2 text-center me-2 cursor-pointer">Friend</button>
                        :
                        friendRequid?.includes(info?.userid) ?
                          <button type="button" className="text-white bg-yellow-700 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br  font-medium rounded-lg text-sm w-[100px] py-2 text-center me-2 cursor-pointer">Requested</button>
                          :
                          <button type="button" onClick={() => handleRequestsent(info)} className="text-white bg-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  font-medium rounded-lg text-sm w-[100px] py-2 text-center me-2 cursor-pointer">Add Friend</button>
                    }
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

export default UserList