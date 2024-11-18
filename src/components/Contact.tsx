import React from 'react';
import PageTemplate from './templates/PageTemplate';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import GlitchEffect from './animations/GlitchEffect';

const Contact: React.FC = () => {
  const { colors } = useTheme();

  const contactInfo = [
    {
      type: 'Email',
      value: 'your.email@example.com',
      icon: '✉️'
    },
    {
      type: 'LinkedIn',
      value: 'linkedin.com/in/yourusername',
      icon: '💼'
    },
    {
      type: 'GitHub',
      value: 'github.com/yourusername',
      icon: '💻'
    }
  ];

  return (
    <PageTemplate title="Contact">
      <div className="max-w-3xl mx-auto">
        <div className="grid gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-lg"
            style={{
              background: `${colors.surface}`,
              border: `1px solid ${colors.primary}40`,
              boxShadow: `0 0 20px ${colors.glow}20`
            }}
          >
            <form className="space-y-6">
              <div>
                <label 
                  className="block mb-2"
                  style={{ color: colors.primary }}
                >
                  Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 rounded-md"
                  style={{
                    background: `${colors.background}`,
                    border: `1px solid ${colors.primary}40`,
                    color: colors.text
                  }}
                />
              </div>

              <div>
                <label 
                  className="block mb-2"
                  style={{ color: colors.primary }}
                >
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-3 rounded-md"
                  style={{
                    background: `${colors.background}`,
                    border: `1px solid ${colors.primary}40`,
                    color: colors.text
                  }}
                />
              </div>

              <div>
                <label 
                  className="block mb-2"
                  style={{ color: colors.primary }}
                >
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full p-3 rounded-md"
                  style={{
                    background: `${colors.background}`,
                    border: `1px solid ${colors.primary}40`,
                    color: colors.text
                  }}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 rounded-md"
                style={{
                  background: `${colors.primary}20`,
                  border: `1px solid ${colors.primary}40`,
                  color: colors.primary
                }}
              >
                <GlitchEffect intensity="low" onHover={true}>
                  Send Message
                </GlitchEffect>
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg text-center"
                style={{
                  background: `${colors.surface}`,
                  border: `1px solid ${colors.primary}40`,
                  boxShadow: `0 0 20px ${colors.glow}20`
                }}
              >
                <div 
                  className="text-3xl mb-2"
                  style={{ color: colors.primary }}
                >
                  {info.icon}
                </div>
                <div 
                  className="font-bold mb-1"
                  style={{ color: colors.accent }}
                >
                  {info.type}
                </div>
                <div style={{ color: colors.text }}>
                  {info.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Contact;
