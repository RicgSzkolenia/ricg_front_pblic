import React from 'react';
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
         
          <Route element={<ProtectedRoute/>}>
            <Route path='/upload' element={<FileUpload/>}/>
          </Route>
       
        </Routes>
      </Router>
    </>
  );
}

export default App;
