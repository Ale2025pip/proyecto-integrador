import {Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard';
import Cart from './pages/Cart';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Checkout from './pages/Checkout';
import MisPedidos from './pages/MisPedidos';
function App() {
  const [ isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const cartItem = 4;

  useEffect(()=>{
    console.log(isLogin)
  },[isLogin]);

  function login(){
    setIsLogin(true)
  }
  function loginAsAdmin(){
    login()
    setIsAdmin(true)
  }
  function logOut(){
    setIsAdmin(false)
    setIsLogin(false)
  }

  return (
    <AuthProvider>
      <CartProvider>
        <Navbar isLogin={isLogin} isAdmin={isAdmin} logOut={logOut} cartItem={cartItem}/>
          <Routes>
            <Route path ="/" element={<Home/>}/>
            <Route path ="/login" element={<Login/>}/>
            <Route path ="/register" element={<Register/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path ="/*" element={<h1>404</h1>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/mis-pedidos" element={<MisPedidos/>}/>
          </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
