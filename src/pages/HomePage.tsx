
import { Link } from "react-router-dom";
import { Utensils, Users, Truck, BarChart, ArrowRight, Leaf, Apple, MapPin } from "lucide-react";
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
          <div className="container mx-auto px-4 py-20 md:py-28 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-12 md:mb-0 animate-slide-up">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 text-outline">
                Rescue <span className="text-zerowaste relative wavy-border">Food</span>, <br />
                <span className="text-zerowaste-600">Save Lives</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-700 leading-relaxed">
                Join our AI-powered geo-intelligent platform connecting surplus food 
                with those who need it most. Make a difference in your community today.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/donation/new">
                  <Button className="card-hover-effect custom-gradient-green text-white py-2 px-6 text-lg">
                    <Leaf className="mr-2 h-5 w-5" />
                    Donate Food
                  </Button>
                </Link>
                <Link to="/map">
                  <Button variant="outline" className="card-hover-effect border-zerowaste text-zerowaste hover:bg-zerowaste-50">
                    <MapPin className="mr-2 h-5 w-5" />
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
                <div className="absolute -bottom-5 -left-5 glass-card p-4 rounded-lg animate-pulse-glow">
                  <p className="font-bold text-2xl text-zerowaste">{mockImpactStats.foodSaved.toLocaleString()}<span className="text-sm ml-1">kg</span></p>
                  <p className="text-gray-600 text-sm">Food Rescued</p>
                </div>
                <div className="absolute -top-5 -right-5 glass-card p-4 rounded-lg animate-pulse-glow">
                  <p className="font-bold text-2xl text-orange-500">{mockImpactStats.peopleServed.toLocaleString()}</p>
                  <p className="text-gray-600 text-sm">People Served</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider bg-gray-50"></div>

        {/* How It Works Section */}
        <section className="py-20 bg-gray-50 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4 text-outline">How ZeroWaste Works</h2>
            <div className="w-24 h-2 bg-zerowaste mx-auto mb-12 rounded-full"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-8 text-center card-hover-effect">
                <div className="w-20 h-20 custom-gradient-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <Utensils className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">List Your Surplus Food</h3>
                <p className="text-gray-600">
                  Easily post details about your excess food with our AI-powered 
                  quantity estimator. Simply take a photo and we'll help with the rest.
                </p>
              </div>
              
              <div className="glass-card p-8 text-center card-hover-effect">
                <div className="w-20 h-20 custom-gradient-orange rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Connect With Recipients</h3>
                <p className="text-gray-600">
                  Verified NGOs, shelters, and individuals in need can discover your 
                  donation through our interactive map and request a pickup.
                </p>
              </div>
              
              <div className="glass-card p-8 text-center card-hover-effect">
                <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Truck className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Complete The Handoff</h3>
                <p className="text-gray-600">
                  Coordinate the pickup with real-time tracking. Confirm the handoff 
                  and receive impact metrics on your contribution.
                </p>
              </div>
            </div>
          </div>
          
          {/* Background decorative elements */}
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-zerowaste-100 opacity-20"></div>
          <div className="absolute top-20 -right-20 w-80 h-80 rounded-full bg-orange-100 opacity-20"></div>
        </section>

        {/* Impact Stats Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4 text-outline">Our Impact</h2>
            <div className="w-24 h-2 bg-orange-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16">
              Together, we're making a significant difference in fighting food waste and hunger.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Food Rescued"
                value={`${mockImpactStats.foodSaved.toLocaleString()} kg`}
                icon={<Utensils className="h-5 w-5" />}
                trend={12}
                className="card-hover-effect"
              />
              
              <StatCard 
                title="People Served"
                value={mockImpactStats.peopleServed.toLocaleString()}
                icon={<Users className="h-5 w-5" />}
                trend={8}
                className="card-hover-effect"
              />
              
              <StatCard 
                title="Completed Donations"
                value={mockImpactStats.donationsCompleted}
                icon={<Truck className="h-5 w-5" />}
                trend={15}
                className="card-hover-effect"
              />
              
              <StatCard 
                title="CO₂ Prevented"
                value={`${mockImpactStats.emissionPrevented.toLocaleString()} kg`}
                icon={<BarChart className="h-5 w-5" />}
                trend={10}
                className="card-hover-effect"
              />
            </div>
          </div>
          
          {/* Background decorative elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-zerowaste-100 opacity-20"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-orange-100 opacity-20"></div>
        </section>

        <div className="section-divider bg-gray-50"></div>

        {/* Recent Donations Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold text-outline">Recent Donations</h2>
              <Link to="/map" className="text-zerowaste-600 hover:text-zerowaste-800 flex items-center card-hover-effect">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentDonations.map((donation) => (
                <DonationCard key={donation.id} donation={donation} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 custom-gradient-green text-white relative overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              Join thousands of donors and recipients already using ZeroWaste to 
              fight food waste and hunger in their communities.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/auth?register=true&role=donor">
                <Button variant="secondary" size="lg" className="card-hover-effect bg-white text-zerowaste-600 hover:bg-gray-100 px-8 py-6 text-lg">
                  <Apple className="mr-2 h-5 w-5" />
                  Register as Donor
                </Button>
              </Link>
              <Link to="/auth?register=true&role=recipient">
                <Button variant="outline" size="lg" className="card-hover-effect border-white text-white hover:bg-white hover:text-zerowaste-600 px-8 py-6 text-lg">
                  <Users className="mr-2 h-5 w-5" />
                  Register as Recipient
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <svg className="absolute top-0 left-0 h-48 w-48 text-white/5" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M37.7,-65.5C50.9,-55.8,65.2,-49,73.1,-37.5C81,-25.9,82.5,-9.7,80.5,5.6C78.4,20.9,72.8,35.2,63.3,46.4C53.8,57.6,40.5,65.6,26.2,70.9C11.8,76.3,-3.6,79,-19.2,76.6C-34.7,74.2,-50.3,66.8,-60.1,54.8C-69.9,42.8,-73.8,26.1,-75.3,9.4C-76.8,-7.3,-75.9,-23.9,-69.2,-37.8C-62.5,-51.6,-50,-62.7,-36.4,-72.1C-22.7,-81.5,-7.9,-89.3,3.6,-85.6C15.1,-82,24.6,-75.1,37.7,-65.5Z" transform="translate(100 100)" />
            </svg>
            <svg className="absolute bottom-0 right-0 h-64 w-64 text-white/5" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M42.8,-73.2C56.9,-67.7,70.7,-58.5,78.1,-45.5C85.5,-32.4,86.5,-15.7,84.6,-0.3C82.8,15.2,78.2,29.1,70.3,41.1C62.5,53.2,51.4,63.5,38.3,70.8C25.1,78.2,9.9,82.6,-3.9,79.7C-17.6,76.9,-29.9,66.7,-42.5,57.2C-55.2,47.7,-68.2,38.9,-75.3,26.2C-82.3,13.6,-83.5,-2.9,-78.9,-16.8C-74.2,-30.7,-63.7,-41.9,-51.5,-48.7C-39.3,-55.5,-25.3,-57.9,-12.2,-62.3C1,-66.7,13.1,-73,25.6,-75.1C38.1,-77.2,51.1,-75.1,42.8,-73.2Z" transform="translate(100 100)" />
            </svg>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
