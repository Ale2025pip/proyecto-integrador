import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from '../context/CartContext';

function CartButton({ isLogin }) {
  const { getTotalItems } = useCart();
  const cartItemsCount = getTotalItems();

  if (!isLogin) return null;

  return (
    <Link to="/cart" className="relative text-white flex items-center gap-1">
      <ShoppingCart size={20} />
      <span>Carrito</span>
      {cartItemsCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {cartItemsCount}
        </span>
      )}
    </Link>
  );
}

export default CartButton;