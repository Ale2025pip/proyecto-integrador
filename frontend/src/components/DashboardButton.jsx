import {Link} from 'react-router-dom';
import { ShieldUser } from 'lucide-react';

function DashboardButton({isAdmin}) {
    if(isAdmin){
        return (
            <Link to={"/dashboard"} className="bg-blue-700 hover:bg-blue-500 text-white px-4 py-2 rounded-md flex items-center max-w-30">
                <ShieldUser size={20} className = "inline-block mr-1"/>
                <span>Dashboard</span>
            </Link>
        );
    }
    return <></>;
}

export default DashboardButton;