import {jwtDecode} from 'jwt-decode';
import { Navigate } from 'react-router';

export const Auth = ({children}) => {
  
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
   isLoggedIn() ? children : <Navigate to="/" replace /> 
  )
}

export const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  if(!token) {
    return false;
  }
  const {exp} = jwtDecode(token);
  console.log(exp,Date.now());
  if(exp * 1000 > Date.now()) {
    return true;
  }else{
    localStorage.clear();
    return false;
  }
}

