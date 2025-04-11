
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  AlertCircle, 
  MapPin, 
  Image, 
  CheckCircle,
  Utensils,
  Package
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FoodType, PerishableType } from "@/types";
import { useUser } from "@/contexts/UserContext";

const DonationForm = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [foodType, setFoodType] = useState<FoodType | "">("");
  const [perishableType, setPerishableType] = useState<PerishableType | "">("");
  const [expiryDate, setExpiryDate] = useState("");
  const [pickupDeadline, setPickupDeadline] = useState("");
  const [address, setAddress] = useState(user?.location?.address || "");
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        
        // In a real app, we would call the AI service to estimate quantity
        setTimeout(() => {
          setQuantity("Approximately 3-4 kg");
          toast({
            title: "AI Estimation Complete",
            description: "We've estimated the quantity based on your image.",
          });
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleNext = () => {
    setFormStep(formStep + 1);
    window.scrollTo(0, 0);
  };
  
  const handleBack = () => {
    setFormStep(formStep - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simple validation
    if (!title || !foodType || !perishableType || !address) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    // Simulating form submission
    setTimeout(() => {
      toast({
        title: "Donation Created",
        description: "Your donation has been successfully posted.",
      });
      navigate("/donor");
    }, 1500);
  };
  
  // If user is not logged in or not a donor, redirect to login
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center bg-gray-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>
                You need to be signed in as a donor to create a donation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center text-center p-4">
                <AlertCircle className="h-12 w-12 text-orange-500 mb-4" />
                <p className="text-gray-700">
                  Please sign in or register as a donor to continue.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link to="/auth">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/auth?register=true&role=donor">
                <Button className="bg-zerowaste hover:bg-zerowaste-600">Register as Donor</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-8">
            <Link to="/donor" className="text-zerowaste-600 hover:underline inline-flex items-center">
              &larr; Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold mt-2">Create Donation</h1>
          </div>
          
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className={`flex flex-col items-center ${formStep >= 1 ? 'text-zerowaste-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${formStep >= 1 ? 'border-zerowaste-600 bg-zerowaste-50' : 'border-gray-300'}`}>
                  <Utensils className="h-5 w-5" />
                </div>
                <span className="text-xs mt-1">Food Details</span>
              </div>
              
              <div className={`flex-1 border-t-2 ${formStep >= 2 ? 'border-zerowaste-600' : 'border-gray-300'}`}></div>
              
              <div className={`flex flex-col items-center ${formStep >= 2 ? 'text-zerowaste-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${formStep >= 2 ? 'border-zerowaste-600 bg-zerowaste-50' : 'border-gray-300'}`}>
                  <Image className="h-5 w-5" />
                </div>
                <span className="text-xs mt-1">Image & Quantity</span>
              </div>
              
              <div className={`flex-1 border-t-2 ${formStep >= 3 ? 'border-zerowaste-600' : 'border-gray-300'}`}></div>
              
              <div className={`flex flex-col items-center ${formStep >= 3 ? 'text-zerowaste-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${formStep >= 3 ? 'border-zerowaste-600 bg-zerowaste-50' : 'border-gray-300'}`}>
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="text-xs mt-1">Pickup Details</span>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <Card className="shadow-sm">
              {formStep === 1 && (
                <>
                  <CardHeader>
                    <CardTitle>Food Information</CardTitle>
                    <CardDescription>
                      Tell us about the food you wish to donate
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="e.g. Fresh Vegetables from Market"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <Textarea
                        placeholder="Describe the food in more detail..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Food Type <span className="text-red-500">*</span>
                        </label>
                        <Select value={foodType} onValueChange={(value) => setFoodType(value as FoodType)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select food type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="veg">Vegetarian</SelectItem>
                            <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                            <SelectItem value="mixed">Mixed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Perishable Type <span className="text-red-500">*</span>
                        </label>
                        <Select value={perishableType} onValueChange={(value) => setPerishableType(value as PerishableType)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select perishable type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="perishable">Perishable</SelectItem>
                            <SelectItem value="non-perishable">Non-Perishable</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Expiry Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          type="date"
                          className="pl-10"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="button" 
                      onClick={handleNext} 
                      className="w-full bg-zerowaste hover:bg-zerowaste-600"
                    >
                      Next: Add Image
                    </Button>
                  </CardFooter>
                </>
              )}
              
              {formStep === 2 && (
                <>
                  <CardHeader>
                    <CardTitle>Image & Quantity</CardTitle>
                    <CardDescription>
                      Upload an image of the food and specify the quantity
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Food Image
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        {imagePreview ? (
                          <div>
                            <img
                              src={imagePreview}
                              alt="Food preview"
                              className="mx-auto max-h-64 rounded-md"
                            />
                            <Button
                              variant="ghost"
                              onClick={() => setImagePreview(null)}
                              className="mt-2 text-red-600 hover:text-red-800 hover:bg-red-50"
                            >
                              Remove Image
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <Image className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="mt-2">
                              <label htmlFor="image-upload" className="cursor-pointer">
                                <span className="mt-2 block text-sm font-medium text-zerowaste-600 hover:underline">
                                  Upload an image
                                </span>
                                <input
                                  id="image-upload"
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleImageChange}
                                />
                                <span className="mt-1 block text-xs text-gray-500">
                                  PNG, JPG, JPEG up to 5MB
                                </span>
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 flex items-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center">
                                <CheckCircle className="h-4 w-4 text-zerowaste-600 mr-1" />
                                <span>AI-powered quantity estimation available</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                Upload an image and our AI will automatically estimate the quantity of food based on the photo.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Quantity <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          placeholder="e.g. 5 kg or 10 portions"
                          className="pl-10"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <Button 
                      type="button" 
                      onClick={handleNext} 
                      className="bg-zerowaste hover:bg-zerowaste-600"
                    >
                      Next: Pickup Details
                    </Button>
                  </CardFooter>
                </>
              )}
              
              {formStep === 3 && (
                <>
                  <CardHeader>
                    <CardTitle>Pickup Details</CardTitle>
                    <CardDescription>
                      Specify where and when the food can be picked up
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Pickup Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          placeholder="Enter your address"
                          className="pl-10"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        The exact address will only be shared with approved recipients
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Pickup Deadline <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input
                            type="date"
                            className="pl-10"
                            value={pickupDeadline.split('T')[0]}
                            onChange={(e) => setPickupDeadline(`${e.target.value}T${pickupDeadline.split('T')[1] || '00:00'}`)}
                            min={new Date().toISOString().split('T')[0]}
                            required
                          />
                        </div>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input
                            type="time"
                            className="pl-10"
                            value={pickupDeadline.split('T')[1] || ''}
                            onChange={(e) => setPickupDeadline(`${pickupDeadline.split('T')[0] || new Date().toISOString().split('T')[0]}T${e.target.value}`)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-zerowaste hover:bg-zerowaste-600"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Creating Donation..." : "Create Donation"}
                    </Button>
                  </CardFooter>
                </>
              )}
            </Card>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DonationForm;
