import { useNavigate, useLocation } from 'react-router-dom'

const useNavigateHook = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const pushQuery = (query) => {

    const newQuery = new URLSearchParams(query).toString()
    navigate(`${pathname}?${newQuery}`)
  }
  
  return { pushQuery, pathname, navigate, search }
}

export default useNavigateHook