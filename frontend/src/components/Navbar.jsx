import { useAuth } from '../context/AuthContext';
import AuthButtons from "./AuthButtons"
import CartButton from "./CartButton";
import DashboardButton from "./DashboardButton";
import Icon from "./Icon";
import NavbarBase from "./NavbarBase";

function Navbar() {
  const {isAuthenticated, user, logout} = useAuth();
  
  return (
    <nav className="bg-green-600 to-emerald-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo y Navegación */}
          <div className="flex items-center gap-6">
            <Icon />
            <NavbarBase />
          </div>

          {/*Botones de usuario */}
          <div className="flex items-center gap-4">
            <CartButton cartItems={0} isLogin={isAuthenticated} />
            <DashboardButton isAdmin={user?.role === 'admin'} />
            <AuthButtons isLogin={isAuthenticated} logOut={logout} />
          </div>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
