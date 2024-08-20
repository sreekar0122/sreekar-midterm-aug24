// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useLocalStorage } from 'usehooks-ts'; // Import useLocalStorage

const Title = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
    fontWeight: 700,
    color: '#fff',
}));

const NavLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: '#fff',
    padding: theme.spacing(1, 2),
    '&:hover': {
        backgroundColor: '#424242',
        borderRadius: theme.shape.borderRadius,
    },
}));

const Navbar = () => {
    const [token] = useLocalStorage('token', ''); // Use useLocalStorage to get token

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Title variant="h6">E-Commerce App</Title>
                <Box>
                    <NavLink to="/">
                        <Button color="inherit">Home</Button>
                    </NavLink>
                    <NavLink to="/registration">
                        <Button color="inherit">Registration</Button>
                    </NavLink>
                    <NavLink to="/login">
                        <Button color="inherit">Login</Button>
                    </NavLink>
                    {token && (
                        <NavLink to="/admin">
                            <Button color="inherit">Admin</Button>
                        </NavLink>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
