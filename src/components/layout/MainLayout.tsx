
import { useState, useEffect } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  LogOut,
  Menu,
  X,
  Home,
  User,
  FileText,
  MessageSquare,
  Map,
  Users,
  Shield,
  LineChart,
  Search
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const MainLayout = () => {
  const [userType, setUserType] = useState<'victim' | 'official' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_type, full_name')
          .eq('id', user.id)
          .single();
          
        if (profile) {
          setUserType(profile.user_type as 'victim' | 'official');
        }
      }
    };
    
    loadUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth/login');
      toast({
        title: "Logged out successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const victimNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Create Post', path: '/posts/create', icon: FileText },
    { name: 'Therapy Bot', path: '/therapy', icon: MessageSquare },
    { name: 'Safe Route', path: '/safe-routes', icon: Map },
    { name: 'Community', path: '/community', icon: Users },
  ];

  const officialNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Authority Page', path: '/authority', icon: Shield },
    { name: 'TrackX', path: '/trackx', icon: Search },
    { name: 'Investigation', path: '/investigation', icon: FileText },
    { name: 'Analytics', path: '/analytics', icon: LineChart },
  ];

  const navItems = userType === 'official' ? officialNavItems : victimNavItems;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r shadow-sm">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-purple-800">SafetyNet</h1>
          <p className="text-xs text-gray-500 mt-1">Women's Safety Platform</p>
        </div>
        <nav className="flex-1 pt-4 px-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center px-4 py-3 mb-1 text-gray-700 rounded-lg hover:bg-purple-50 hover:text-purple-700"
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-800 mr-3">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium">{userType === 'victim' ? 'Support Seeker' : 'Official'}</p>
              <p className="text-xs text-gray-500">Account</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile header and content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <header className="md:hidden bg-white border-b p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-purple-800">SafetyNet</h1>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </header>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}>
            <div className="absolute top-0 right-0 w-64 h-full bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-bold text-purple-800">SafetyNet</h1>
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              <nav className="p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="flex items-center px-4 py-3 mb-2 text-gray-700 rounded-lg hover:bg-purple-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span>{item.name}</span>
                  </Link>
                ))}
                <hr className="my-4" />
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </nav>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
