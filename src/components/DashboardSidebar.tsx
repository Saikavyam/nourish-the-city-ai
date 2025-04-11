
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Gift, 
  Clock, 
  Map, 
  UserCircle, 
  Settings, 
  LogOut,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser, UserRole } from "@/contexts/UserContext";

interface SidebarNavItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarNavItem = ({ href, icon, label, active, onClick }: SidebarNavItemProps) => {
  return (
    <li>
      <Link
        to={href}
        className={cn(
          "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
          active
            ? "bg-zerowaste text-white hover:bg-zerowaste-600"
            : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
        )}
        onClick={onClick}
      >
        <span className="mr-3">{icon}</span>
        <span>{label}</span>
      </Link>
    </li>
  );
};

interface DashboardSidebarProps {
  userRole: UserRole;
}

const DashboardSidebar = ({ userRole }: DashboardSidebarProps) => {
  const { logout } = useUser();
  const location = useLocation();
  
  const getBasePath = () => {
    switch (userRole) {
      case "donor":
        return "/donor";
      case "recipient":
      case "volunteer":
        return "/recipient";
      case "admin":
        return "/admin";
      default:
        return "/";
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const renderDonorLinks = () => (
    <>
      <SidebarNavItem 
        href="/donor" 
        icon={<LayoutDashboard size={18} />} 
        label="Overview" 
        active={isActive("/donor")} 
      />
      <SidebarNavItem 
        href="/donation/new" 
        icon={<Gift size={18} />} 
        label="Create Donation" 
        active={isActive("/donation/new")} 
      />
      <SidebarNavItem 
        href="/donor/history" 
        icon={<Clock size={18} />} 
        label="Donation History" 
        active={isActive("/donor/history")} 
      />
    </>
  );

  const renderRecipientLinks = () => (
    <>
      <SidebarNavItem 
        href="/recipient" 
        icon={<LayoutDashboard size={18} />} 
        label="Available Food" 
        active={isActive("/recipient")} 
      />
      <SidebarNavItem 
        href="/recipient/my-pickups" 
        icon={<Clock size={18} />} 
        label="My Pickups" 
        active={isActive("/recipient/my-pickups")} 
      />
    </>
  );

  const renderAdminLinks = () => (
    <>
      <SidebarNavItem 
        href="/admin" 
        icon={<LayoutDashboard size={18} />} 
        label="Dashboard" 
        active={isActive("/admin")} 
      />
      <SidebarNavItem 
        href="/admin/users" 
        icon={<UserCircle size={18} />} 
        label="User Management" 
        active={isActive("/admin/users")} 
      />
      <SidebarNavItem 
        href="/admin/donations" 
        icon={<Gift size={18} />} 
        label="Donation Management" 
        active={isActive("/admin/donations")} 
      />
    </>
  );

  return (
    <aside className="w-64 border-r border-gray-100 h-full bg-white">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-100">
          <Link to="/" className="flex items-center">
            <div className="h-8 w-8 mr-2 rounded-md bg-zerowaste flex items-center justify-center">
              <span className="text-white font-bold text-xl">Z</span>
            </div>
            <span className="text-xl font-bold text-zerowaste-600">ZeroWaste</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-2 py-4">
          <ul className="space-y-1">
            {userRole === "donor" && renderDonorLinks()}
            {(userRole === "recipient" || userRole === "volunteer") && renderRecipientLinks()}
            {userRole === "admin" && renderAdminLinks()}
            
            <SidebarNavItem 
              href="/map" 
              icon={<Map size={18} />} 
              label="Map View" 
              active={isActive("/map")} 
            />
            
            <SidebarNavItem 
              href={`${getBasePath()}/profile`} 
              icon={<UserCircle size={18} />} 
              label="My Profile" 
              active={isActive(`${getBasePath()}/profile`)} 
            />
            
            <SidebarNavItem 
              href={`${getBasePath()}/settings`} 
              icon={<Settings size={18} />} 
              label="Settings" 
              active={isActive(`${getBasePath()}/settings`)} 
            />
          </ul>
        </nav>
        
        <div className="p-2 mt-auto border-t border-gray-100">
          <ul className="space-y-1">
            <SidebarNavItem 
              href="/" 
              icon={<Home size={18} />} 
              label="Back to Home" 
            />
            <SidebarNavItem 
              href="#" 
              icon={<LogOut size={18} />} 
              label="Sign Out" 
              onClick={logout}
            />
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
