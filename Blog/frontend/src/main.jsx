import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PostsContextProvider } from './Context/postsContext.jsx'
import { UserContextProvider } from './Context/authContext.jsx'
import { ThemeContextProvider } from './Context/themeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <PostsContextProvider>
        <ThemeContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/*' element={<App />} />
            </Routes>
          </BrowserRouter>
        </ThemeContextProvider>
      </PostsContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
