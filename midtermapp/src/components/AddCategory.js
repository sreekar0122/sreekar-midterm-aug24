import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Paper, Box, Snackbar, Alert } from '@mui/material';

// Define the validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .required('Category name is required')
    .min(3, 'Category name must be at least 3 characters')
    .max(30, 'Category name must be at most 30 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(50, 'Description must be at least 50 characters')
    .max(500, 'Description must be at most 500 characters'),
});

function AddCategory() {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios.post('http://localhost:3000/api/v1/categories', values);
      setSnackbarMessage('Category Added Successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      resetForm();
      navigate('/admin');
    } catch (err) {
      setSnackbarMessage('An error occurred: ' + (err.message || 'Unable to add the category.'));
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#fff' }}>
        <Typography variant="h5" gutterBottom>
          Add New Category
        </Typography>
        <Formik
          initialValues={{ name: '', description: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Box display="flex" flexDirection="column" gap={2}>
                <Field
                  name="name"
                  as={TextField}
                  label="Category Name"
                  variant="outlined"
                  fullWidth
                  error={touched.name && Boolean(errors.name)}
                  helperText={<ErrorMessage name="name" />}
                />
                <Field
                  name="description"
                  as={TextField}
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  error={touched.description && Boolean(errors.description)}
                  helperText={<ErrorMessage name="description" />}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Add Category
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        action={
          <Button color="inherit" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default AddCategory;
