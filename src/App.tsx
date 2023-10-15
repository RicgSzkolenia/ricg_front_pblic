import React, { useEffect } from 'react';
import Home from './pages/Home/Home';
import { Route,  BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import Header from './components/header/Header';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import Login from './pages/Login/LoginForm';
import FileUpload from './pages/FileUpload/FileUpload';
import CoursesPage from './pages/Courses/Courses';
import ProtectedRoute from './components/common/ProtectedRoute';
import CourseDetailsPage from './pages/Course/CourseDetailsPage';
import CertificatePresentationPage from './pages/Certificate/CertificatePresentation';
import ContactPage from './pages/Contact/ContactPage';
import Cart from './pages/Cart/Cart';
import PaymentStatus from './pages/PaymentStatus/PaymentStatus';
import StatsPage from './pages/Admin/StatsPage/StatsPage';

function App() {
 
  axios.interceptors.request.use((req) => {
    const authToken = process.env.REACT_APP_API_TOKEN;
    req.headers["Authorization"] = `bearer ${authToken}`
    return req;
});

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/product/:id' element={<CourseDetailsPage/>}/>
          <Route path='/products' element={<CoursesPage/>}/>
          <Route path='/check/:id' element={<CertificatePresentationPage/>} />
          <Route path='/contact' element={<ContactPage/>}/>
          <Route path='/cart' element={<Cart/>} />
          <Route path='/status/payment' element={<PaymentStatus/>}/>
          <Route path='/dates/:id'/>
          <Route path='/dates/participants'/>
          <Route path='/dates/participants/:id'/>
          <Route element={<ProtectedRoute/>}>
            <Route path='/repup' element={<FileUpload/>}/>
            <Route path='/stats' element={<StatsPage/>}/>
          </Route>
       
        </Routes>
      </Router>
    </>
  );
}

export default App;
