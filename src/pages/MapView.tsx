
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Filter, X, SlidersHorizontal, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

import Navbar from "@/components/Navbar";
import MapComponent from "@/components/MapComponent";
import DonationCard from "@/components/DonationCard";
import { FoodType, PerishableType, Donation } from "@/types";
import { mockDonations } from "@/data/mockData";

const MapView = () => {
  const [searchAddress, setSearchAddress] = useState("");
  const [radius, setRadius] = useState([5]); // in kilometers
  const [selectedFoodType, setSelectedFoodType] = useState<FoodType | "all">("all");
  const [selectedPerishableType, setSelectedPerishableType] = useState<PerishableType | "all">("all");
  const [showNearExpiry, setShowNearExpiry] = useState(true);
  const [showAvailable, setShowAvailable] = useState(true);
  const [showExpired, setShowExpired] = useState(false);
  const [filteredDonations, setFilteredDonations] = useState<Donation[]>(mockDonations);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);
  
  // Filter donations based on selected filters
  useEffect(() => {
    let filtered = [...mockDonations];
    
    if (searchAddress.trim()) {
      // In a real app, you would use geocoding to filter by location
      filtered = filtered.filter(donation => 
        donation.location.address.toLowerCase().includes(searchAddress.toLowerCase())
      );
    }
    
    if (selectedFoodType !== "all") {
      filtered = filtered.filter(donation => donation.foodType === selectedFoodType);
    }
    
    if (selectedPerishableType !== "all") {
      filtered = filtered.filter(donation => donation.perishableType === selectedPerishableType);
    }
    
    // Filter by status
    const filteredByStatus = filtered.filter(donation => {
      const isExpired = new Date(donation.expiry) < new Date();
      const isNearExpiry = !isExpired && new Date(donation.expiry).getTime() - Date.now() < 24 * 60 * 60 * 1000;
      
      if (isExpired) return showExpired;
      if (isNearExpiry) return showNearExpiry;
      return showAvailable;
    });
    
    setFilteredDonations(filteredByStatus);
  }, [searchAddress, radius, selectedFoodType, selectedPerishableType, showNearExpiry, showAvailable, showExpired]);
  
  const handleMarkerClick = (donationId: string) => {
    const donation = mockDonations.find(d => d.id === donationId);
    if (donation) {
      setSelectedDonation(donation);
    }
  };
  
  const closeSelectedDonation = () => {
    setSelectedDonation(null);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Sidebar with filters */}
        <div className="hidden md:flex flex-col w-80 p-4 border-r border-gray-200 bg-white overflow-auto">
          <h2 className="text-lg font-semibold mb-4">Search & Filter</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <Input
              placeholder="Enter address or postal code"
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Radius: {radius[0]} km
            </label>
            <Slider
              defaultValue={[5]}
              max={20}
              step={1}
              value={radius}
              onValueChange={setRadius}
              className="my-4"
            />
          </div>
          
          <Separator className="my-4" />
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Food Type
            </label>
            <Select value={selectedFoodType} onValueChange={(value) => setSelectedFoodType(value as FoodType | "all")}>
              <SelectTrigger>
                <SelectValue placeholder="All food types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All food types</SelectItem>
                <SelectItem value="veg">Vegetarian</SelectItem>
                <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                <SelectItem value="mixed">Mixed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Perishable Type
            </label>
            <Select value={selectedPerishableType} onValueChange={(value) => setSelectedPerishableType(value as PerishableType | "all")}>
              <SelectTrigger>
                <SelectValue placeholder="All perishable types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All perishable types</SelectItem>
                <SelectItem value="perishable">Perishable</SelectItem>
                <SelectItem value="non-perishable">Non-Perishable</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Separator className="my-4" />
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Food Status
            </label>
            <div className="space-y-3">
              <div className="flex items-center">
                <Checkbox
                  id="available"
                  checked={showAvailable}
                  onCheckedChange={(checked) => setShowAvailable(!!checked)}
                />
                <label htmlFor="available" className="ml-2 text-sm">
                  Fresh & Available
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="nearExpiry"
                  checked={showNearExpiry}
                  onCheckedChange={(checked) => setShowNearExpiry(!!checked)}
                />
                <label htmlFor="nearExpiry" className="ml-2 text-sm">
                  Near Expiry
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="expired"
                  checked={showExpired}
                  onCheckedChange={(checked) => setShowExpired(!!checked)}
                />
                <label htmlFor="expired" className="ml-2 text-sm">
                  Expired
                </label>
              </div>
            </div>
          </div>
          
          <div className="mt-auto pt-4">
            <p className="text-sm text-gray-500 mb-2">
              <Info className="h-4 w-4 inline mr-1" /> 
              Showing {filteredDonations.length} {filteredDonations.length === 1 ? 'donation' : 'donations'}
            </p>
          </div>
        </div>
        
        {/* Mobile Filters Button */}
        {isMobile && (
          <div className="absolute top-20 left-4 z-10">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="bg-white text-gray-800 shadow-md">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Search & Filters</SheetTitle>
                  <SheetDescription>
                    Narrow down your search for food donations
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Location
                    </label>
                    <Input
                      placeholder="Enter address or postal code"
                      value={searchAddress}
                      onChange={(e) => setSearchAddress(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Search Radius: {radius[0]} km
                    </label>
                    <Slider
                      defaultValue={[5]}
                      max={20}
                      step={1}
                      value={radius}
                      onValueChange={setRadius}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Food Type
                    </label>
                    <Select value={selectedFoodType} onValueChange={(value) => setSelectedFoodType(value as FoodType | "all")}>
                      <SelectTrigger>
                        <SelectValue placeholder="All food types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All food types</SelectItem>
                        <SelectItem value="veg">Vegetarian</SelectItem>
                        <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Perishable Type
                    </label>
                    <Select value={selectedPerishableType} onValueChange={(value) => setSelectedPerishableType(value as PerishableType | "all")}>
                      <SelectTrigger>
                        <SelectValue placeholder="All perishable types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All perishable types</SelectItem>
                        <SelectItem value="perishable">Perishable</SelectItem>
                        <SelectItem value="non-perishable">Non-Perishable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <label className="text-sm font-medium">
                      Food Status
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox
                          id="mobile-available"
                          checked={showAvailable}
                          onCheckedChange={(checked) => setShowAvailable(!!checked)}
                        />
                        <label htmlFor="mobile-available" className="ml-2 text-sm">
                          Fresh & Available
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          id="mobile-nearExpiry"
                          checked={showNearExpiry}
                          onCheckedChange={(checked) => setShowNearExpiry(!!checked)}
                        />
                        <label htmlFor="mobile-nearExpiry" className="ml-2 text-sm">
                          Near Expiry
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          id="mobile-expired"
                          checked={showExpired}
                          onCheckedChange={(checked) => setShowExpired(!!checked)}
                        />
                        <label htmlFor="mobile-expired" className="ml-2 text-sm">
                          Expired
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <SheetFooter>
                  <p className="text-sm text-gray-500 mb-2">
                    Showing {filteredDonations.length} {filteredDonations.length === 1 ? 'donation' : 'donations'}
                  </p>
                  <SheetClose asChild>
                    <Button className="w-full bg-zerowaste hover:bg-zerowaste-600">Apply Filters</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        )}
        
        {/* Map container */}
        <div className="flex-grow relative">
          <MapComponent 
            donations={filteredDonations} 
            onMarkerClick={handleMarkerClick}
          />
          
          {/* Selected donation overlay */}
          {selectedDonation && (
            <div className={`absolute ${isMobile ? 'inset-x-0 bottom-0 rounded-t-2xl' : 'bottom-4 right-4 w-80 rounded-xl'} bg-white shadow-lg overflow-hidden`}>
              <div className="p-2 flex justify-end">
                <button 
                  onClick={closeSelectedDonation}
                  className="p-1 rounded-full hover:bg-gray-100"
                  aria-label="Close details"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <DonationCard donation={selectedDonation} showActions={true} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapView;
