import logo from './logo.svg';
import './App.css';
import "antd/dist/antd.css";

import React from 'react';
import { Routes, Route } from "react-router-dom";
import LoginPage from './components/auth/loginPage';
import RequiredAuth from './components/auth/requiredAuth';
import PageTemplate from './components/common/pageTemplate';
import HomePage from './components/pages/homePage';

import { AuthProvider } from './components/auth/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<PageTemplate />}>
          <Route path='auth' element={<LoginPage />}/>
          <Route index element={
            <RequiredAuth>
              <HomePage />
            </RequiredAuth>
          } />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
