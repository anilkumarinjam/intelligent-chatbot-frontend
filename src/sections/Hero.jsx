import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const features = [
    {
      icon: '🎯',
      title: 'Natural Language Queries',
      description: 'Ask questions about your data in plain English and get instant insights'
    },
    {
      icon: '📊',
      title: 'Interactive Visualizations',
      description: 'Generate beautiful charts and graphs to understand your data better'
    },
    {
      icon: '⚡',
      title: 'Real-time Analysis',
      description: 'Get instant answers with powerful data processing capabilities'
    },
    {
      icon: '🔄',
      title: 'Multiple Data Sources',
      description: 'Connect to Excel, SQL databases, CSV files, and more'
    }
  ];

  return (
    <motion.section 
      className="hero-section"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="hero-content">
        <motion.h1
          className="gradient-text"
          variants={itemVariants}
        >
          Transform Your Data Journey
        </motion.h1>
        
        <motion.p
          className="hero-subtitle"
          variants={itemVariants}
        >
          Your AI-powered data companion that makes analysis simple and intuitive
        </motion.p>

        <motion.div 
          className="feature-grid"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card glass-effect"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="feature-icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="demo-section"
          variants={itemVariants}
        >
          <div className="demo-text">
            <h2>How it works</h2>
            <p>Just ask your question in natural language:</p>
            <div className="example-queries">
              <motion.div 
                className="query-example glass-effect"
                whileHover={{ scale: 1.02 }}
              >
                "Show me monthly sales trends for the last year"
              </motion.div>
              <motion.div 
                className="query-example glass-effect"
                whileHover={{ scale: 1.02 }}
              >
                "What are the top 5 products by revenue?"
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="background-shapes"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
