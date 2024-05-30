import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'





const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });


const [error, SetError] = useState('')



  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const navigate = useNavigate();
  const registerUser = async (e) => {
    e.preventDefault();
    SetError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userData);
      if (response && response.data) {
        const newUser = response.data;
        console.log(newUser);
        navigate('/login');
      } else {
        SetError('Could not register user. Please try again.');
      }
    } catch (err) {
      SetError(err.response ? err.response.data.message : 'An error occurred.');
    }
  };
  

  return (
    <section className='register'>
      <div className="container">
        <h2>Sign Up</h2>
        <form className=' form register__form' onSubmit={registerUser}>
          {error && <p className='message-error'>{error}</p>}
          <input type="text" placeholder='Full Name' name='name' value={userData.name} onChange={changeInputHandler}/>
          <input type="text" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandler}/>
          <input type="password" placeholder='Password' name='password' value={userData.password} onChange={changeInputHandler}/>
          <input type="password" placeholder='Confirm password' name='password2' value={userData.password2} onChange={changeInputHandler}/>
          <button type='submit' className='btn primary'>Register</button>
        </form>
        <small>Already have an account? <Link to="/login">sign in</Link></small>
      </div>
    </section>
  );
}

export default Register;