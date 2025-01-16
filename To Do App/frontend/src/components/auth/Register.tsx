import React, { useState } from 'react';
//import { useTheme} from '@mui/material';
import { useNavigate} from 'react-router-dom';
import { authAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
//import { PersonAddOutlined as RegisterIcon } from '@mui/icons-material';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserPlus} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    //const theme = useTheme();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await authAPI.register({ username, password });
            login(response.access_token, response.username);
            navigate('/tasks');
        } catch (error) {
            console.error('Registration failed:', error);
            setError('Registration failed. Username might be taken.');
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50/50">
          <div className="w-full max-w-md px-4">
            <Card className="w-full">
              <CardHeader className="space-y-1 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
                  <UserPlus className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl font-semibold tracking-tight">
                  Create Account
                </CardTitle>
                <CardDescription>
                  Enter your details to create your account
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Choose a username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
    
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
    
                  <Button 
                    type="submit" 
                    className="w-full h-11 mt-6"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create Account
                  </Button>
                </form>
              </CardContent>
    
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-sm text-center text-muted-foreground">
                  Already have an account?{' '}
                  <a 
                    href="/login" 
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in
                  </a>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      );
};

export default Register;
