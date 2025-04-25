
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    userType: 'victim' as 'victim' | 'official'
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            user_type: formData.userType
          }
        }
      });
      if (error) throw error;
      toast({
        title: "Success",
        description: "Please check your email to verify your account.",
      });
      navigate('/auth/login');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-100 to-pink-100">
      <div className="w-full max-w-md px-4">
        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-purple-800">Create an Account</CardTitle>
            <CardDescription className="text-center">Select your account type and enter your details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <Tabs defaultValue="victim" onValueChange={(value) => setFormData({ ...formData, userType: value as 'victim' | 'official' })}>
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="victim">I Need Support</TabsTrigger>
                  <TabsTrigger value="official">I'm an Official</TabsTrigger>
                </TabsList>
                <TabsContent value="victim" className="space-y-4">
                  <div className="text-sm text-center text-muted-foreground pb-2">
                    Access community support, safety tools, and resources
                  </div>
                </TabsContent>
                <TabsContent value="official" className="space-y-4">
                  <div className="text-sm text-center text-muted-foreground pb-2">
                    Access investigation tools and case management features
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full"
                />
              </div>
              
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-center text-sm text-gray-600 w-full">
              Already have an account?{' '}
              <button onClick={() => navigate('/auth/login')} className="text-purple-600 hover:underline font-medium">
                Sign in
              </button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
