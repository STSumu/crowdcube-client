import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div className='bg-cream-sage overflow-x-hidden'>
        <Navbar></Navbar>
        <main className='min-h-screen'>
            <Outlet></Outlet>
        </main>
        <Footer></Footer>
        </div>
    );
};

export default Main;