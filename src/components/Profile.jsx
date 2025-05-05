import FriendReq from './CommonComponent/Profile/FriendReq';
import Friendslist from './CommonComponent/Friendslist';

const Profile = () => {

  return (
    <div className='flex w-full gap-x-2 h-screen mx-4 my-2'>
      <Friendslist />   
      <FriendReq />
    </div>
  )
}

export default Profile
