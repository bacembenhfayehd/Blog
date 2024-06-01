import React, { useState ,useContext,useEffect} from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../images/avatar15.jpg'
import { FaRegEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';


const UserProfile = () => {
  const [avatar, SetAvatar] = useState(Avatar)
  const [name,SetName] = useState()
  const [email,SetEmail] = useState()
  const [currentPassword,SetCurrentPassword] = useState()
  const [newPassword,SetNewPassword] = useState()
  const [confirmNewPassword,SetConfirmNewPassword] = useState()

  const navigate = useNavigate();

const {currentUser} = useContext(UserContext)
const token = currentUser?.token;



useEffect(()=> {
  if(!token){
    navigate('/login')
  }
},[])
  return (
    <section className='profile'>
      <div className="profile__container">
        <Link to={`/myposts/sdfsdf`} className='btn'>My posts</Link>
        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="avatar__profile">
              <img src={avatar} alt="" />
            </div>
            {/*form to upadate avatar*/}
            <form action="" className="avatar__form">
              <input type="file" name='avatar' id='avatar' onChange={e=> SetAvatar(e.target.files[0])}
               accept='jpeg,jpg,png' />
              <label htmlFor='avatar'><FaRegEdit /></label>
            </form>
            <button className='profile__avatar-btn'><FaCheck />
</button>
          </div>
          <h1>Bacem Benhfayedh</h1>
          {/*form to update profile*/}
          <form className='form profile__form'>
            <p className='message-error'>This is an error message</p>
            <input type="text"  placeholder='Full Name' value={name} onChange={e => SetName(e.target.value)}/>
            <input type="email"  placeholder='Email' value={email} onChange={e => SetEmail(e.target.value)}/>
            <input type="password"  placeholder='Current Password' value={currentPassword} onChange={e => SetCurrentPassword(e.target.value)}/>
            <input type="password"  placeholder='New Password' value={newPassword} onChange={e => SetNewPassword(e.target.value)}/>
            <input type="password"  placeholder='Confirm New Password' value={confirmNewPassword} onChange={e => SetConfirmNewPassword(e.target.value)}/>
            <button type='submit'  className='btn primary'>Update details</button>

          </form>
          
        </div>
      </div>

    </section>
  )
}

export default UserProfile