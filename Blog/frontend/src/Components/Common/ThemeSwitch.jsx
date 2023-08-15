import React, { useEffect } from 'react'
import {BsSun, BsMoonStars} from 'react-icons/bs'
import { useThemeContext } from '../../Hooks/useThemeContex'

const ThemeSwitch = () => {
  const { theme, setTheme } = useThemeContext()
  
  const handleClick = () => {
    setTheme(!theme)
  }

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme))
  }, [theme])

  return (
    <button className='defaultButton fixedRight hover:bg-yellow-300 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950 transition-all' onClick={handleClick}>
      {theme ? 
        <BsMoonStars className='fadeIn'/>
        :
        <BsSun className='fadeIn' />
      }
    </button>
  )
}

export default ThemeSwitch