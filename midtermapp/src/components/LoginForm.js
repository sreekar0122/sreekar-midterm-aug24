import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/authActions";
import { TextField, Button, Container, Typography, Snackbar, CircularProgress, Box, Paper } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
        .required("Password is required")
});

const LoginPage = () => {
    const [message, setMessage] = useState({ text: "", severity: "" });
    const [token, setToken] = useLocalStorage("token", "");
    const [loading, setLoading] = useState(false); // Loading state
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting }) => {
        setLoading(true); // Start loading
        try {
            const result = await dispatch(login(values)); // Dispatch login action
            const { token } = result; // Extract token from result
            setToken(token); // Store token in local storage
            setMessage({ text: "Login successful!", severity: "success" });
            navigate("/members"); // Redirect to members page on successful login
        } catch (error) {
            console.error("Error logging in:", error);
            setMessage({
                text: error.response?.data?.message || "Login failed. Please try again.",
                severity: "error",
            });
        } finally {
            setLoading(false); // End loading
            setSubmitting(false);
            setTimeout(() => setMessage({ text: "", severity: "" }), 10000);
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
            <Paper elevation={6} sx={{ padding: 4, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
                <Typography variant="h5" gutterBottom align="center">Login</Typography>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
                        <CircularProgress />
                    </Box>
                ) : (
                    <Formik
                        initialValues={{ username: "", password: "" }}
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
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    disabled={isSubmitting || loading}
                                    sx={{ marginTop: 2 }}
                                >
                                    {isSubmitting || loading ? "Logging in..." : "Login"}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                )}
                <Snackbar
                    open={!!message.text}
                    autoHideDuration={10000}
                    onClose={() => setMessage({ text: "", severity: "" })}
                >
                    <Alert onClose={() => setMessage({ text: "", severity: "" })} severity={message.severity}>
                        {message.text}
                    </Alert>
                </Snackbar>
            </Paper>
        </Container>
    );
};

export default LoginPage;
