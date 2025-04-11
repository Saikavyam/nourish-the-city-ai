
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Package, 
  AlertCircle,
  CheckCircle,
  Tag,
  ArrowRight,
  Phone,
  Mail
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockDonations, getFoodTypeLabel, getPerishableTypeLabel, getStatusColor } from "@/data/mockData";
import { useUser } from "@/contexts/UserContext";

const DonationDetail = () => {
  const { id } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [donation, setDonation] = useState(mockDonations.find(d => d.id === id));
  const [isAccepting, setIsAccepting] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  
  useEffect(() => {
    // In a real app, we would fetch the donation details here
    if (!donation) {
      toast({
        title: "Error",
        description: "Donation not found",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [donation, navigate]);
  
  if (!donation) {
    return <div>Loading...</div>;
  }
  
  const isExpired = new Date(donation.expiry) < new Date();
  const isRecipient = user?.role === "recipient" || user?.role === "volunteer";
  const isDonor = user?.role === "donor";
  const isOwner = isDonor && user?.id === donation.donorId;
  const canAcceptDonation = isRecipient && donation.status === "pending" && !isExpired;
  
  const handleAcceptDonation = () => {
    setIsAccepting(true);
    
    // Simulating API request
    setTimeout(() => {
      const updatedDonation = {
        ...donation,
        status: "accepted",
        recipientId: user?.id || "",
        recipientName: user?.name || "",
      };
      
      setDonation(updatedDonation);
      toast({
        title: "Success",
        description: "You have successfully accepted this donation. Contact the donor to arrange pickup.",
      });
      
      setIsAccepting(false);
    }, 1000);
  };
  
  const handleCompleteDonation = () => {
    setIsCompleting(true);
    
    // Simulating API request
    setTimeout(() => {
      const updatedDonation = {
        ...donation,
        status: "picked",
      };
      
      setDonation(updatedDonation);
      toast({
        title: "Success",
        description: "Donation marked as picked up. Thank you!",
      });
      
      setIsCompleting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link to="/map" className="text-zerowaste-600 hover:underline inline-flex items-center mb-6">
            &larr; Back to Map
          </Link>
          
          {isExpired && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-red-800">This donation has expired</h3>
                <p className="text-sm text-red-700 mt-1">
                  The expiry date has passed. This donation is no longer available for pickup.
                </p>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column: Donation image and map */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <div className="relative">
                  <img
                    src={donation.image || "/placeholder.svg"}
                    alt={donation.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={`${getStatusColor(donation.status)}`}>
                      {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-2">{donation.title}</h1>
                  <p className="text-gray-700 mb-4">{donation.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center">
                      <Tag className="h-5 w-5 mr-2 text-gray-500" />
                      <span>{getFoodTypeLabel(donation.foodType)}</span>
                    </div>
                    <div className="flex items-center">
                      <Package className="h-5 w-5 mr-2 text-gray-500" />
                      <span>{donation.quantity}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                      <span>Expires: {new Date(donation.expiry).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-gray-500" />
                      <span>
                        Pickup by: {new Date(donation.pickupDeadline).toLocaleDateString()} {new Date(donation.pickupDeadline).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center border-t border-gray-100 pt-4">
                    <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                    <span>{donation.location.address}</span>
                  </div>
                </div>
              </div>
              
              {/* Map preview */}
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Location</h2>
                  <div className="h-64 bg-gray-100 rounded-md overflow-hidden">
                    {/* This would be a real map in a production app */}
                    <div 
                      className="w-full h-full bg-[#e0e9e0]"
                      style={{
                        backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l+4caf50(${donation.location.lng},${donation.location.lat})/${donation.location.lng},${donation.location.lat},14/800x600?access_token=placeholder')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Exact location will be shared after accepting the donation.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right column: Donor info and actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Posted by</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">{donation.donorName}</h3>
                      <p className="text-sm text-gray-500">Verified Donor</p>
                    </div>
                  </div>
                  
                  {(isOwner || (donation.status !== "pending" && isRecipient)) && (
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">donor@example.com</span>
                      </div>
                    </div>
                  )}
                </CardContent>
                
                {donation.recipientName && donation.status !== "pending" && (
                  <div>
                    <div className="border-t border-gray-100 my-2"></div>
                    <CardContent>
                      <h3 className="font-medium mb-2">Recipient</h3>
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="ml-3">
                          <p>{donation.recipientName}</p>
                          <p className="text-sm text-gray-500">Verified Recipient</p>
                        </div>
                      </div>
                      
                      {(isDonor && isOwner) && (
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm">+1 (555) 987-6543</span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm">recipient@example.com</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </div>
                )}
              </Card>
              
              {/* Action buttons based on user role and donation status */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!user ? (
                    <Link to="/auth" className="w-full">
                      <Button className="w-full">Sign In to Interact</Button>
                    </Link>
                  ) : isOwner ? (
                    // Donor actions
                    <>
                      {donation.status === "pending" && (
                        <Button className="w-full" variant="outline">
                          Edit Donation
                        </Button>
                      )}
                      
                      {donation.status === "accepted" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              className="w-full bg-orange-500 hover:bg-orange-600"
                            >
                              Mark as Picked Up
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Mark Donation as Picked Up</DialogTitle>
                              <DialogDescription>
                                Confirm that the recipient has collected the donation.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <p>This will update the status of the donation to "Picked Up". Are you sure?</p>
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button 
                                onClick={handleCompleteDonation}
                                disabled={isCompleting}
                                className="bg-zerowaste hover:bg-zerowaste-600"
                              >
                                {isCompleting ? "Processing..." : "Confirm Pickup"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                      
                      {donation.status === "pending" && (
                        <Button variant="outline" className="w-full text-red-600 hover:text-red-800 hover:bg-red-50 border-red-200">
                          Cancel Donation
                        </Button>
                      )}
                    </>
                  ) : isRecipient ? (
                    // Recipient actions
                    <>
                      {canAcceptDonation && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full bg-zerowaste hover:bg-zerowaste-600">
                              Accept Donation
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Accept Donation</DialogTitle>
                              <DialogDescription>
                                You're about to accept this donation. Please confirm to proceed.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4 space-y-4">
                              <div className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-zerowaste mr-2" />
                                <span>You will need to pick up by the specified deadline</span>
                              </div>
                              <div className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-zerowaste mr-2" />
                                <span>Contact details will be shared with the donor</span>
                              </div>
                              <div className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-zerowaste mr-2" />
                                <span>You agree to handle the food safely</span>
                              </div>
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button 
                                onClick={handleAcceptDonation}
                                disabled={isAccepting}
                                className="bg-zerowaste hover:bg-zerowaste-600"
                              >
                                {isAccepting ? "Processing..." : "Accept Donation"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                      
                      {donation.status === "accepted" && donation.recipientId === user.id && (
                        <Button className="w-full bg-zerowaste hover:bg-zerowaste-600">
                          Get Directions
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                      
                      {donation.status === "picked" && donation.recipientId === user.id && (
                        <Button variant="outline" className="w-full">
                          Leave Feedback
                        </Button>
                      )}
                    </>
                  ) : (
                    // Admin or other role
                    <Button variant="outline" className="w-full">
                      Report Issue
                    </Button>
                  )}
                </CardContent>
              </Card>
              
              {/* Additional info card */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Posted on</span>
                    <span>{new Date(donation.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type</span>
                    <span>{getFoodTypeLabel(donation.foodType)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Perishable</span>
                    <span>{getPerishableTypeLabel(donation.perishableType)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DonationDetail;
