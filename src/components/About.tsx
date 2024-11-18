import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import GlitchText from './animations/GlitchText';

const About: React.FC = () => {
  const { theme, colors } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  const skills = [
    {
      category: 'Frontend',
      items: ['React', 'TypeScript', 'Next.js', 'TailwindCSS', 'Three.js']
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB']
    },
    {
      category: 'Tools',
      items: ['Git', 'Docker', 'AWS', 'Figma', 'VS Code']
    }
  ];

  return (
    <motion.div
      className="min-h-screen py-24 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <motion.div variants={itemVariants} className="space-y-4">
          <GlitchText
            text="About Me"
            className="text-4xl font-bold mb-8"
            intensity="high"
          />
          <motion.p
            className="text-lg"
            style={{ color: colors.text }}
          >
            I'm a passionate Full Stack Developer with a love for creating immersive digital experiences. 
            My journey in tech has been driven by curiosity and a desire to push the boundaries of what's possible on the web.
          </motion.p>
        </motion.div>

        {/* Skills Section */}
        <motion.div variants={itemVariants} className="space-y-8">
          <GlitchText
            text="Technical Arsenal"
            className="text-2xl font-bold"
            intensity="medium"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                variants={itemVariants}
                className="space-y-4"
              >
                <h3
                  className="text-xl font-semibold"
                  style={{ color: colors.secondary }}
                >
                  {skillGroup.category}
                </h3>
                <div className="space-y-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      className="flex items-center space-x-2"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: colors.accent }}
                      />
                      <span>{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience Highlights */}
        <motion.div variants={itemVariants} className="space-y-8">
          <GlitchText
            text="Journey Highlights"
            className="text-2xl font-bold"
            intensity="medium"
          />
          <div className="space-y-6">
            {[
              {
                year: '2023',
                title: 'Senior Full Stack Developer',
                description: 'Leading development of enterprise applications'
              },
              {
                year: '2021',
                title: 'Full Stack Developer',
                description: 'Building scalable web applications'
              },
              {
                year: '2019',
                title: 'Frontend Developer',
                description: 'Creating responsive user interfaces'
              }
            ].map((highlight, index) => (
              <motion.div
                key={highlight.year}
                className="flex items-start space-x-4"
                variants={itemVariants}
              >
                <div
                  className="px-3 py-1 rounded"
                  style={{
                    background: `${colors.primary}20`,
                    border: `1px solid ${colors.primary}40`,
                    color: colors.primary
                  }}
                >
                  {highlight.year}
                </div>
                <div>
                  <h4
                    className="text-lg font-semibold"
                    style={{ color: colors.secondary }}
                  >
                    {highlight.title}
                  </h4>
                  <p style={{ color: colors.text }}>
                    {highlight.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div variants={itemVariants} className="space-y-6">
          <GlitchText
            text="Beyond Code"
            className="text-2xl font-bold"
            intensity="medium"
          />
          <div
            className="p-6 rounded-lg"
            style={{
              background: `${colors.surface}80`,
              backdropFilter: 'blur(10px)',
              border: `1px solid ${colors.primary}40`
            }}
          >
            <p style={{ color: colors.text }}>
              When I'm not coding, you'll find me exploring new technologies, 
              contributing to open-source projects, and staying up-to-date with 
              the latest developments in web development and design.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
