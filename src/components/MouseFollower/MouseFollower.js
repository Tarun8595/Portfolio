import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      className="mouse-follower"
      animate={{ x: mousePosition.x - 5, y: mousePosition.y - 5 }}
      transition={{ type: 'spring', stiffness: 5000, damping: 100}}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 20,
        height: 20,
       borderRadius: '50%',
        //backgroundSize: '100% 100%',
        //backgroundImage: 'url(/E11UASS-transformed.avif)',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
      }}
    />
  );
};

export default MouseFollower;

