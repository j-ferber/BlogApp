import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useUserContext } from '../../Hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import { usePostsContext } from '../../Hooks/usePostsContext'

const EditPost = () => {

  const { id } = useParams()
  const { user } = useUserContext()
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const navigate = useNavigate()
  const { setError } = usePostsContext()
  const { dispatch } = useUserContext()
  const [fetchError, setFetchError] = useState(null)

  const handleSubmit = async (e) => {
    setFetchError(null)
    e.preventDefault()
    const response = await axios.patch(`http://localhost:4000/blogs/${id}`, { title, text }, { validateStatus: () => true, headers: { Authorization: `Bearer ${user.accessToken}` } })
    if (response.status === 401) {
      setError(response.data.error)
      localStorage.removeItem('user')
      dispatch({type: 'LOGOUT', payload: null})
      navigate('/login')
    } else if (response.status === 400) {
      setFetchError(response.data.error)
    } else if (response.status === 200) {
      navigate('/')
    }
  }
   
  useEffect(() => {
    const getEditPost = async () => {
      setFetchError(null)
      const response = await axios.get(`http://localhost:4000/blogs/${id}`, { validateStatus: () => true, headers: { Authorization: `Bearer ${user.accessToken}` } })
      if (response.status === 200) {
        setTitle(response.data.post.title)
        setText(response.data.post.text)
      } else if (response.status === 401) {
        setError(response.data.error)
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT', payload: null})
        navigate('/login')
      } else if (response.status === 400) {
        setFetchError(response.data.error)
      }
    }

    getEditPost()
  }, [])

  return (
    <div className="flex-1 bg-gray-300 flex w-screen mt-20 justify-center">
      <form className='h-max rounded-xl w-3/4 mt-20 shadow-lg bg-white flex flex-col items-center p-5'>
        <h2 className='text-4xl font-semibold mb-6 mt-1'>Edit Post</h2>
        <input type="text" className="inputs" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter title'/>
        <textarea type="text" className="inputs" value={text} onChange={(e) => setText(e.target.value)} placeholder='Enter text'/>
        <button type='submit' onClick={handleSubmit} className='submit'>Update</button>
        {fetchError && 
          <div className="error">{fetchError}</div>
        }
      </form>
    </div>
  )
}

export default EditPost