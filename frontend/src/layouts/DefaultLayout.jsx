import Header from "../components/Header";
import Footer from "../components/Footer";
import {Outlet} from 'react-router-dom'
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/MainContext";
import { useNavigate } from 'react-router-dom';
function DefaultLayout() {
  const { checkAuthenticated} = useContext(MainContext)
  const navigate = useNavigate()
   const { user } = useContext(MainContext)
  useEffect(async () => {
     const  login = localStorage.getItem("login")
     if(login){
       await checkAuthenticated()
     }
  }, [])
  useEffect(()=>{
      if(user?.role.staff_type==="driver"){
        navigate("/tai-xe/dat-hang", { replace: true });
    }
  },[])
    return ( 
        <>
        <Header />
        <Outlet />
        <Footer />
        </>
     );
}

export default DefaultLayout;