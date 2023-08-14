import React, { useState } from 'react'
import { CiViewList } from 'react-icons/ci'
import { Link } from 'react-router-dom'

const Icons = () => {

  const [hover, setHover] = useState(0)

  return (
    <Link to='/posts'>
      <button className={hover === 1 ? 'hoveredButton grow bg-white' : 'defaultButton'} onMouseOver={() => setHover(1)} onMouseOut={() => setHover(0)}>
        {hover === 1 ? 
          <div className='w-full flex items-center relative'>
            <CiViewList className='w-6'/>
            <p className='text-xl ml-[36px] font-semibold absolute fadeIn mb-[2px]'>Posts</p>
          </div>
          :
          <CiViewList className='w-6' />
        }
      </button>
    </Link>
  )
}

export default Icons