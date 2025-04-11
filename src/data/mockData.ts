
import { Donation, DonationStatus, FoodType, PerishableType } from "../types";

export const mockDonations: Donation[] = [
  {
    id: "1",
    title: "Fresh Vegetables from Weekend Market",
    description: "Various vegetables including carrots, tomatoes, and lettuce that we couldn't sell at our weekend market stall.",
    quantity: "5 kg",
    foodType: "veg",
    perishableType: "perishable",
    expiry: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?q=80&w=3842&auto=format&fit=crop",
    status: "pending",
    donorId: "donor1",
    donorName: "Local Farm Co-op",
    location: {
      lat: 51.505,
      lng: -0.09,
      address: "123 Market Street, London"
    },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    pickupDeadline: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(), // 8 hours from now
  },
  {
    id: "2",
    title: "Catered Event Leftovers",
    description: "High-quality leftovers from a corporate event. Various dishes including sandwiches, wraps, and fruit platters.",
    quantity: "10 servings",
    foodType: "non-veg",
    perishableType: "perishable",
    expiry: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=3880&auto=format&fit=crop",
    status: "pending",
    donorId: "donor2",
    donorName: "Elite Catering",
    location: {
      lat: 51.515,
      lng: -0.1,
      address: "45 Convention Ave, London"
    },
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    pickupDeadline: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
  },
  {
    id: "3",
    title: "Canned Goods Collection",
    description: "Assorted canned foods including beans, corn, soup, and tuna. All unexpired.",
    quantity: "20 cans",
    foodType: "mixed",
    perishableType: "non-perishable",
    expiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
    image: "https://images.unsplash.com/photo-1584473457406-6240486418e9?q=80&w=3687&auto=format&fit=crop",
    status: "pending",
    donorId: "donor3",
    donorName: "Neighborhood Food Drive",
    location: {
      lat: 51.525,
      lng: -0.08,
      address: "78 Community Lane, London"
    },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    pickupDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
  },
  {
    id: "4",
    title: "Restaurant End-of-Day Items",
    description: "Fresh bread, pastries, and prepared meals from our restaurant that would otherwise be thrown away.",
    quantity: "15 servings",
    foodType: "mixed",
    perishableType: "perishable",
    expiry: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=3870&auto=format&fit=crop",
    status: "accepted",
    donorId: "donor4",
    donorName: "Bistro Deluxe",
    recipientId: "recipient1",
    recipientName: "Community Shelter",
    location: {
      lat: 51.495,
      lng: -0.11,
      address: "210 Cuisine Street, London"
    },
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    pickupDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
  },
  {
    id: "5",
    title: "Grocery Store Produce",
    description: "Fresh fruits and vegetables that are still good but can't be sold due to slight blemishes or excess inventory.",
    quantity: "8 kg",
    foodType: "veg",
    perishableType: "perishable",
    expiry: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=3870&auto=format&fit=crop",
    status: "picked",
    donorId: "donor5",
    donorName: "FreshMart Grocery",
    recipientId: "recipient2",
    recipientName: "Food Bank Network",
    location: {
      lat: 51.535,
      lng: -0.095,
      address: "567 Market Road, London"
    },
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    pickupDeadline: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago (passed)
  }
];

export const getStatusColor = (status: DonationStatus) => {
  switch (status) {
    case 'pending':
      return 'bg-blue-100 text-blue-800';
    case 'accepted':
      return 'bg-yellow-100 text-yellow-800';
    case 'picked':
      return 'bg-orange-100 text-orange-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'expired':
      return 'bg-red-100 text-red-800';
    case 'cancelled':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getFoodTypeLabel = (type: FoodType) => {
  switch (type) {
    case 'veg':
      return 'Vegetarian';
    case 'non-veg':
      return 'Non-Vegetarian';
    case 'mixed':
      return 'Mixed';
    default:
      return 'Unknown';
  }
};

export const getPerishableTypeLabel = (type: PerishableType) => {
  switch (type) {
    case 'perishable':
      return 'Perishable';
    case 'non-perishable':
      return 'Non-Perishable';
    default:
      return 'Unknown';
  }
};

export const calculateTimeRemaining = (expiryDate: string): string => {
  const expiry = new Date(expiryDate);
  const now = new Date();
  
  const diffMs = expiry.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHrs = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (diffDays < 0 || (diffDays === 0 && diffHrs < 0)) return 'Expired';
  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} left`;
  return `${diffHrs} hour${diffHrs > 1 ? 's' : ''} left`;
};

export const isExpiringSoon = (expiryDate: string): boolean => {
  const expiry = new Date(expiryDate);
  const now = new Date();
  
  const diffMs = expiry.getTime() - now.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  
  return diffHrs > 0 && diffHrs <= 24; // Consider "expiring soon" if less than 24 hours remain
};

export const getMapMarkerColor = (donation: Donation): string => {
  // Check if donation has expired
  if (new Date(donation.expiry) < new Date()) {
    return '#d32f2f'; // Red for expired
  }
  
  // Check if donation is expiring soon (within 24 hours)
  if (isExpiringSoon(donation.expiry)) {
    return '#ff9800'; // Orange/amber for expiring soon
  }
  
  // Check status
  switch (donation.status) {
    case 'pending':
      return '#4caf50'; // Green for fresh & available
    case 'accepted':
      return '#2196f3'; // Blue for accepted
    case 'picked':
      return '#9c27b0'; // Purple for picked up
    default:
      return '#757575'; // Grey for other statuses
  }
};

export const mockImpactStats = {
  foodSaved: 1248, // in kg
  peopleServed: 3745,
  emissionPrevented: 2496, // in kg of CO2
  donationsCompleted: 187,
  activeNgos: 23,
  activeVolunteers: 45
};
