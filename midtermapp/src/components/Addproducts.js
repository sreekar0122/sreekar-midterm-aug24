import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { TextField, Button, MenuItem, Container, Typography, Paper, Box, FormControl, FormControlLabel, FormGroup, Checkbox, FormHelperText, Snackbar, Alert } from '@mui/material';

// Define the validation schema using Yup
const validationSchema = Yup.object({
  code: Yup.string().required('Product Code is required'),
  name: Yup.string()
    .min(3, 'Product Name must be at least 3 characters')
    .max(30, 'Product Name must be at most 30 characters')
    .required('Product Name is required'),
  excerpt: Yup.string()
    .min(30, 'Excerpt must be at least 30 characters')
    .max(500, 'Excerpt must be at most 500 characters')
    .required('Excerpt is required'),
  category: Yup.string().required('Category is required'),
  price: Yup.number()
    .min(0, 'Price must be a positive number')
    .max(100000, 'Price must not exceed 100,000')
    .required('Price is required'),
  stock: Yup.number()
    .min(0, 'Stock must be zero or more')
    .required('Stock is required'),
  status: Yup.boolean().required('Status is required'),
});

function AddProducts() {
  const [categories, setCategories] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/categories')
      .then(response => {
        setCategories(response.data.categories);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios.post('http://localhost:3000/api/v1/products', values);
      setSnackbarMessage('Product successfully added!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      resetForm();
    } catch (err) {
      setSnackbarMessage('Failed to add product. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      console.error(err);
    }
  };

  const generateUniqueCode = () => {
    return uuidv4().slice(0, 6).toUpperCase();
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#fff' }}>
        <Typography variant="h5" gutterBottom>
          Add New Product
        </Typography>
        <Formik
          initialValues={{ code: '', name: '', excerpt: '', category: '', price: '', stock: '', status: true }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values, errors, touched }) => (
            <Form>
              <Box display="flex" flexDirection="column" gap={2}>
                <Field
                  name="code"
                  as={TextField}
                  label="Product Code"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.code && touched.code)}
                  helperText={<ErrorMessage name="code" />}
                />
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={() => setFieldValue('code', generateUniqueCode())}
                >
                  Generate Unique Code
                </Button>

                <Field
                  name="name"
                  as={TextField}
                  label="Product Name"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.name && touched.name)}
                  helperText={<ErrorMessage name="name" />}
                />

                <Field
                  name="excerpt"
                  as={TextField}
                  label="Excerpt"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  error={Boolean(errors.excerpt && touched.excerpt)}
                  helperText={<ErrorMessage name="excerpt" />}
                />

                <Field
                  name="category"
                  as={TextField}
                  label="Category"
                  select
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.category && touched.category)}
                  helperText={<ErrorMessage name="category" />}
                >
                  <MenuItem value="">
                    <em>Select Category</em>
                  </MenuItem>
                  {categories.map(category => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Field>

                <Field
                  name="price"
                  as={TextField}
                  label="Price"
                  type="number"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.price && touched.price)}
                  helperText={<ErrorMessage name="price" />}
                />

                <Field
                  name="stock"
                  as={TextField}
                  label="Stock"
                  type="number"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.stock && touched.stock)}
                  helperText={<ErrorMessage name="stock" />}
                />

                <FormControl component="fieldset" error={Boolean(errors.status && touched.status)}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Field
                          name="status"
                          type="checkbox"
                          as={Checkbox}
                          color="primary"
                          checked={values.status}
                        />
                      }
                      label="Active"
                    />
                    <FormHelperText>
                      <ErrorMessage name="status" />
                    </FormHelperText>
                  </FormGroup>
                </FormControl>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
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

export default AddProducts;
