import { LogOut, LogIn, UserRoundPlus } from "lucide-react";
import {Link } from "react-router-dom";
function AuthButtons({isLogin, logOut}) {
  if(isLogin) {
    //boton logout (solo si estamos logueados)
    return (
      <button onClick={logOut} className= " bg-gray-700 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"> 
        <LogOut size= {20}/> 
        <span className= "pl-2">Log Out</span>
      </button>
    )
  }
  //boton login/register ( solo si no estamos logueado
  return (
   <>
     <Link to={"/login"} className= " bg-gray-700 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center max-w-25"> 
        <LogIn size={20}/>
        <span className="pl-2">Login</span>  
      </Link>
      <Link to={"/register"} className= " bg-green-700 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center max-w-30">
        <UserRoundPlus size={20} /> 
        <span className="pl-2">Register</span>
      </Link>  
    </>
  );
}

export default AuthButtons;