import {Routes, Route} from 'react-router-dom'
import Home from './Components/Home/Home'
import Header from './Components/Header'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import UserPosts from './Components/User Posts/UserPosts'
import { useUserContext } from './Hooks/useAuthContext'
import { Navigate } from 'react-router-dom'
import NewPost from './Components/New Post/NewPost'
import EditPost from './Components/Edit Post/EditPost'

function App() {

  const {user} = useUserContext()

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
        <Route path='/posts' element={user ? <UserPosts /> : <Navigate to='/login' />} />
        <Route path='/newpost' element={user ? <NewPost /> : <Navigate to='/' />} />
        <Route path='/editpost/:id' element={user ? <EditPost /> : <Navigate to='/login' />} />
      </Routes>
    </div>
  )
}

export default App
