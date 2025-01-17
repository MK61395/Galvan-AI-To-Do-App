import React, { useState } from 'react';
//import { TextField, Button, Paper, Typography, Box, Container, useTheme, Link as MuiLink } from '@mui/material';
import { useNavigate} from 'react-router-dom';
//import {useTheme} from '@mui/material'; 
import { authAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
//import { LockOutlined as LockIcon, Login as LoginIcon } from '@mui/icons-material';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { KeyRound, LogIn } from 'lucide-react';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    //const theme = useTheme();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await authAPI.login({ username, password });
            login(response.access_token, response.username);
            navigate('/tasks');
        } catch (error) {
            console.error('Login failed:', error);
            setError('Invalid credentials');
        }
    };

    return (
        <div className="w-ful">
          <div className="w-full max-w-md px-4">
            <Card className="w-full">
              <CardHeader className="space-y-1 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
                  <KeyRound className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl font-semibold tracking-tight">
                  Welcome back
                </CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
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
                      placeholder="Enter your username"
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
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
    
                  <Button 
                    type="submit" 
                    className="w-full h-11 mt-6"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </form>
              </CardContent>
    
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-sm text-center text-muted-foreground">
                  Don't have an account?{' '}
                  <a 
                    href="/register" 
                    className="text-primary hover:underline font-medium"
                  >
                    Sign up
                  </a>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      );
};

export default Login;
