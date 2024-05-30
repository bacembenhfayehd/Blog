import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../Components/Loader';





const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [isLoading,setIsloading] = useState(false)





useEffect(()=> {
  const getAuthors = async() =>{

  setIsloading(true);


  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`)
    setAuthors(response.data)
    
  } catch (error) {
    console.log(error)
    
  }
  setIsloading(false)
  }


  getAuthors();


})



  return (
    <section className='authors'>
      {authors.length > 0 ? (
        <>
          <div className='authors__container'>
            {authors.map(({_id: id, avatar, name, posts }) => (
              <Link key={id} to={`/posts/users/${id}`} className='author'>
                <div className="author__avatar">
                  <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt={`Image of ${name}`} />
                </div>
                <div className="author__info">
                  <h4>{name}</h4>
                  <p>{posts}</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <h2 className='center'>No Authors/Users found.</h2>
      )}
    </section>
  );
}

export default Authors;
