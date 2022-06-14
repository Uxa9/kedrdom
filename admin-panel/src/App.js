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
import { HeaderProvider } from './components/common/HeaderProvider';
import TypesPage from './components/pages/typesPage';
import TypePage from './components/pages/typePage';

function App() {
  return (
    <AuthProvider>
      <HeaderProvider>
        <Routes>
            <Route path='/' element={<PageTemplate />}>
              <Route path='auth' element={<LoginPage />}/>
              <Route index element={
                <RequiredAuth>
                  <HomePage />
                </RequiredAuth>
              } />
              <Route path='goods' element={
                <RequiredAuth>
                  <TypesPage />
                </RequiredAuth>
              } />
              <Route path='goods/:id' element={
                  <RequiredAuth>
                    <TypePage />
                  </RequiredAuth>
              } />
            </Route>
        </Routes>
      </HeaderProvider>
    </AuthProvider>
  );
}

export default App;
