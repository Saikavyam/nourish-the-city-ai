
import { useEffect, useRef, useState } from 'react';
import { Loader } from 'lucide-react';
import { Donation } from '@/types';
import { getMapMarkerColor } from '@/data/mockData';

interface MapComponentProps {
  donations: Donation[];
  onMarkerClick?: (donationId: string) => void;
  centerLocation?: { lat: number; lng: number };
}

// This is a placeholder component to demonstrate how a real map would be implemented
// In a production app, you would use a mapping library like Google Maps, Mapbox, or Leaflet
const MapComponent = ({ donations, onMarkerClick, centerLocation }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading the map
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleMarkerClick = (donationId: string) => {
    if (onMarkerClick) {
      onMarkerClick(donationId);
    }
  };
  
  return (
    <div className="w-full h-full relative rounded-lg overflow-hidden border border-gray-200">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Loader className="h-8 w-8 animate-spin text-zerowaste" />
          <span className="ml-2 text-lg text-gray-600">Loading map...</span>
        </div>
      ) : (
        <>
          <div 
            ref={mapRef} 
            className="w-full h-full bg-[#e0e9e0]"
            style={{
              backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l+4caf50(-0.09,51.505),pin-l+ff9800(-0.1,51.515),pin-l+4caf50(-0.08,51.525),pin-l+2196f3(-0.11,51.495),pin-l+9c27b0(-0.095,51.535)/-0.09,51.515,12/800x600?access_token=placeholder')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
          
          {/* Map Legend */}
          <div className="absolute bottom-4 right-4 bg-white p-3 rounded-md shadow-md text-sm">
            <h4 className="font-medium mb-2">Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="inline-block w-4 h-4 rounded-full bg-zerowaste mr-2"></span>
                <span>Fresh & Available</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-4 h-4 rounded-full bg-orange-500 mr-2"></span>
                <span>Near Expiry</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-4 h-4 rounded-full bg-blue-500 mr-2"></span>
                <span>Accepted</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-4 h-4 rounded-full bg-purple-500 mr-2"></span>
                <span>Picked Up</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-4 h-4 rounded-full bg-red-600 mr-2"></span>
                <span>Expired</span>
              </div>
            </div>
          </div>
          
          {/* This is a placeholder for the actual markers that would be rendered by a real map library */}
          <div className="absolute inset-0 pointer-events-none">
            {donations.map((donation) => {
              const markerColor = getMapMarkerColor(donation);
              // Convert the lat/lng to random screen positions for simulation
              const randomLeft = Math.floor(Math.random() * 70) + 15;
              const randomTop = Math.floor(Math.random() * 70) + 15;
              
              return (
                <button
                  key={donation.id}
                  className="absolute pointer-events-auto cursor-pointer"
                  style={{ 
                    left: `${randomLeft}%`, 
                    top: `${randomTop}%` 
                  }}
                  onClick={() => handleMarkerClick(donation.id)}
                  title={donation.title}
                >
                  <div 
                    className="w-6 h-6 rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                    style={{ backgroundColor: markerColor }}
                  >
                    <span className="text-white text-xs">{donation.id}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default MapComponent;
