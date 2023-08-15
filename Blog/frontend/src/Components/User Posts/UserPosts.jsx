import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useUserContext } from '../../Hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import { usePostsContext } from '../../Hooks/usePostsContext'
import UserPostDetails from './UserPostDetails'
import HomeIcon from '../Common/HomeIcon'
import LogoutIcon from '../Common/LogoutIcon'
import ThemeSwitch from '../Common/ThemeSwitch'

const UserPosts = () => {

  const { user, dispatch } = useUserContext()
  const navigate = useNavigate()
  const { setError, dispatch: postsDispatch, posts } = usePostsContext()
  const [postsError, setPostsError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true)
      const response = await axios.get('https://jotterbackend.onrender.com/blogs/user', { validateStatus: () => true, headers: {Authorization: `Bearer ${user.accessToken}` } })
      if (response.status === 401) {
        setError(response.data.error)
        localStorage.removeItem('user')
        dispatch({ type: 'LOGOUT', payload: null })
        setLoading(false)
        navigate('/login')
      } else if (response.status === 200) {
        setError(null)
        postsDispatch({ type: 'SET_POSTS', payload: response.data.posts })
        setLoading(false)
      } else if (response.status === 400) {
        setPostsError(response.data.error)
        postsDispatch({ type: 'SET_POSTS', payload: [] })
        setLoading(false)
      }
    }
    postsDispatch({ type: 'SET_POSTS', payload: [] })
    getPosts()
  }, [])

  return (
    <>
      {posts?.length > 0 && posts.map(post => (
          <UserPostDetails key={post._id} post={post}/>
        ))
      }
      {postsError &&
        <div className="text-2xl mt-12 text-center">
          <p className='text-red-600 font-semibold'>{postsError}</p>
          <p>Click the <strong>+</strong> in the top right to add your first post.</p>
        </div>
      }
      {posts?.length === 0 && !postsError && !loading &&
        <div className="text-2xl mt-12 text-center">
          <p className='text-red-600 font-semibold'>No posts found.</p>
          <p>Click the <strong>+</strong> in the top right to add your first post.</p>
        </div>
      }
      <div className='fixed flex flex-col bottom-4 left-4 h-32 justify-between'>
        <LogoutIcon />
        <HomeIcon />
      </div>
      <ThemeSwitch />
    </>
  )
}

export default UserPosts