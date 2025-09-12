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
      },
      {
        path:'/myCampaign',
        element:<PrivateRouter><h1>My Campaigns</h1></PrivateRouter>,
      },
      {
        path:'/mydonations',
        element:<PrivateRouter><h1>My Donations</h1></PrivateRouter>,
      },
      {
        path:'/addCampaign',
        element:<PrivateRouter><h1>Add new Campaign</h1></PrivateRouter>,
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
