import { createContext, useEffect, useState } from "react";
import axios from "axios";

import { END_POINT } from './../utils/constant';

export const MainContext = createContext();
const MainProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [user, setUser] = useState(null);
  const [refreshNoti,setRefreshNoti] = useState(1)
  const [dataWarehouse, setDataWarehouse] = useState({
    province: null,
    district: null
  })
  const [metadata, setMetadata] = useState({
    title: 'Tien Kim Thanh Logistics',
    description: 'Webapp of Tien Kim Thanh Logistics for logistic services',
    meta: {
      name: {
        title: 'Tien Kim Thanh Logistics',
        keywords: 'logistic,logistics,trucking,transport,TKTL,Tien Kim Thanh',
      }
    }
  })

  const [order,setOrder] = useState(null)

  const checkAuthenticated = async () => {
    let token = null, refresh = null
    if(!refreshToken)
      refresh = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_REFRESH_NAME)
    if(!accessToken)
      token = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_TOKEN_NAME)
    if(!token) return false
    try {
      const res = await axios.post(`${END_POINT}/auth/verify-token`, { accessToken: token, refreshToken: refresh })
      const { data } = res.data
      setUser(data.user)
      if(data.accessToken)
      setAccessToken(data.accessToken)
      else
      setAccessToken(token)
      setRefreshToken(refresh)
    } catch (error) {
      return false
    }
    return true
  }

  const loginHandle = (_accessToken, _refreshToken, user) => {
    setUser(user);
    setAccessToken(_accessToken);
    setRefreshToken(_refreshToken)
    localStorage.setItem(
      process.env.REACT_APP_LOCALSTORAGE_REFRESH_NAME,
      _refreshToken
    );
    localStorage.setItem(
      "login",
      "login"
    );
    localStorage.setItem(
      process.env.REACT_APP_LOCALSTORAGE_TOKEN_NAME,
      _accessToken
    );
  };
  
  const logoutHandle = async () => {
    console.log(accessToken)
    const refreshToken = localStorage.getItem(
      process.env.REACT_APP_LOCALSTORAGE_REFRESH_NAME
    );
    try {
      await axios.post(
        `${END_POINT}/auth/logout`,
        {
          refreshToken,
        },
        {
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );
      console.log("Log out successfully.")
    } 
    catch (err) {
      console.log(err);
    }
    finally {
      localStorage.removeItem(process.env.REACT_APP_LOCALSTORAGE_TOKEN_NAME);
      localStorage.removeItem(process.env.REACT_APP_LOCALSTORAGE_REFRESH_NAME);
      localStorage.removeItem("login");
      setAccessToken(null);
      setRefreshToken(null)
      setUser(null);
      alert("Đăng xuất thành công");
      window.location.href = "/";
    }
  };
  /* useEffect(()=>{
   checkAuthenticated()
  },[]) */
  return (
    <MainContext.Provider
      value={{
        accessToken,
        user,
        loginHandle,
        logoutHandle,
        checkAuthenticated,
        metadata,
        setMetadata,
        dataWarehouse,
        setDataWarehouse,
        setOrder,
        order,
        refreshNoti,
        setRefreshNoti
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
