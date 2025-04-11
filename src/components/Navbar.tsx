
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { useUser } from "@/contexts/UserContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getDashboardLink = () => {
    if (!user) return "/";
    
    switch (user.role) {
      case "donor":
        return "/donor";
      case "recipient":
        return "/recipient";
      case "admin":
        return "/admin";
      case "volunteer":
        return "/recipient"; // Volunteers use recipient dashboard
      default:
        return "/";
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="h-8 w-8 mr-2 rounded-md bg-zerowaste flex items-center justify-center">
              <span className="text-white font-bold text-xl">Z</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-zerowaste-600 to-teal-600 bg-clip-text text-transparent">
              ZeroWaste
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/" className="px-3 py-1 hover:text-zerowaste-600 transition-colors">
            Home
          </Link>
          <Link to="/map" className="px-3 py-1 hover:text-zerowaste-600 transition-colors">
            Map
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to={getDashboardLink()} className="px-3 py-1 hover:text-zerowaste-600 transition-colors">
                Dashboard
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={getDashboardLink()} className="cursor-pointer w-full flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/auth" className="px-3 py-1 hover:text-zerowaste-600 transition-colors">
                Sign In
              </Link>
              <Link to="/auth?register=true">
                <Button variant="default" className="bg-zerowaste hover:bg-zerowaste-700">Sign Up</Button>
              </Link>
            </>
          )}
        </nav>
        
        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-2 px-4 bg-white border-t border-gray-100">
          <nav className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="py-2 hover:text-zerowaste-600 transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/map" 
              className="py-2 hover:text-zerowaste-600 transition-colors"
              onClick={toggleMenu}
            >
              Map
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to={getDashboardLink()} 
                  className="py-2 hover:text-zerowaste-600 transition-colors"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="py-2 text-left text-red-600 hover:text-red-800 transition-colors"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/auth" 
                  className="py-2 hover:text-zerowaste-600 transition-colors"
                  onClick={toggleMenu}
                >
                  Sign In
                </Link>
                <Link 
                  to="/auth?register=true" 
                  className="py-2 hover:text-zerowaste-600 transition-colors"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
