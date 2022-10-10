import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { MainContext } from '../context/MainContext';

function ProtectedRoute() {
  const { checkAuthenticated, user } = useContext(MainContext)
/*   const [valid, setValid] = useState(false) */
  const navigate = useNavigate()
  useEffect(async () => {
   /*  const check = await checkAuthenticated()
    setValid(!!check) */
    const  login = localStorage.getItem("login")
    if(login){
    navigate("/")
    }
  }, [])
  if ( user && user.role.customer_type) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
export default ProtectedRoute