import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 40, color = 'var(--primary-color)' }) => {
  return (
    <motion.div
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'inline-block'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.span
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          border: `3px solid ${color}`,
          borderRadius: '50%',
          borderTopColor: 'transparent',
          display: 'block'
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      <motion.span
        style={{
          position: 'absolute',
          width: '70%',
          height: '70%',
          top: '15%',
          left: '15%',
          border: `3px solid ${color}`,
          borderRadius: '50%',
          borderTopColor: 'transparent',
          display: 'block'
        }}
        animate={{ rotate: -360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </motion.div>
  );
};

export default LoadingSpinner;
