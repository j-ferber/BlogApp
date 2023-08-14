import React, { useState } from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Icons = () => {

  const [hover, setHover] = useState(0)

  return (
    <Link to='/'>
      <button className={hover === 1 ? 'hoveredButton grow fixedIcon bg-white' : 'defaultButton fixedIcon bg-white'} onMouseOver={() => setHover(1)} onMouseOut={() => setHover(0)}>
        {hover === 1 ? 
          <div className='w-full flex items-center relative'>
            <AiOutlineHome className='w-6'/>
            <p className='text-xl ml-[34px] font-semibold absolute fadeIn'>Home</p>
          </div>
          :
          <AiOutlineHome className='w-6' />
        }
      </button>
    </Link>
  )
}

export default Icons