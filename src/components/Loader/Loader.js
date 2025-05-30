import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import "./Loader.css"

const Loader = ({ displayTime = 9000, onComplete }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete()
    }, displayTime)

    const interval = setInterval(() => {
      setCount((prev) => Math.min(prev + 100 / (displayTime / 100), 100))
    }, 100)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [displayTime, onComplete])

  const bounceAnimation = {
    y: [0, -20, 0],
    transition: {
      y: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 1,
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.div
      className="loader-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3 }}
    >
      <motion.img src="tarun-robot2.png" className="loader_img" animate={bounceAnimation} />
      <motion.div
        className="loader-counter"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 10 }}
      >
        {Math.round(count)}%<br />
        Loading...
      </motion.div>
    </motion.div>
  )
}

export default Loader

