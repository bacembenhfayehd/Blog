import React, { useContext } from 'react'
import {Link} from 'react-router-dom'

//npmimport { FaBars } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { SiBloglovin } from "react-icons/si";
import { UserContext } from '../context/userContext';
//


const Header = ({setIsNavShowing}) => {
  const {currentUser} = useContext(UserContext)
  const closeNavHandler = () =>{
    if(window.innerWidth <800){
      setIsNavShowing(false);
    }else{
      setIsNavShowing(true);
    }
  }
  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className='nav__logo' onClick={closeNavHandler}>
        <SiBloglovin />
        </Link>
        {currentUser?.id &&  <ul className="nav__menu">
          <li><Link to="/profile/sdfsdf" onClick={closeNavHandler}>{currentUser?.name}</Link></li>
          <li><Link to="/create" onClick={closeNavHandler}>Create Post</Link></li>
          <li><Link to="/authors" onClick={closeNavHandler}>Authors</Link></li>
          <li><Link to="logout" onClick={closeNavHandler}>Logout</Link></li>
        </ul>}
        {!currentUser?.id &&<ul className="nav__menu">
          
          <li><Link to="/authors" onClick={closeNavHandler}>Authors</Link></li>
          <li><Link to="logout" onClick={closeNavHandler}>Login</Link></li>
        </ul>}
        <button className="nav___toggle-btn">
        <IoIosClose />
        </button>

      </div>
    </nav>
  )
}

export default Header