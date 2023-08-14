import React from 'react'

const PostDetails = ({post}) => {
  return (
    <div className='w-3/4 bg-white h-max flex justify-center mb-6 flex-col p-6 shadow-lg rounded-lg '>
      <h2 className='text-2xl font-semibold capitalize mb-3'>{post.title}</h2>
      <p className='text-center mb-[14px] p-3 text-lg'>{post.text}</p>
      <div className='flex justify-between'>
        <p>{post.createdAt.slice(0, 10)}</p>
        <p>By: {post.username}</p>
      </div>
    </div>
  )
}

export default PostDetails