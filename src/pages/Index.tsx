
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-purple-800 mb-4">
            Empower Her Shield
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A safe space for women to connect, share, and support each other
          </p>
          <div className="space-x-4">
            <Button 
              onClick={() => navigate('/auth/login')}
              variant="default"
              className="bg-purple-600 hover:bg-purple-700"
            >
              Login
            </Button>
            <Button 
              onClick={() => navigate('/auth/signup')}
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              Sign Up
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-purple-800 mb-4">Safe Routes</h3>
            <p className="text-gray-600">Find and share safe routes for your daily commute</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-purple-800 mb-4">Community Support</h3>
            <p className="text-gray-600">Connect with others and share your experiences</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-purple-800 mb-4">Official Assistance</h3>
            <p className="text-gray-600">Direct connection with government officials</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
