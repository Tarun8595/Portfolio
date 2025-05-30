import React from 'react';
import { motion } from 'framer-motion';
import './BackgroundEffect.css';

const BackgroundEffect = () => {
  return (
    <div className="background-effect">
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="particle"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundEffect;

