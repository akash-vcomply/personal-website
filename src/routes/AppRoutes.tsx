import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Home from '../components/Home';
import About from '../components/About';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Blog from '../components/Blog';
import Contact from '../components/Contact';

const pageTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route
        path="/"
        element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
            transition={{ duration: 0.3 }}
          >
            <Home />
          </motion.div>
        }
      />
      <Route
        path="/about"
        element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
            transition={{ duration: 0.3 }}
          >
            <About />
          </motion.div>
        }
      />
      <Route
        path="/experience"
        element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
            transition={{ duration: 0.3 }}
          >
            <Experience />
          </motion.div>
        }
      />
      <Route
        path="/skills"
        element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
            transition={{ duration: 0.3 }}
          >
            <Skills />
          </motion.div>
        }
      />
      <Route
        path="/projects"
        element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
            transition={{ duration: 0.3 }}
          >
            <Projects />
          </motion.div>
        }
      />
      <Route
        path="/blog"
        element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
            transition={{ duration: 0.3 }}
          >
            <Blog />
          </motion.div>
        }
      />
      <Route
        path="/contact"
        element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
            transition={{ duration: 0.3 }}
          >
            <Contact />
          </motion.div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
