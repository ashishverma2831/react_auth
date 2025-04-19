import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Auth from './utils/Auth'


const router = createBrowserRouter([
  {path:'/', index:true, element: <Login />},
  {path:'/home', element: (
    <Auth>
      <Home />
    </Auth>
  )},
  {path:'/register', element: <Register />},
  {path:'/forgot-password', element: <ForgotPassword />},
  {path:'*', element: <h1>404 Not Found</h1>}
])

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App