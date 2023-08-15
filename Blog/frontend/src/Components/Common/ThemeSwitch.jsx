import React from 'react'
import { useState } from 'react'
import {BsSun, BsMoonStars} from 'react-icons/bs'
import { useThemeContext } from '../../Hooks/useThemeContex'

const ThemeSwitch = () => {
  const {theme, setTheme} = useThemeContext()

  return (
    <button className='defaultButton fixedRight hover:bg-yellow-300 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950 transition-all' onClick={() => setTheme(!theme)}>
      {theme ? 
        <BsMoonStars className='fadeIn'/>
        :
        <BsSun className='fadeIn' />
      }
    </button>
  )
}

export default ThemeSwitch