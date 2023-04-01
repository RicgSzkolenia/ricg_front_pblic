import React from 'react';
import Home from './pages/Home/Home';
import { Route,  BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import Header from './components/header/Header';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path="*" element={<Navigate to="/home"/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
