
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { 
  BarChart, 
  Users, 
  ShoppingBag, 
  Package, 
  Calendar,
  Download,
  User,
  AlertCircle
} from "lucide-react";

import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import DashboardSidebar from "@/components/DashboardSidebar";
import DonationsList from "@/components/DonationsList";
import { mockDonations, mockImpactStats } from "@/data/mockData";
import { UserRole } from "@/types";

const AdminOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Food Saved" 
          value={`${mockImpactStats.foodSaved.toLocaleString()} kg`} 
          icon={<Package className="h-5 w-5" />}
          trend={12}
        />
        <StatCard 
          title="People Served" 
          value={mockImpactStats.peopleServed.toLocaleString()} 
          icon={<Users className="h-5 w-5" />}
          trend={8}
        />
        <StatCard 
          title="Active NGOs" 
          value={mockImpactStats.activeNgos} 
          icon={<Building className="h-5 w-5" />}
          trend={5}
        />
        <StatCard 
          title="CO₂ Prevented" 
          value={`${mockImpactStats.emissionPrevented.toLocaleString()} kg`} 
          icon={<BarChart className="h-5 w-5" />}
          trend={10}
        />
      </div>
      
      {/* Donation Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Donation Analytics</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            {/* This would be a real chart in a production app */}
            <p className="text-gray-500">Donation trend chart would appear here</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                <Package className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">New donation by Elite Catering</p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-green-100 p-2 text-green-600">
                <User className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">New recipient registered</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-orange-100 p-2 text-orange-600">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Donation #4 was accepted</p>
                <p className="text-xs text-gray-500">3 hours ago</p>
              </div>
            </div>
            
            <Link to="/admin/donations" className="text-sm text-zerowaste-600 hover:underline flex items-center">
              View all activity
            </Link>
          </div>
        </div>
      </div>
      
      {/* Recent Donations */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recent Donations</h2>
          <Link to="/admin/donations" className="text-zerowaste-600 hover:underline text-sm">
            View All
          </Link>
        </div>
        
        <DonationsList donations={mockDonations.slice(0, 3)} />
      </div>
    </div>
  );
};

const UserManagement = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="text-center py-12">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">User management functionality would be implemented here</h3>
        </div>
      </div>
    </div>
  );
};

const DonationManagement = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Donation Management</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <DonationsList donations={mockDonations} />
      </div>
    </div>
  );
};

// Additional component needed for Building icon
const Building = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
};

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar userRole={"admin" as UserRole} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          <Routes>
            <Route index element={<AdminOverview />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="donations" element={<DonationManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
