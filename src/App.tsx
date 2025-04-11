
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UserProvider } from "./contexts/UserContext";
import { SidebarProvider } from "./components/ui/sidebar";

import HomePage from "./pages/HomePage";
import DonorDashboard from "./pages/DonorDashboard";
import RecipientDashboard from "./pages/RecipientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MapView from "./pages/MapView";
import AuthPage from "./pages/AuthPage";
import DonationForm from "./pages/DonationForm";
import DonationDetail from "./pages/DonationDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <SidebarProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/donor/*" element={<DonorDashboard />} />
              <Route path="/recipient/*" element={<RecipientDashboard />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
              <Route path="/map" element={<MapView />} />
              <Route path="/donation/new" element={<DonationForm />} />
              <Route path="/donation/:id" element={<DonationDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
          <Sonner />
        </SidebarProvider>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
