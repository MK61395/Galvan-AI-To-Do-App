import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    useTheme as useMUITheme,
} from '@mui/material';
import {
    Brightness4 as DarkIcon,
    Brightness7 as LightIcon,
    FormatListBulleted as TaskIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const { mode, toggleColorMode } = useTheme();
    const theme = useMUITheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="fixed" elevation={0} sx={{ 
            backgroundColor: theme.palette.background.default,
            borderBottom: `1px solid ${theme.palette.divider}`,
        }}>
            <Toolbar sx={{ padding: { xs: 2, sm: 3 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TaskIcon sx={{ color: theme.palette.primary.main }} />
                    <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{ 
                            color: theme.palette.text.primary,
                            fontWeight: 600,
                            display: { xs: 'none', sm: 'block' }
                        }}
                    >
                        Task Manager
                    </Typography>
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton onClick={toggleColorMode} color="inherit" sx={{ color: theme.palette.text.primary }}>
                        {mode === 'dark' ? <LightIcon /> : <DarkIcon />}
                    </IconButton>
                    
                    {user && (
                        <>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    color: theme.palette.text.primary,
                                    display: { xs: 'none', sm: 'block' }
                                }}
                            >
                                {user.username}
                            </Typography>
                            <Button 
                                variant="outlined"
                                onClick={handleLogout}
                                sx={{
                                    borderColor: theme.palette.primary.main,
                                    color: theme.palette.primary.main,
                                    '&:hover': {
                                        borderColor: theme.palette.primary.dark,
                                        backgroundColor: 'rgba(33, 150, 243, 0.04)'
                                    }
                                }}
                            >
                                Logout
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
