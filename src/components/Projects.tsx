import React from 'react';
import PageTemplate from './templates/PageTemplate';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import GlitchEffect from './animations/GlitchEffect';

const Projects: React.FC = () => {
  const { colors } = useTheme();

  const projects = [
    {
      title: "Cyberpunk Portfolio",
      description: "A cutting-edge personal portfolio website with cyberpunk aesthetics",
      tech: ["React", "TypeScript", "Framer Motion", "TailwindCSS"],
      link: "#"
    },
    {
      title: "AI Code Assistant",
      description: "Intelligent code completion and suggestion system",
      tech: ["Python", "TensorFlow", "FastAPI"],
      link: "#"
    },
    {
      title: "E-Commerce Platform",
      description: "Modern e-commerce solution with real-time inventory",
      tech: ["Next.js", "Node.js", "MongoDB"],
      link: "#"
    }
  ];

  return (
    <PageTemplate title="Projects">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-lg relative overflow-hidden group"
            style={{
              background: `${colors.surface}`,
              border: `1px solid ${colors.primary}40`,
              boxShadow: `0 0 20px ${colors.glow}20`
            }}
          >
            {/* Hover Effect Background */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
              style={{
                background: `linear-gradient(45deg, ${colors.primary}, ${colors.accent})`
              }}
            />

            <GlitchEffect intensity="low" onHover={true}>
              <h2 
                className="text-xl font-bold mb-3"
                style={{ color: colors.primary }}
              >
                {project.title}
              </h2>
            </GlitchEffect>

            <p 
              className="mb-4"
              style={{ color: colors.text }}
            >
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 text-sm rounded"
                  style={{
                    background: `${colors.primary}20`,
                    color: colors.primary,
                    border: `1px solid ${colors.primary}40`
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href={project.link}
              className="inline-block mt-2 px-4 py-2 rounded transition-all"
              style={{
                background: `${colors.primary}20`,
                color: colors.primary,
                border: `1px solid ${colors.primary}40`
              }}
            >
              View Project
            </a>
          </motion.div>
        ))}
      </div>
    </PageTemplate>
  );
};

export default Projects;
