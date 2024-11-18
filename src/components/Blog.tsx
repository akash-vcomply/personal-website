import React from 'react';
import PageTemplate from './templates/PageTemplate';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const Blog: React.FC = () => {
  const { colors } = useTheme();

  const blogPosts = [
    {
      title: "Getting Started with React and TypeScript",
      date: "2024-01-15",
      excerpt: "A comprehensive guide to setting up and using React with TypeScript..."
    },
    {
      title: "Building Modern Web Applications",
      date: "2024-01-10",
      excerpt: "Explore the latest techniques and best practices for web development..."
    },
    {
      title: "Mastering CSS Grid and Flexbox",
      date: "2024-01-05",
      excerpt: "Deep dive into modern CSS layout techniques..."
    }
  ];

  return (
    <PageTemplate title="Blog">
      <div className="grid gap-6">
        {blogPosts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-lg"
            style={{
              background: `${colors.surface}`,
              border: `1px solid ${colors.primary}40`,
              boxShadow: `0 0 20px ${colors.glow}20`
            }}
          >
            <h2 
              className="text-2xl font-bold mb-2"
              style={{ color: colors.primary }}
            >
              {post.title}
            </h2>
            <p 
              className="text-sm mb-4"
              style={{ color: colors.accent }}
            >
              {post.date}
            </p>
            <p style={{ color: colors.text }}>
              {post.excerpt}
            </p>
          </motion.div>
        ))}
      </div>
    </PageTemplate>
  );
};

export default Blog;
