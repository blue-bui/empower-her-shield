
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import NotFound from "./pages/NotFound";
import AuthLayout from "./components/layout/AuthLayout";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          
          {/* Protected routes */}
          <Route element={<AuthLayout />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Victim routes */}
              <Route path="/posts/create" element={<div className="p-4"><h1 className="text-2xl font-bold">Create Post</h1><p>This page is under construction</p></div>} />
              <Route path="/therapy" element={<div className="p-4"><h1 className="text-2xl font-bold">Therapy Bot</h1><p>This page is under construction</p></div>} />
              <Route path="/safe-routes" element={<div className="p-4"><h1 className="text-2xl font-bold">Safe Routes</h1><p>This page is under construction</p></div>} />
              <Route path="/community" element={<div className="p-4"><h1 className="text-2xl font-bold">Community</h1><p>This page is under construction</p></div>} />
              
              {/* Official routes */}
              <Route path="/authority" element={<div className="p-4"><h1 className="text-2xl font-bold">Authority Page</h1><p>This page is under construction</p></div>} />
              <Route path="/trackx" element={<div className="p-4"><h1 className="text-2xl font-bold">TrackX</h1><p>This page is under construction</p></div>} />
              <Route path="/investigation" element={<div className="p-4"><h1 className="text-2xl font-bold">Investigation</h1><p>This page is under construction</p></div>} />
              <Route path="/analytics" element={<div className="p-4"><h1 className="text-2xl font-bold">Analytics</h1><p>This page is under construction</p></div>} />
            </Route>
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
