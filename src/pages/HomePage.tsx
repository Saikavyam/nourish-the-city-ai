
import { Link } from "react-router-dom";
import { Utensils, Users, Truck, BarChart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockDonations, mockImpactStats } from "@/data/mockData";
import DonationCard from "@/components/DonationCard";
import StatCard from "@/components/StatCard";

const HomePage = () => {
  // Get only the first 3 donations for the showcase
  const recentDonations = mockDonations.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="hero-pattern">
          <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Rescue Food, <span className="text-zerowaste">Save Lives</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-700 leading-relaxed">
                Join our AI-powered geo-intelligent platform connecting surplus food 
                with those who need it most. Make a difference in your community today.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/donation/new">
                  <Button className="bg-zerowaste hover:bg-zerowaste-600 text-white py-2 px-6 text-lg">
                    Donate Food
                  </Button>
                </Link>
                <Link to="/map">
                  <Button variant="outline" className="border-zerowaste text-zerowaste hover:bg-zerowaste-50">
                    Find Available Food
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl animate-float">
                  <img 
                    src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?q=80&w=3870&auto=format&fit=crop" 
                    alt="Food donation" 
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg">
                  <p className="font-bold text-2xl text-zerowaste">{mockImpactStats.foodSaved.toLocaleString()}<span className="text-sm ml-1">kg</span></p>
                  <p className="text-gray-600 text-sm">Food Rescued</p>
                </div>
                <div className="absolute -top-5 -right-5 bg-white p-4 rounded-lg shadow-lg">
                  <p className="font-bold text-2xl text-orange-500">{mockImpactStats.peopleServed.toLocaleString()}</p>
                  <p className="text-gray-600 text-sm">People Served</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How ZeroWaste Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-zerowaste-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Utensils className="h-8 w-8 text-zerowaste-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">1. List Your Surplus Food</h3>
                <p className="text-gray-600">
                  Easily post details about your excess food with our AI-powered 
                  quantity estimator. Simply take a photo and we'll help with the rest.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">2. Connect With Recipients</h3>
                <p className="text-gray-600">
                  Verified NGOs, shelters, and individuals in need can discover your 
                  donation through our interactive map and request a pickup.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">3. Complete The Handoff</h3>
                <p className="text-gray-600">
                  Coordinate the pickup with real-time tracking. Confirm the handoff 
                  and receive impact metrics on your contribution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Our Impact</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
              Together, we're making a significant difference in fighting food waste and hunger.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Food Rescued"
                value={`${mockImpactStats.foodSaved.toLocaleString()} kg`}
                icon={<Utensils className="h-5 w-5" />}
                trend={12}
              />
              
              <StatCard 
                title="People Served"
                value={mockImpactStats.peopleServed.toLocaleString()}
                icon={<Users className="h-5 w-5" />}
                trend={8}
              />
              
              <StatCard 
                title="Completed Donations"
                value={mockImpactStats.donationsCompleted}
                icon={<Truck className="h-5 w-5" />}
                trend={15}
              />
              
              <StatCard 
                title="CO₂ Prevented"
                value={`${mockImpactStats.emissionPrevented.toLocaleString()} kg`}
                icon={<BarChart className="h-5 w-5" />}
                trend={10}
              />
            </div>
          </div>
        </section>

        {/* Recent Donations Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Recent Donations</h2>
              <Link to="/map" className="text-zerowaste-600 hover:text-zerowaste-800 flex items-center">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentDonations.map((donation) => (
                <DonationCard key={donation.id} donation={donation} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-zerowaste-600 to-teal-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of donors and recipients already using ZeroWaste to 
              fight food waste and hunger in their communities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/auth?register=true&role=donor">
                <Button variant="secondary" size="lg" className="bg-white text-zerowaste-600 hover:bg-gray-100">
                  Register as Donor
                </Button>
              </Link>
              <Link to="/auth?register=true&role=recipient">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-zerowaste-600">
                  Register as Recipient
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
