import { Navigate, Outlet } from "react-router-dom";
import Navbar from '../components/navbar/Navbar'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { BsPersonFillCheck, BsPeopleFill } from 'react-icons/bs';
import { HiUserGroup } from 'react-icons/hi2';
import { BiSolidCalendarEvent } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
const Layout = ({children}) => {
const [token, setToken] = useState(null)

const  memberToken = JSON.parse(localStorage.getItem('token'));
useEffect(() => {
  setToken(memberToken);
}, [])

const dispatch = useDispatch();
  if (!memberToken) {
    return <Navigate to={'/'} replace />;
  }
  return (
  
  
  <div className="h-screen flex flex-col bg-base-300 overflow-auto w-full" >
      <div className="drawer  bg-base-300" >
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col bg-base-300">
               
        
          <Navbar />
            <div className="container mx-auto px-0  lg:px-3">
              {children}
              <Outlet />
            </div>
   

       
                    
                </div>
                <div className="drawer-side z-10 h-full">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        
                    <ul className="menu p-4 w-80 min-h-full bg-base-200">

   
<li>
              <div className=" justify-center items-center gap-1 flex flex-col">
                <img src="/images/logo.png" alt="" className='max-h-12 ' />
                <h2 className="text-accent text-md font-semibold">
                Members
Management System
                </h2>


              </div>
</li>


            <li>
              <Link to={'/home'} className=' text-accent btn bg-transparent  hover:bg-base-200   border-0 flex items-center  justify-start text-md font-semibold' >
            <BiSolidCalendarEvent />   HOME
          </Link></li>
            
                    </ul>
                </div>
    </div > </div>
  
  );
}

export default Layout

