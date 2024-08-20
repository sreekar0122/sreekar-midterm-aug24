import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import RegistrationPage from './components/RegistrationForm';
import LoginPage from './components/LoginForm';
import MembersPage from './components/MemberPage';
import ProtectedRoute from './protectedRoute'; 


const HomePage = lazy(() => import('./components/HomePage'));
const AdminPage = lazy(() => import('./components/AdminPage'));
const AddProducts = lazy(() => import('./components/Addproducts'));
const AddCategory = lazy(()=> import('./components/AddCategory'))
const App = () => {
  return (
    <Router>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/members" element={<MembersPage />} />
           
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-product"
              element={
                <ProtectedRoute>
                  <AddProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-category"
              element={
                <ProtectedRoute>
                  <AddCategory />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
    </Router>
  );
};

export default App;