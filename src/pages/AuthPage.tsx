
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { 
  User, 
  Mail, 
  Lock, 
  Building, 
  MapPin,
  Store,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

import { useUser, UserRole } from "@/contexts/UserContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AuthPage = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Determine if register tab should be active based on URL params
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get("register") === "true" ? "register" : "login";
  const defaultRole = queryParams.get("role") as UserRole || null;
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Register form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>(defaultRole || null);
  const [organization, setOrganization] = useState("");
  const [address, setAddress] = useState("");
  
  useEffect(() => {
    // Update active tab if URL params change
    if (queryParams.get("register") === "true") {
      setActiveTab("register");
    } else {
      setActiveTab("login");
    }
    
    // Update default role if URL params change
    if (queryParams.get("role")) {
      setRole(queryParams.get("role") as UserRole);
    }
  }, [location.search]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating login process
    setTimeout(() => {
      // Simple validation
      if (!loginEmail || !loginPassword) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Mock login success
      login({
        id: "user123",
        name: "John Doe",
        email: loginEmail,
        role: "donor", // Default role
        verified: true,
      });
      
      toast({
        title: "Success",
        description: "You have been successfully logged in",
      });
      
      // Redirect to appropriate dashboard
      navigate("/donor");
      setIsLoading(false);
    }, 1500);
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating registration process
    setTimeout(() => {
      // Simple validation
      if (!name || !email || !password || !confirmPassword || !role) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      if (password !== confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Mock registration success
      login({
        id: "user123",
        name: name,
        email: email,
        role: role,
        verified: false,
        organization: organization || undefined,
      });
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created and is pending verification",
      });
      
      // Redirect to appropriate dashboard
      switch (role) {
        case "donor":
          navigate("/donor");
          break;
        case "recipient":
        case "volunteer":
          navigate("/recipient");
          break;
        default:
          navigate("/");
      }
      
      setIsLoading(false);
    }, 1500);
  };
  
  const getRoleIcon = (roleType: string) => {
    switch (roleType) {
      case "donor":
        return <Store className="h-5 w-5 mr-2" />;
      case "recipient":
        return <Building className="h-5 w-5 mr-2" />;
      case "volunteer":
        return <Users className="h-5 w-5 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container max-w-md mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Sign In</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          type="email"
                          placeholder="Email"
                          className="pl-10"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          type="password"
                          placeholder="Password"
                          className="pl-10"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                        />
                      </div>
                      <div className="text-right">
                        <a href="#" className="text-sm text-zerowaste-600 hover:underline">
                          Forgot password?
                        </a>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col">
                    <Button 
                      type="submit" 
                      className="w-full bg-zerowaste hover:bg-zerowaste-600"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Create an Account</CardTitle>
                  <CardDescription>
                    Join ZeroWaste and help us reduce food waste
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleRegister}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          placeholder="Full Name"
                          className="pl-10"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          type="email"
                          placeholder="Email"
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          type="password"
                          placeholder="Password"
                          className="pl-10"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          type="password"
                          placeholder="Confirm Password"
                          className="pl-10"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        I am registering as:
                      </label>
                      <Select value={role || ""} onValueChange={(value) => setRole(value as UserRole)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="donor" className="flex items-center">
                            <div className="flex items-center">
                              {getRoleIcon("donor")}
                              <span>Food Donor (Restaurant, Household, Event)</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="recipient">
                            <div className="flex items-center">
                              {getRoleIcon("recipient")}
                              <span>Food Recipient (NGO, Shelter, Individual)</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="volunteer">
                            <div className="flex items-center">
                              {getRoleIcon("volunteer")}
                              <span>Volunteer</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {(role === "donor" || role === "recipient") && (
                      <div className="space-y-2">
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input
                            placeholder={role === "donor" ? "Business/Organization Name (Optional)" : "Organization Name (Optional)"}
                            className="pl-10"
                            value={organization}
                            onChange={(e) => setOrganization(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          placeholder="Address"
                          className="pl-10"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-zerowaste hover:bg-zerowaste-600"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                    
                    <div className="text-center text-sm text-gray-500">
                      By signing up, you agree to our{" "}
                      <a href="#" className="text-zerowaste-600 hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-zerowaste-600 hover:underline">
                        Privacy Policy
                      </a>
                    </div>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
