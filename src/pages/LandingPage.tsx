
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Heart, Map, Users, MessageSquare } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-purple-700 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">SafetyNet</h1>
          <div className="space-x-4">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white hover:text-purple-700"
              onClick={() => navigate('/auth/login')}
            >
              Login
            </Button>
            <Button 
              className="bg-white text-purple-700 hover:bg-purple-50"
              onClick={() => navigate('/auth/signup')}
            >
              Sign Up
            </Button>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Your Safety Is Our Priority
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Join our community dedicated to women's safety, support, and empowerment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-purple-700 hover:bg-purple-50"
              onClick={() => navigate('/auth/signup')}
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent text-white border-white hover:bg-white hover:text-purple-700"
              onClick={() => window.scrollTo({ top: document.getElementById('features')?.offsetTop, behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">How We Help</h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-purple-50 p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-800">Safe Routes</h3>
              <p className="text-gray-600">Find and share the safest paths to your destination through our community-vetted routes.</p>
            </div>
            
            <div className="bg-pink-50 p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-pink-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-pink-800">Therapy Support</h3>
              <p className="text-gray-600">Access our AI-powered therapy bot for immediate emotional support and guidance.</p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-800">Community Connection</h3>
              <p className="text-gray-600">Connect with others in a supportive community to share experiences and advice.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-20 bg-gradient-to-r from-purple-700 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community Today</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Be part of a network that's committed to making the world safer for women.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-purple-700 hover:bg-purple-50"
            onClick={() => navigate('/auth/signup')}
          >
            Sign Up Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">SafetyNet</h2>
              <p className="text-gray-400 mt-2">Women's Safety Platform</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-purple-400">About</a>
              <a href="#" className="hover:text-purple-400">Contact</a>
              <a href="#" className="hover:text-purple-400">Privacy</a>
              <a href="#" className="hover:text-purple-400">Terms</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} SafetyNet. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
