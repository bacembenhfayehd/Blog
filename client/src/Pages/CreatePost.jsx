import React, { useState, useContext, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import axios from 'axios'

const CreatePost = () => {
  const [title, SetTitle] = useState ('')
  const [category, SetCategory] = useState ('Uncategorized')
  const [description, SetDescription] = useState ('')
  const [thumbnail, SetThumbnail] = useState ('')
  const [error, setError] = useState('')


const navigate = useNavigate();

const {currentUser} = useContext(UserContext)
const token = currentUser?.token;



useEffect(()=> {
  if(!token){
    navigate('/login')
  }
},[token])

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

const createPost = async (e) => {
  e.preventDefault();

  const postData = new FormData();
  postData.set('title',title)
  postData.set('category',category)
  postData.set('description',description)
  postData.set('thumbnail',thumbnail)


  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts`,postData, {withCredentials:
    true, headers: {Authorization: `Bearer ${token}`}})
    if(response.status === 201)
    return navigate('/')
  } catch (err){
    console.log(err.response.data.message);
    
  }


}



  return (
    <section className='create-post'>
      <div className='container'>
        <h2>Create Post</h2>
        {error && <p className='error'>{error}</p>}
          <form className=' form create-post__form' onSubmit={createPost}>
          <input type="text" placeholder='Title' value={title} onChange={e => SetTitle(e.target.value)} autoFocus />

            <select name='category' value={category} onChange={e => SetCategory(e.target.value)}>
              { 
                 POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
              
              }
             

            </select>
            <ReactQuill modules={modules} formats={formats} value={description} onChange={SetDescription} />
              <input type="file" onChange={e => SetThumbnail(e.target.files[0])} accept='jpg, png, jpeg' />
              <button type='submit' className='btn primary'> create</button>

          </form>

      </div>

    </section>
  )
}

export default CreatePost