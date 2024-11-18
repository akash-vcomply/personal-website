import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 90, category: 'Frontend' },
  { name: 'TypeScript', level: 85, category: 'Frontend' },
  { name: 'HTML/CSS', level: 95, category: 'Frontend' },
  { name: 'Vue.js', level: 80, category: 'Frontend' },
  
  // Backend
  { name: 'Node.js', level: 85, category: 'Backend' },
  { name: 'Python', level: 80, category: 'Backend' },
  { name: 'Java', level: 75, category: 'Backend' },
  { name: 'SQL', level: 85, category: 'Backend' },
  
  // DevOps
  { name: 'Docker', level: 80, category: 'DevOps' },
  { name: 'AWS', level: 75, category: 'DevOps' },
  { name: 'CI/CD', level: 85, category: 'DevOps' },
  { name: 'Kubernetes', level: 70, category: 'DevOps' },
];

const SkillBar: React.FC<{ skill: Skill }> = ({ skill }) => {
  const { isCyberpunk, colors } = useTheme();
  
  return (
    <motion.div
      className={`mb-4 ${
        isCyberpunk 
          ? 'text-neon-pink' 
          : 'text-gray-800 dark:text-gray-200'
      }`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex justify-between mb-1">
        <span className={`text-sm font-medium ${
          isCyberpunk 
            ? 'text-neon-pink' 
            : 'text-gray-700 dark:text-gray-300'
        }`}>
          {skill.name}
        </span>
        <span className={`text-sm font-medium ${
          isCyberpunk 
            ? 'text-neon-pink' 
            : 'text-gray-600 dark:text-gray-400'
        }`}>
          {skill.level}%
        </span>
      </div>
      <div className={`h-2 rounded-full ${
        isCyberpunk 
          ? 'bg-cyber-black' 
          : 'bg-gray-200 dark:bg-gray-700'
      }`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-2 rounded-full ${
            isCyberpunk
              ? 'bg-neon-pink'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-500 dark:to-pink-500'
          }`}
        />
      </div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const { isCyberpunk } = useTheme();
  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <motion.div
      className={`min-h-screen p-8 ${
        isCyberpunk 
          ? 'bg-cyber-black text-neon-pink' 
          : 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className={`text-4xl font-bold mb-8 ${
        isCyberpunk 
          ? 'text-neon-pink' 
          : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r from-purple-400 to-pink-600'
      }`}>
        Skills
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`p-6 rounded-lg ${
              isCyberpunk
                ? 'bg-cyber-black shadow-[0_0_15px_rgba(177,74,237,0.1)]'
                : 'bg-white shadow-lg dark:bg-gray-800 dark:shadow-[0_0_15px_rgba(177,74,237,0.1)]'
            }`}
          >
            <h2 className={`text-xl font-semibold mb-4 ${
              isCyberpunk 
                ? 'text-neon-pink' 
                : 'text-gray-800 dark:text-gray-100'
            }`}>
              {category}
            </h2>
            {skills
              .filter(skill => skill.category === category)
              .map(skill => (
                <SkillBar key={skill.name} skill={skill} />
              ))}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Skills;
