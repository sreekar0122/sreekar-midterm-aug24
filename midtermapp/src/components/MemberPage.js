import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails, fetchRoles } from "../redux/actions/authActions";
import { Container, Typography, Card, CardContent, CircularProgress, Button, Box, Divider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import moment from "moment-timezone";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: '#333',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          padding: 24,
          marginBottom: 16,
          backgroundColor: '#ffffff',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          marginRight: 8,
          borderRadius: 4,
        },
      },
    },
  },
});

const MembersPage = () => {
    const dispatch = useDispatch();
    const { user, loading, error, roles = [] } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchRoles());
        const userId = localStorage.getItem("userId");
        if (userId) {
            dispatch(fetchUserDetails(userId));
        }
    }, [dispatch]);

    const getRoleName = (roleId) => {
        if (!roles || !Array.isArray(roles)) {
            return "Unknown";
        }
        const role = roles.find((role) => role._id === roleId);
        return role ? role.name : "Unknown";
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.location.href = "/login";
    };

    const formatCreatedAt = (createdAt) => {
        return moment.utc(createdAt).tz('Asia/Kolkata').format('DD-MMM-YY');
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography variant="h6" color="error">Error: {error}</Typography>;

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md" sx={{ paddingTop: 4 }}>
                <Typography variant="h4" gutterBottom>
                    User Details
                </Typography>
                {user ? (
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Welcome {user.displayName}...!
                            </Typography>
                            <Divider sx={{ marginBottom: 2 }} />
                            <Typography variant="body1"><b>Username:</b> {user.username}</Typography>
                            <Typography variant="body1"><b>Email:</b> {user.email}</Typography>
                            <Typography variant="body1"><b>Display Name:</b> {user.displayName}</Typography>
                            <Typography variant="body1"><b>Role:</b> {getRoleName(user.role)}</Typography>
                            <Typography variant="body1"><b>Created At:</b> {formatCreatedAt(user.created_at)}</Typography>
                        </CardContent>
                        <Box marginBottom={2}>
                            <Button variant="contained" color="secondary" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Box>
                    </Card>
                ) : (
                    <Typography variant="h6">No user details available</Typography>
                )}
                
            </Container>
        </ThemeProvider>
    );
};

export default MembersPage;
