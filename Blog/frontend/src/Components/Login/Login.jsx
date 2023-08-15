import React, { useState } from 'react'
import HomeIcon from '../Common/HomeIcon'
import { useLogin } from '../../Hooks/useLogin'
import { usePostsContext } from '../../Hooks/usePostsContext'
import ThemeSwitch from '../Common/ThemeSwitch'

const Login = () => {

  const { login, error } = useLogin()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {setError, error: postsError} = usePostsContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    login(username, password)
  }

  return (
    <>
      <form className="h-max rounded-xl w-2/5 mt-28 shadow-lg bg-white flex flex-col items-center p-5 dark:bg-zinc-900 dark:text-white" onSubmit={handleSubmit}>
        <p className='text-4xl font-semibold mb-6'>Login</p>
        <input type="text" placeholder='Enter username' className='inputs' onChange={(e) => setUsername(e.target.value)} value={username}/>
        <input type="password" placeholder='Enter password' className='inputs mb-5' onChange={(e) => setPassword(e.target.value)} value={password} />
        <button type='submit' className='submit'>Login</button>
        {error &&
          <div className='error'>{error}</div>
        }
        {postsError &&
          <div className="error">{postsError}</div>
        }
      </form>
      <HomeIcon />
      <ThemeSwitch />
    </>
  )
}

export default Login