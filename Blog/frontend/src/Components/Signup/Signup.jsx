import React, { useState } from 'react'
import HomeIcon from '../Common/HomeIcon'
import { useSignup } from '../../Hooks/useSignup'
import ThemeSwitch from '../Common/ThemeSwitch'

const Signup = () => {

  const { signup, error, loading } = useSignup()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    signup(username, password)
  }

  return (
    <>
      <form className="h-max rounded-xl w-2/5 mt-28 shadow-lg bg-white flex flex-col items-center p-5 dark:bg-zinc-900 dark:text-white max-md:w-3/5 max-md:mt-20 max-sm:w-4/5" onSubmit={handleSubmit}>
        <p className='text-4xl font-semibold mb-6'>Signup</p>
        <input type="text" placeholder='Enter username' className='inputs' value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input type="password" placeholder='Enter password' className='inputs mb-5' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit' className='submit'>Signup</button>
        <p className='mt-3 text-lg text-[#9aa1ac]'>After signing up, you will need to enter login details again.</p>
        {error &&
          <div className="error">
            {error}
          </div>
        }
      </form>
      <HomeIcon />
      <ThemeSwitch />
    </>
  )
}

export default Signup