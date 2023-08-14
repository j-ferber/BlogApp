import React, { useState } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../Hooks/useAuthContext'

const Icons = () => {

  const [hover, setHover] = useState(0)
  const { user } = useUserContext()
  const {dispatch} = useUserContext()

  const handleLogout = () => {
    localStorage.removeItem('user')
    dispatch({type: 'LOGOUT', payload: null})
  }

  return (
    <Link to='/login'>
      <button className={hover === 2 ? 'hoveredButton grow bg-red-500 text-white transition-all' : 'defaultButton'} onMouseOver={() => setHover(2)} onMouseOut={() => setHover(0)} onClick={user ? handleLogout : null} >
        {hover === 2 ? 
          <div className='w-full flex items-center relative'>
            <BiLogOut className='w-6'/>
            <p className='text-xl ml-[30px] font-semibold absolute fadeIn mb-[1px]'>Logout</p>
          </div>
          :
          <BiLogOut className='w-6' />
        }
      </button>
    </Link>
  )
}

export default Icons