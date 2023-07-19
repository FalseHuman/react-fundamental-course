import React from 'react';
import './styles/App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import About from './pages/About';
import Posts from './pages/Posts';
import Navbar from './components/UI/Navbar.jsx';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" Component={Posts}/>
          <Route path="/about" Component={About}/>
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
    </BrowserRouter>
  )
}

export default App;
