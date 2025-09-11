import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './layouts/Main';
import Home from './pages/Home';
import AuthProvider from './provider/AuthProvider';
import PrivateRouter from './router/PrivateRouter';
import PrivateLayout from './layouts/PrivateLayout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';


const router=createBrowserRouter([
  {
    path:'/',
    element:<Main></Main>,
    children:[
      {
        path:'/',
        element:<Home></Home>,
      }
    ]
  },{
    path:'/auth',
    element:<PrivateLayout></PrivateLayout>,
    children:[
      {
        path:'/auth/login',
        element:<Login></Login>,
      },
      {
        path:'/auth/signup',
        element:<SignUp></SignUp>,
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}>
    </RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
