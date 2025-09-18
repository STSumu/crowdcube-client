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
import Error from './pages/Error';
import AddCampaign from './pages/AddCampaign';
import AllCampaign from './pages/AllCampaign';
import 'animate.css';
import CampaignDetails from './pages/CampaignDetails';
import MyCampaigns from './pages/MyCampaigns';
import UpdateCampaign from './pages/UpdateCampaign';
import MyDonations from './pages/MyDonations';


const router=createBrowserRouter([
  {
    path:'/',
    element:<Main></Main>,
    errorElement:<Error></Error>,
    children:[
      {
        path:'/',
        element:<Home></Home>,
      },
      {
        path:'/campaigns',
        element:<PrivateRouter><AllCampaign></AllCampaign></PrivateRouter>,
      },
      {
        path:'/addCampaign',
        element:<PrivateRouter><AddCampaign></AddCampaign></PrivateRouter>,
      },
      {
        path:'/myDonations',
        element:<PrivateRouter><MyDonations></MyDonations></PrivateRouter>,
      },
      {
        path:'/myCampaign',
        element:<PrivateRouter><MyCampaigns></MyCampaigns></PrivateRouter>
      },
      {
        path:'/updateCampaign/:id',
        element:<PrivateRouter><UpdateCampaign></UpdateCampaign></PrivateRouter>,
        loader:({params})=>fetch(`http://localhost:5000/campaigns/${params.id}`)
      },
      {
        path:'/campaign/:campId',
        element:<PrivateRouter><CampaignDetails></CampaignDetails></PrivateRouter>,
        loader:({params})=>fetch(`http://localhost:5000/campaigns/${params.campId}`)
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
