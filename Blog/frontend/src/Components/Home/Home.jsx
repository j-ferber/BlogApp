import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { usePostsContext } from '../../Hooks/usePostsContext'
import PostDetails from './PostDetails'
import PostsIcon from '../Common/PostsIcon'
import LogoutIcon from '../Common/LogoutIcon'

const Home = () => {

  const { posts, dispatch } = usePostsContext()
  const [error, setError] = useState('')

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/blogs', {validateStatus: () => true})
        if (response.status === 200) {
          dispatch({ type: 'SET_POSTS', payload: response.data })
        }
        if (response.status === 400) setError(response.data.error)
      } catch (err) {
        console.log(err)
      }
    }
    getPosts()
  }, [])

  return (
    <>
      {posts?.length > 0 && !error && posts.map(post => (
        <PostDetails key={post._id} post={post} />
        ))
      }
      {posts?.length === 0 && error &&
        <div className='mt-12'>
          <p className='font-semibold text-2xl text-red-600'>{error}</p>
        </div>
      }
      <div className='fixed flex flex-col bottom-4 left-4 h-32 justify-between'>
        <LogoutIcon />
        <PostsIcon />
      </div>
    </>
  )
}

export default Home