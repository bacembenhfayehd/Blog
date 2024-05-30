import React, { useState,useContext,useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { UserContext } from '../context/userContext'
import {useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const EditPost = () => {
  const [title, SetTitle] = useState ('')
  const [category, SetCategory] = useState ('Uncategorized')
  const [description, SetDescription] = useState ('')
  const [thumbnail, SetThumbnail] = useState ('')
  const [error, setError] = useState('')

const navigate = useNavigate();
const {id} = useParams();


const {currentUser} = useContext(UserContext)
const token = currentUser?.token;



useEffect(() => {
  if (!token) {
    navigate('/login')
  }
}, [navigate, token]);



const modules = {
  toolbar:[
        [{'header':[1, 2, 3, 4, 5, 6, false]}],
        ['bold', 'italic' , 'underline', 'strike', 'blockquote' ],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']


  ]
}


const formats = [

'header',
'bold', 'italic' , 'underline', 'strike', 'blockquote',
'list', 'bullet', 'indent',
'link', 'image' 
]

const POST_CATEGORIES = [
  "Agriculture", "Business", "Agriculture", "Education", "Entertainment", "Art ", "Uncategorized", "Weather"
]



useEffect(() => {
  const getPost = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);

      SetTitle(response.data.title);
      SetDescription(response.data.description);
    } catch (error) {
      console.log(error);
    }
  }

  getPost();
}, []);


const editPost = async (e) => {
  e.preventDefault();
  const postData = new FormData();
  postData.set('title',title)
  postData.set('category',category)
  postData.set('description',description)
  postData.set('thumbnail',thumbnail)


  try {
    const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`,postData, {withCredentials:
    true, headers: {Authorization: `Bearer ${token}`}})
    if(response.status === 200)
    return navigate('/')
  } catch (err){
    console.log(err.response.data.message);
    
  }


}



  return (
    <section className='create-post'>
      <div className='container'>
        <h2>Edit Post</h2>
        {error && <p className='message-error'>{error}</p>}
          <form className=' create-post__form' onSubmit={editPost}>
          <input type="text" placeholder='Title' value={title} onChange={e => SetTitle(e.target.value)} autoFocus />

            <select name='category' value={category} onChange={e => SetCategory(e.target.value)}>
              { 
                 POST_CATEGORIES.map((cat,index) => 
                 <option key={index}>{cat}</option>)
              
              }
             

            </select>
            <ReactQuill modules={modules} formats={formats} value={description} onChange={SetDescription} />
              <input type="file" onChange={e => SetThumbnail(e.target.files[0])} accept='jpg, png, jpeg' />
              <button type='submit' className='btn primary'> Update</button>

          </form>

      </div>

    </section>
  )
}

export default EditPost