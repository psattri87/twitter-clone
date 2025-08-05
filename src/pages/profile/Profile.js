import React from 'react'
import "../pages.css";
import MainProfile from './mainProfile/MainProfile';

const Profile = () => {
  const user = {
    name: "psattri",
    email: "pushpendra@gmail.com",
  };
  return (
    <div className='profilePage'>
      <MainProfile user={user} />
    </div>
  )
}

export default Profile