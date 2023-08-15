import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { FaTrashAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useUserContext } from '../../Hooks/useAuthContext'
import { usePostsContext } from '../../Hooks/usePostsContext'

const UserPostDetails = ({ post }) => {

  const navigate = useNavigate()
  const { user } = useUserContext()
  const { dispatch } = usePostsContext()
  const { setError } = usePostsContext()
  const { dispatch: userDispatch } = useUserContext()
  
  const handleEdit = () => {
    navigate(`/editpost/${post._id}`)
  }

  const handleDelete = async () => {
    const response = await axios.delete(`http://localhost:4000/blogs/${post._id}`, { validateStatus: () => true, headers: { Authorization: `Bearer ${user.accessToken}` } })
    if (response.status === 200) {
      dispatch({type: 'DELETE_POST', payload: response.data.post})
    } else if (response.status === 401) {
      setError(response.data.error)
      localStorage.removeItem('user')
      userDispatch({type: 'LOGOUT', payload: null})
      navigate('/login')
    }
  }

  return (
    <div className="w-3/4 bg-white h-max flex justify-center mb-6 flex-col p-6 shadow-lg rounded-lg dark:bg-zinc-900 dark:text-white">
      <h2 className='text-2xl font-semibold capitalize mb-3'>{post.title}</h2>
      <p className='text-center mb-[14px] p-3 text-lg'>{post.text}</p>
      <div className="flex justify-between">
        <p>{post.createdAt.slice(0, 10)}</p>
        <div className='flex items-center justify-center'>
          <button className='text-2xl hover:bg-gray-300 hover:rounded-full p-2 transition-all dark:hover:bg-zinc-700' onClick={handleEdit}><BiEdit/></button>
          <button className='text-xl hover:bg-gray-300 hover:rounded-full p-2 transition-all dark:hover:bg-zinc-700' onClick={handleDelete}><FaTrashAlt/></button>
        </div>
      </div>
    </div>
  )
}

export default UserPostDetails