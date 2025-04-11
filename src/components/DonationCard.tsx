
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Donation } from "@/types";
import { calculateTimeRemaining, getFoodTypeLabel, getStatusColor, isExpiringSoon } from "@/data/mockData";

interface DonationCardProps {
  donation: Donation;
  showActions?: boolean;
}

const DonationCard = ({ donation, showActions = true }: DonationCardProps) => {
  const timeRemaining = calculateTimeRemaining(donation.expiry);
  const isExpiring = isExpiringSoon(donation.expiry);
  const cardClassName = isExpiring ? "donation-card donation-card-expiring" : "donation-card donation-card-fresh";
  
  return (
    <div className={cardClassName}>
      {/* Card image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={donation.image || "/placeholder.svg"}
          alt={donation.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className={`${getStatusColor(donation.status)}`}>
            {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
          </Badge>
        </div>
      </div>
      
      {/* Card content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">{donation.title}</h3>
        
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="truncate">{donation.location.address}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-1 text-gray-500" />
            <span className={isExpiring ? "text-orange-600 font-medium" : "text-gray-700"}>
              {timeRemaining}
            </span>
          </div>
          
          <div className="flex items-center text-sm">
            <Tag className="h-4 w-4 mr-1 text-gray-500" />
            <span className="text-gray-700">{getFoodTypeLabel(donation.foodType)}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-1 text-gray-500" />
            <span className="text-gray-700">
              {new Date(donation.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          <div className="flex items-center text-sm">
            <span className="font-medium text-gray-700">{donation.quantity}</span>
          </div>
        </div>
        
        {showActions && (
          <div className="mt-4">
            <Link 
              to={`/donation/${donation.id}`}
              className="w-full inline-block text-center py-2 px-4 bg-zerowaste text-white rounded-md hover:bg-zerowaste-600 transition-colors"
            >
              View Details
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationCard;
