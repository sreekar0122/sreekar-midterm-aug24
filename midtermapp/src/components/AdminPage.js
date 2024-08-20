    import React, { useState } from 'react';
    import { Container, Button, Box, Typography } from '@mui/material';
    import AddProducts from './Addproducts';
    import AddCategory from './AddCategory';

    const AdminPage = () => {
    const [showAddProducts, setShowAddProducts] = useState(true);

    return (
        <Container
        component="main"
        maxWidth="md"
        sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5', // Adjust this color if needed
        }}
        >
        <Typography variant="h4" gutterBottom>
            Admin Dashboard
        </Typography>
        <Box
            sx={{
            marginBottom: 3,
            display: 'flex',
            gap: 2,
            }}
        >
            <Button
            variant="contained"
            color={showAddProducts ? 'primary' : 'secondary'}
            onClick={() => setShowAddProducts(true)}
            sx={{
                padding: '10px 20px',
                borderRadius: 2,
                boxShadow: 3,
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': {
                boxShadow: 6,
                backgroundColor: theme => theme.palette.primary.dark,
                },
            }}
            >
            Add Products
            </Button>
            <Button
            variant="contained"
            color={!showAddProducts ? 'primary' : 'secondary'}
            onClick={() => setShowAddProducts(false)}
            sx={{
                padding: '10px 20px',
                borderRadius: 2,
                boxShadow: 3,
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': {
                boxShadow: 6,
                backgroundColor: theme => theme.palette.secondary.dark,
                },
            }}
            >
            Create Category
            </Button>
        </Box>
        <Box
            sx={{
            padding: 3,
            width: '100%',
            maxWidth: '800px',
            }}
        >
            {showAddProducts ? <AddProducts /> : <AddCategory />}
        </Box>
        </Container>
    );
    };

    export default AdminPage;
