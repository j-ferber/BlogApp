import React from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../Hooks/useAuthContext'
import { AiOutlinePlus } from 'react-icons/ai'

const Header = () => {

  const { user } = useUserContext()

  return (
    <header className='bg-white h-20 w-screen flex items-center shadow-xl justify-between fixed top-0'>
      <p className='ml-6 border-black border-4 px-2 pb-2 font-bold text-4xl'><Link to='/'>Blogger.</Link></p>
      {!user ? 
        <div className='flex mr-6 text-xl items-center'>
          <p className='mr-6 hover:underline'><Link to='/login'>Login</Link></p>
          <p className='mr-2 hover:underline'><Link to='/signup'>Signup</Link></p>
        </div> :
        <div className='flex mr-6 text-xl items-center'>
          <p className='mr-6 hover:underline text-lg'>{user.username}</p>
          <Link to='/newpost'><button className='hover:bg-gray-300 p-2 rounded-full transition-all'><AiOutlinePlus /></button></Link>
       </div>
      }
      
    </header>
  )
}

export default Header