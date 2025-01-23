import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import SidePage from './components/SidePage/SidePage';
import UserDataPage from './pages/UserDataPage';

import './main.css';

createRoot(document.getElementById('root')).render(
      <StrictMode>
            <Router>
                  <div className="app-container">
                        <Header />
                        <div className="main-content">
                              <SidePage />
                              <div className="page-content">
                                    <Routes>
                                          <Route path="/user/:userId" element={<UserDataPage />} />
                                    </Routes>
                              </div>
                        </div>
                  </div>
            </Router>
      </StrictMode>
);
