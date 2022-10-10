import { useEffect } from 'react';
import { useContext,useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { MainContext } from '../context/MainContext';

function  StaffRoute ()  {
   const { user } = useContext(MainContext)
   const { checkAuthenticated} = useContext(MainContext)
    /*  const [valid, setValid] = useState(false) */
    const navigate = useNavigate()
  useEffect(async () => {
     const  login = localStorage.getItem("login")
     if(login){
       await checkAuthenticated()
     }
  }, [user])
   useEffect(()=>{
     if(user?.role.staff_type==="admin"){
       navigate("/quan-tri", { replace: true });
    }
    else if(user?.role.staff_type==="storekeeper") {
       navigate("/thu-kho", { replace: true });
    }
    else if(user?.role.staff_type==="driver"){
        navigate("/tai-xe/dat-hang", { replace: true });
    }
  },[user])
  console.log(user)
  return <Outlet />;
};
export default StaffRoute