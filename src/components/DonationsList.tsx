
import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
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

  const clearFilters = () => {
    setSelectedFoodType("all");
    setSelectedPerishableType("all");
    setSearchTerm("");
  };

  const hasActiveFilters = selectedFoodType !== "all" || selectedPerishableType !== "all" || searchTerm !== "";

  return (
    <div className="space-y-6 animate-slide-up">
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
        <div className="flex gap-2">
          {hasActiveFilters && (
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={clearFilters}
            >
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}
          <Button 
            variant={showFilters ? "default" : "outline"}
            className="flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters {showFilters ? "▲" : "▼"}
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-gray-200 dark:border-zinc-700 animate-slide-up">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Food Type
              </label>
              <Select 
                value={selectedFoodType} 
                onValueChange={(value) => setSelectedFoodType(value as FoodType | "all")}
              >
                <SelectTrigger className="w-full">
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Perishable Type
              </label>
              <Select 
                value={selectedPerishableType} 
                onValueChange={(value) => setSelectedPerishableType(value as PerishableType | "all")}
              >
                <SelectTrigger className="w-full">
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
        <div className="text-center py-16 bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-gray-200 dark:border-zinc-700">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-700 mb-4">
            <Search className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No donations found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
          {hasActiveFilters && (
            <Button 
              variant="link" 
              className="mt-3 text-zerowaste-600 dark:text-zerowaste-400"
              onClick={clearFilters}
            >
              Clear all filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default DonationsList;
