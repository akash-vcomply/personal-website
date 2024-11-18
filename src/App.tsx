import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <div className="min-h-screen" style={{ overflow: 'hidden' }}>
          <Navbar />
          <AnimatePresence mode="wait">
            <main className="pt-16">
              <AppRoutes />
            </main>
          </AnimatePresence>
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;
