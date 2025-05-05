import FriendReq from './CommonComponent/Profile/FriendReq';
import Friendslist from './CommonComponent/Friendslist';
import UserList from './UserList';

const Profile = () => {

  return (
    <div className='flex w-full gap-x-2 h-screen mx-4 my-2'>
      <Friendslist />   
      <FriendReq />
      <UserList/>
    </div>
  )
}

export default Profile
