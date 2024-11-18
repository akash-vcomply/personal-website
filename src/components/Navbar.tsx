import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const { colors } = useTheme();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/experience', label: 'Experience' },
    { to: '/projects', label: 'Projects' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' }
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{
        background: `${colors.background}80`,
        borderBottom: `1px solid ${colors.primary}40`
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-bold" style={{ color: colors.primary }}>
            AKASH PATIL
          </NavLink>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `
                  px-3 py-2 transition-colors duration-200
                  ${isActive ? 'text-primary' : 'hover:text-primary'}
                `}
                style={({ isActive }) => ({
                  color: isActive ? colors.primary : colors.text
                })}
              >
                {label}
              </NavLink>
            ))}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
