
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Tag, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Donation } from "@/types";
import { calculateTimeRemaining, getFoodTypeLabel, getStatusColor, isExpiringSoon } from "@/data/mockData";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface DonationCardProps {
  donation: Donation;
  showActions?: boolean;
}

const DonationCard = ({ donation, showActions = true }: DonationCardProps) => {
  const timeRemaining = calculateTimeRemaining(donation.expiry);
  const isExpiring = isExpiringSoon(donation.expiry);
  
  return (
    <div className="group animate-zoom-in rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      {/* Card image with fixed aspect ratio */}
      <AspectRatio ratio={16/9} className="w-full bg-gray-100 overflow-hidden">
        <img
          src={donation.image || "/placeholder.svg"}
          alt={donation.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          <Badge className={`${getStatusColor(donation.status)}`}>
            {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
          </Badge>
          
          {isExpiring && (
            <Badge variant="secondary" className="bg-orange-500 text-white">
              Expiring Soon
            </Badge>
          )}
        </div>
      </AspectRatio>
      
      {/* Card content */}
      <div className="p-5">
        <h3 className="font-bold text-lg truncate text-gray-900 dark:text-gray-50">{donation.title}</h3>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-2">
          <User className="h-4 w-4 mr-1.5 flex-shrink-0" />
          <span className="truncate">{donation.donorName}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-2">
          <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0" />
          <span className="truncate">{donation.location.address}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-1.5 text-gray-500 dark:text-gray-400" />
            <span className={isExpiring ? "text-orange-600 font-semibold" : "text-gray-700 dark:text-gray-300"}>
              {timeRemaining}
            </span>
          </div>
          
          <div className="flex items-center text-sm">
            <Tag className="h-4 w-4 mr-1.5 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">{getFoodTypeLabel(donation.foodType)}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-1.5 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">
              {new Date(donation.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          <div className="flex items-center text-sm">
            <span className="font-medium text-gray-700 dark:text-gray-300">{donation.quantity}</span>
          </div>
        </div>
        
        {showActions && (
          <div className="mt-5">
            <Link 
              to={`/donation/${donation.id}`}
              className="block text-center py-2.5 px-4 bg-zerowaste rounded-lg text-white font-medium hover:bg-zerowaste-600 transition-colors shadow-sm hover:shadow"
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
