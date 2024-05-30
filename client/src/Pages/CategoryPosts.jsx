import React,{ useState,useEffect } from 'react'
import PostItem from '../Components/PostItem'
import axios from 'axios'
import Loader from '../Components/Loader'
import { useParams } from 'react-router-dom'

const CategoryPosts = () => {
  const [posts,setPosts] = useState([])
  const [isLoading, setIsloading] = useState(false)
  const {category} = useParams();

useEffect(() => {
const fetchPosts = async() => {
  setIsloading(true);

  try {

    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/categories/${category}`)
    setPosts(response?.data)

    
  } catch (err) {
    console.log(err)
    
  }

  setIsloading(false);
}

fetchPosts();
},[])


if(isLoading)
{
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

export default CategoryPosts