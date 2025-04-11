
import { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { 
  Package, 
  Clock, 
  CalendarCheck, 
  Loader, 
  AlertCircle, 
  Plus 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import DashboardSidebar from "@/components/DashboardSidebar";
import DonationsList from "@/components/DonationsList";
import { mockDonations } from "@/data/mockData";
import { UserRole } from "@/types";

// Simulated donor donations
const donorDonations = mockDonations.filter(d => d.donorId === "donor1");

const DonorOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Donor Dashboard</h1>
        <Link to="/donation/new">
          <Button className="bg-zerowaste hover:bg-zerowaste-600">
            <Plus className="mr-2 h-4 w-4" />
            New Donation
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Active Donations" 
          value="2" 
          icon={<Package className="h-5 w-5" />}
        />
        <StatCard 
          title="Pending Pickup" 
          value="1" 
          icon={<Clock className="h-5 w-5" />}
        />
        <StatCard 
          title="Completed Donations" 
          value="12" 
          icon={<CalendarCheck className="h-5 w-5" />}
          trend={16}
        />
        <StatCard 
          title="Total Food Weight" 
          value="45 kg" 
          icon={<Package className="h-5 w-5" />}
          trend={8}
        />
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold mb-4">Recent Donations</h2>
        
        {donorDonations.length > 0 ? (
          <DonationsList donations={donorDonations} />
        ) : (
          <div className="text-center py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No donations yet</h3>
            <p className="mt-2 text-gray-500">
              Start sharing your surplus food by creating your first donation.
            </p>
            <div className="mt-6">
              <Link to="/donation/new">
                <Button className="bg-zerowaste hover:bg-zerowaste-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Donation
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DonationHistory = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Donation History</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        {donorDonations.length > 0 ? (
          <DonationsList donations={donorDonations} />
        ) : (
          <div className="text-center py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No donation history</h3>
            <p className="mt-2 text-gray-500">
              Your past donations will appear here.
            </p>
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

const DonorDashboard = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar userRole={"donor" as UserRole} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          <Routes>
            <Route index element={<DonorOverview />} />
            <Route path="history" element={<DonationHistory />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
