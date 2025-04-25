
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, AlertCircle, FileText, Map } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const Dashboard = () => {
  const [userType, setUserType] = useState<'victim' | 'official' | null>(null);
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('user_type, full_name')
            .eq('id', user.id)
            .single();
            
          if (profile) {
            setUserType(profile.user_type as 'victim' | 'official');
            setFullName(profile.full_name || '');
          }
        }
      } catch (error: any) {
        toast({
          title: "Error loading profile",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {fullName}</h1>
          <p className="text-muted-foreground">
            {userType === 'victim' 
              ? 'Here's what's happening in your safety network' 
              : 'Here's an overview of your cases and reports'}
          </p>
        </div>
      </div>

      {userType === 'victim' ? (
        <VictimDashboard />
      ) : (
        <OfficialDashboard />
      )}
    </>
  );
};

const VictimDashboard = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Safety Resources</CardTitle>
          <Shield className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24/7 Support</div>
          <p className="text-xs text-muted-foreground mt-1">Available whenever you need it</p>
          <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">Access Resources</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">My Safe Routes</CardTitle>
          <Map className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3 Routes</div>
          <p className="text-xs text-muted-foreground mt-1">Saved trusted paths</p>
          <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">View Routes</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Community Activity</CardTitle>
          <FileText className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12 New Posts</div>
          <p className="text-xs text-muted-foreground mt-1">In your community this week</p>
          <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">Browse Posts</Button>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Safety Alerts</CardTitle>
          <CardDescription>Recent alerts in your area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-amber-50 p-4 border border-amber-200 flex items-start">
            <AlertCircle className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800">Increased activity reported</h4>
              <p className="text-sm text-amber-700 mt-1">
                There have been reports of suspicious activity in the downtown area between 8PM-11PM. 
                Please exercise caution or choose alternative routes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const OfficialDashboard = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Open Cases</CardTitle>
          <FileText className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">7</div>
          <p className="text-xs text-muted-foreground mt-1">Cases requiring attention</p>
          <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">View Cases</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Incident Reports</CardTitle>
          <AlertCircle className="h-4 w-4 text-amber-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">15</div>
          <p className="text-xs text-muted-foreground mt-1">New reports this week</p>
          <Button className="w-full mt-4 bg-amber-600 hover:bg-amber-700">Review Reports</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">System Status</CardTitle>
          <Shield className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Operational</div>
          <p className="text-xs text-muted-foreground mt-1">All systems functioning normally</p>
          <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">Check Status</Button>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest reports from the community</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md bg-slate-50 p-4 border border-slate-200">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-slate-800">Harassment Report #2341</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Verbal harassment reported at Central Park, east entrance.
                  </p>
                </div>
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">Pending</span>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="outline" size="sm" className="mr-2">Assign</Button>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">View Details</Button>
              </div>
            </div>
            
            <div className="rounded-md bg-slate-50 p-4 border border-slate-200">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-slate-800">Stalking Report #2340</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Repeated following incidents reported near University Campus.
                  </p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Assigned</span>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="outline" size="sm" className="mr-2">Update</Button>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">View Details</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
