import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box, Container, useTheme, Link as MuiLink } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { PersonAddOutlined as RegisterIcon } from '@mui/icons-material';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const theme = useTheme();

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
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    mt: 15,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        width: '100%',
                        borderRadius: 3,
                        border: `1px solid ${theme.palette.divider}`,
                        bgcolor: theme.palette.background.paper,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mb: 3,
                        }}
                    >
                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                bgcolor: theme.palette.primary.main,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mb: 1,
                            }}
                        >
                            <RegisterIcon sx={{ color: 'white' }} />
                        </Box>
                        <Typography component="h1" variant="h5">
                            Create Account
                        </Typography>
                    </Box>

                    {error && (
                        <Typography 
                            color="error" 
                            sx={{ 
                                mb: 2,
                                textAlign: 'center'
                            }}
                        >
                            {error}
                        </Typography>
                    )}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Confirm Password"
                            type="password"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            sx={{ mb: 3 }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            startIcon={<RegisterIcon />}
                            sx={{ 
                                mb: 2,
                                py: 1.5,
                                borderRadius: 2
                            }}
                        >
                            Sign Up
                        </Button>
                        <Box sx={{ textAlign: 'center' }}>
                            <MuiLink
                                component={Link}
                                to="/login"
                                variant="body2"
                                sx={{
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                Already have an account? Sign In
                            </MuiLink>
                        </Box>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default Register;
