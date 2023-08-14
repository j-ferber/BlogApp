import React from 'react'
import { useState } from 'react'
import { useUserContext } from '../../Hooks/useAuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { usePostsContext } from '../../Hooks/usePostsContext'

const NewPost = () => {

  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const { user, dispatch  } = useUserContext()
  const [error, setError] = useState(null)
  const { setError: setPostsError } = usePostsContext()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setPostsError(null)
    const username = user.username
    const response = await axios.post('http://localhost:4000/blogs', { title, text, username }, { validateStatus: () => true, headers: { Authorization: `Bearer ${user.accessToken}` } })
    if (response.status === 400) {
      setError(response.data.error)
    } else if (response.status === 401) {
      console.log(response)
      setPostsError(response.data.error)
      localStorage.removeItem('user')
      dispatch({ type: 'LOGOUT', payload: null })
      navigate('/login')
    } else if (response.status === 200) {
      navigate('/')
    }
  }

  return (
    <div className="flex-1 w-screen bg-gray-300 mt-20 justify-center flex">
      <div className="h-max rounded-xl w-3/4 mt-20 shadow-lg bg-white flex flex-col items-center p-5">
        <form className='w-full h-full flex flex-col items-center'>
          <p className='font-semibold text-3xl mb-4'>Create New Post</p>
          <input type="text" className="inputs" placeholder='Enter post title' value={title} onChange={(e) => setTitle(e.target.value)}/>
          <textarea type="text" className="inputs" placeholder='Enter post text' value={text} onChange={(e) => setText(e.target.value)} />
          <button className="submit" onClick={handleSubmit}>Create</button>
          {error &&
            <div className="error">
              {error}
            </div>
          }
        </form>
      </div>
    </div>
  )
}

export default NewPost