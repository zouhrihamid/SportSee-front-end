import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import UserDataPage from './pages/UserDataPage';

createRoot(document.getElementById('root')).render(
      <StrictMode>
            <Router>
                  <Header />
                  <Routes>
                        <Route path="/user/:userId" element={<UserDataPage />} /> {/* La route dynamique */}
                  </Routes>
            </Router>
      </StrictMode>
);
