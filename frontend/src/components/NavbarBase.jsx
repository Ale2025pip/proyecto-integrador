import { Link } from "react-router-dom";

function NavbarBase() {
  return (
    <div className="flex gap-6">
      <Link 
        to={"/"} 
        className="text-white hover:text-green-200 font-medium transition-colors"
      >
        Home
      </Link>
      <Link 
        to={"/contact"} 
        className="text-white hover:text-green-200 font-medium transition-colors"
      >
        Contact
      </Link>
    </div>
  );
}

export default NavbarBase;