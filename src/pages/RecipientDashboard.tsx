
import { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { 
  Package, 
  Clock, 
  CalendarCheck, 
  AlertCircle, 
  Map, 
  Users 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import DashboardSidebar from "@/components/DashboardSidebar";
import DonationsList from "@/components/DonationsList";
import { mockDonations } from "@/data/mockData";
import { UserRole } from "@/types";

// Get available donations (pending status)
const availableDonations = mockDonations.filter(d => d.status === "pending");

// Simulated recipient pickups
const myPickups = mockDonations.filter(d => 
  (d.status === "accepted" || d.status === "picked") && 
  d.recipientId === "recipient1"
);

const RecipientOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Available Food</h1>
        <Link to="/map">
          <Button variant="outline" className="border-zerowaste text-zerowaste hover:bg-zerowaste-50">
            <Map className="mr-2 h-4 w-4" />
            View Map
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard 
          title="Available Donations" 
          value={availableDonations.length.toString()} 
          icon={<Package className="h-5 w-5" />}
        />
        <StatCard 
          title="Your Scheduled Pickups" 
          value={myPickups.filter(d => d.status === "accepted").length.toString()} 
          icon={<Clock className="h-5 w-5" />}
        />
        <StatCard 
          title="People Served This Month" 
          value="85" 
          icon={<Users className="h-5 w-5" />}
        />
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold mb-4">Available Food</h2>
        
        {availableDonations.length > 0 ? (
          <DonationsList donations={availableDonations} />
        ) : (
          <div className="text-center py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No available donations</h3>
            <p className="mt-2 text-gray-500">
              Check back later for new donations or explore the map.
            </p>
            <div className="mt-6">
              <Link to="/map">
                <Button className="bg-zerowaste hover:bg-zerowaste-600">
                  <Map className="mr-2 h-4 w-4" />
                  Explore Map
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const MyPickups = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Pickups</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        {myPickups.length > 0 ? (
          <DonationsList donations={myPickups} />
        ) : (
          <div className="text-center py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No pickups scheduled</h3>
            <p className="mt-2 text-gray-500">
              Browse available donations and schedule your first pickup.
            </p>
            <div className="mt-6">
              <Link to="/recipient">
                <Button className="bg-zerowaste hover:bg-zerowaste-600">
                  Browse Available Food
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Profile</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <p>Profile settings would be displayed here.</p>
      </div>
    </div>
  );
};

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <p>Account settings would be displayed here.</p>
      </div>
    </div>
  );
};

const RecipientDashboard = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar userRole={"recipient" as UserRole} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          <Routes>
            <Route index element={<RecipientOverview />} />
            <Route path="my-pickups" element={<MyPickups />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default RecipientDashboard;
