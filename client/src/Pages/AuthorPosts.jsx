import React,{ useState,useEffect } from 'react'
import PostItem from '../Components/PostItem'
import axios from 'axios'
import Loader from '../Components/Loader'
import { useParams } from 'react-router-dom'

const AuthorPosts = () => {
  const [posts,setPosts] = useState([])
  const [isLoading, setIsloading] = useState(false)
  const {id} = useParams();

useEffect(() => {
const fetchPosts = async() => {
  setIsloading(true);

  try {

    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`)
    setPosts(response?.data)

    
  } catch (err) {
    console.log(err)
    
  }

  setIsloading(false);
}

fetchPosts();
},[id])


if(isLoading){
return <Loader/>
}




return (
  <section className='posts'>
    {posts.length > 0 ? <div className="posts__container">
     {
          posts.map(({_id: id,thumbnail,category,title,description,authorID,createdAt, creator})=> <PostItem   key={id} postID={id} thumbnail={thumbnail} category={category} 
          title={title} description={description} authorID={creator} createdAt={createdAt} />)
      }
     </div> : <h2 className='center'>No posts founds</h2>}

  </section>
)
}

export default AuthorPosts