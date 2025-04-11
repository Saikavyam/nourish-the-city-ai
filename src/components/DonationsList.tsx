
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DonationCard from "./DonationCard";
import { Donation, FoodType, PerishableType } from "@/types";

interface DonationsListProps {
  donations: Donation[];
  showActions?: boolean;
}

const DonationsList = ({ donations, showActions = true }: DonationsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFoodType, setSelectedFoodType] = useState<FoodType | "all">("all");
  const [selectedPerishableType, setSelectedPerishableType] = useState<PerishableType | "all">("all");
  const [showFilters, setShowFilters] = useState(false);

  // Filter donations based on search term and filters
  const filteredDonations = donations.filter((donation) => {
    const matchesSearch = 
      donation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.donorName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFoodType = 
      selectedFoodType === "all" || donation.foodType === selectedFoodType;
    
    const matchesPerishableType = 
      selectedPerishableType === "all" || donation.perishableType === selectedPerishableType;
    
    return matchesSearch && matchesFoodType && matchesPerishableType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search donations..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Food Type
            </label>
            <Select 
              value={selectedFoodType} 
              onValueChange={(value) => setSelectedFoodType(value as FoodType | "all")}
            >
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Perishable Type
            </label>
            <Select 
              value={selectedPerishableType} 
              onValueChange={(value) => setSelectedPerishableType(value as PerishableType | "all")}
            >
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
        </div>
      )}

      {filteredDonations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonations.map((donation) => (
            <DonationCard 
              key={donation.id} 
              donation={donation} 
              showActions={showActions} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No donations found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default DonationsList;
