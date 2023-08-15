import React, { useEffect, useState } from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import axios from 'axios'
import { useUserContext } from '../../Hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import { usePostsContext } from '../../Hooks/usePostsContext'

const PostDetails = ({ post }) => {
  
  const [likes, setLikes] = useState(null)
  const { user } = useUserContext()
  const navigate = useNavigate()
  const { setError } = usePostsContext()
  const { dispatch } = useUserContext()
  
  const handleLike = async () => {
    const response = await axios.post(`https://jotterbackend.onrender.com/blogs/${post._id}`, { username: user.username }, { validateStatus: () => true, headers: { Authorization: `Bearer ${user.accessToken}` } })
    if (response.status === 200) {
      setLikes(response.data.likes)
    } else if (response.status === 401) {
      setError(response.data.error)
      localStorage.removeItem('user')
      dispatch({type: 'LOGOUT', payload: null})
      navigate('/login')
    }
  }

  return (
    <div className='w-3/4 bg-white h-max flex justify-center mb-6 flex-col p-6 shadow-lg rounded-lg dark:bg-zinc-900 dark:text-white'>
      <h2 className='text-2xl font-semibold capitalize mb-3'>{post.title}</h2>
      <p className='text-center mb-[14px] p-3 text-lg'>{post.text}</p>
      <div className='flex justify-end items-center mt-1'>
        {user ?
          <>
            <button className='text-xl mt-[2px] hover:bg-gray-300 hover:rounded-full p-1 transition-all mr-[2px]' onClick={handleLike}>
              {!likes ? post.likes?.includes(user.username) ? <AiFillHeart className='text-red-500' /> : <AiOutlineHeart /> : likes?.includes(user.username) ? <AiFillHeart className='text-red-600' /> : <AiOutlineHeart />}
            </button>
            <p>{!likes ? post.likes.length : likes?.length}</p>
          </>
          : 
          <p className='flex'>Sign in to {<AiOutlineHeart className='mt-[6px] ml-1' />}</p>
        } 
        
      </div>
      <div className='flex justify-between items-center'>
        <p>{post.createdAt.slice(0, 10)}</p>
        <p>By: {post.username}</p>
      </div>
    </div>
  )
}

export default PostDetails