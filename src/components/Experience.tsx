import React from 'react';
import PageTemplate from './templates/PageTemplate';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import GlitchEffect from './animations/GlitchEffect';

const Experience: React.FC = () => {
  const { colors } = useTheme();

  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "Tech Innovations Inc.",
      period: "2022 - Present",
      description: "Leading development of cutting-edge web applications using React and TypeScript.",
      achievements: [
        "Implemented new frontend architecture",
        "Reduced load times by 40%",
        "Mentored junior developers"
      ]
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd",
      period: "2020 - 2022",
      description: "Developed and maintained multiple web applications using modern technologies.",
      achievements: [
        "Built scalable backend services",
        "Improved system performance",
        "Implemented CI/CD pipeline"
      ]
    },
    {
      title: "Web Developer",
      company: "Creative Agency",
      period: "2018 - 2020",
      description: "Created responsive websites and web applications for various clients.",
      achievements: [
        "Delivered 20+ client projects",
        "Optimized website performance",
        "Implemented modern UI/UX designs"
      ]
    }
  ];

  return (
    <PageTemplate title="Experience">
      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px"
            style={{
              borderLeft: `2px solid ${colors.primary}40`
            }}
          >
            <div className="relative">
              {/* Timeline Dot */}
              <div
                className="absolute -left-[41px] top-2 w-5 h-5 rounded-full"
                style={{
                  background: colors.background,
                  border: `2px solid ${colors.primary}`,
                  boxShadow: `0 0 10px ${colors.glow}`
                }}
              />

              <GlitchEffect intensity="low" onHover={true}>
                <h2 
                  className="text-2xl font-bold mb-2"
                  style={{ color: colors.primary }}
                >
                  {exp.title}
                </h2>
              </GlitchEffect>

              <div 
                className="text-lg mb-2"
                style={{ color: colors.accent }}
              >
                {exp.company}
              </div>

              <div 
                className="text-sm mb-4"
                style={{ color: colors.secondary }}
              >
                {exp.period}
              </div>

              <p 
                className="mb-4"
                style={{ color: colors.text }}
              >
                {exp.description}
              </p>

              <ul className="space-y-2">
                {exp.achievements.map((achievement, achieveIndex) => (
                  <motion.li
                    key={achieveIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + achieveIndex * 0.1 }}
                    className="flex items-center"
                    style={{ color: colors.text }}
                  >
                    <span
                      className="mr-2 text-xs"
                      style={{ color: colors.accent }}
                    >
                      ⚡
                    </span>
                    {achievement}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </PageTemplate>
  );
};

export default Experience;
