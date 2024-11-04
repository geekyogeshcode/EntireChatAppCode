import './App.css'
import Home from './components/Home'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

function App() {

  const router=createBrowserRouter([
    {
      path:"/home",
      element:<Home />
    },
    {
      path:'/login',
      element:<LoginPage />
    },
    {
      path:"/",
      element:<RegisterPage />
    }
  ])

  return (
    <>

     <div className="App">
        <RouterProvider router={router} />
     </div>
    </>
  )
}

export default App
