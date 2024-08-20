import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/actions/authActions";
import axios from "axios";
import { TextField, Button, MenuItem, Snackbar, Typography, Container, CircularProgress, Box, Paper } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const validationSchema = Yup.object({
    displayName: Yup.string().required("Display Name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Must be a @gmail.com address")
        .required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    role: Yup.string().required("Role is required"),
});

const RegistrationPage = () => {
    const [roles, setRoles] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/roles");
                setRoles(response.data.roles);
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };

        fetchRoles();
    }, []);

    const handleSubmit = async (values, { resetForm }) => {
        setLoading(true);
        try {
            await dispatch(addUser(values));
            setSuccessMessage("Registration successful!");
            resetForm();
            setTimeout(() => setSuccessMessage(""), 10000);
        } catch (error) {
            console.error("Error registering user:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
            <Paper elevation={6} sx={{ padding: 4, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
                <Typography variant="h5" gutterBottom align="center">User Registration</Typography>
                <Formik
                    initialValues={{
                        displayName: "",
                        email: "",
                        username: "",
                        password: "",
                        role: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form>
                            <Field
                                as={TextField}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                label="Display Name"
                                name="displayName"
                                error={touched.displayName && Boolean(errors.displayName)}
                                helperText={touched.displayName && errors.displayName}
                                sx={{ marginBottom: 2 }}
                            />
                            <Field
                                as={TextField}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                label="Email"
                                name="email"
                                type="email"
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                sx={{ marginBottom: 2 }}
                            />
                            <Field
                                as={TextField}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                label="Username"
                                name="username"
                                error={touched.username && Boolean(errors.username)}
                                helperText={touched.username && errors.username}
                                sx={{ marginBottom: 2 }}
                            />
                            <Field
                                as={TextField}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                label="Password"
                                name="password"
                                type="password"
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                sx={{ marginBottom: 2 }}
                            />
                            <Field
                                as={TextField}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                label="Role"
                                name="role"
                                select
                                error={touched.role && Boolean(errors.role)}
                                helperText={touched.role && errors.role}
                                sx={{ marginBottom: 2 }}
                            >
                                <MenuItem value="">
                                    <em>Select Role</em>
                                </MenuItem>
                                {roles.map((role) => (
                                    <MenuItem key={role._id} value={role._id}>
                                        {role.name}
                                    </MenuItem>
                                ))}
                            </Field>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={userState.loading || loading || isSubmitting}
                                sx={{ marginTop: 2 }}
                            >
                                {loading || userState.loading ? "Registering..." : "Register"}
                            </Button>
                        </Form>
                    )}
                </Formik>
                <Snackbar
                    open={!!successMessage}
                    autoHideDuration={10000}
                    onClose={() => setSuccessMessage("")}
                >
                    <Alert onClose={() => setSuccessMessage("")} severity="success">
                        {successMessage}
                    </Alert>
                </Snackbar>
                {loading && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            zIndex: 1200,
                        }}
                    >
                        <CircularProgress size={80} thickness={5} />
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default RegistrationPage;
