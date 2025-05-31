import React, { useEffect, useRef } from "react"
import { motion, useAnimation, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import "./About.css"


const About = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  })

  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const letters = "HELLOOOO".split("")

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  const letterVariants = {
    hidden:(i) => ({
      y: 100,
      opacity: 0,
      transition: {
        delay: i * 0.1,
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
    visible: (i) => ({
      y: -100,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  }

  // Smooth transformations for the profile 
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 1])
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.8, 1], [0, 0.5, 1])

  return (
    <section ref={containerRef} className="about-section">
      <div className="about-content" ref={ref}>
        <div className="hello-text">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={letterVariants}
              initial="hidden"
              animate={controls}
              className="large-letter"
            >
              {letter}
            </motion.span>
          ))}
        </div>

        <motion.div
          className="profile-image"
          style={{ opacity: imageOpacity }}
        >
          <img src="https://i.pinimg.com/736x/d4/87/82/d48782516e365280d61c8eaf9c28bd78.jpg" alt="Profile" />
        </motion.div>

        <motion.div className="content-wrapper" style={{ opacity: contentOpacity }}>
          <div className="about-description">
            <h2 className="about-subheading">About Me</h2>
            <p className="intro-text">
              My name is Tarun, and I'm a front-end developer, who creates websites with a special focus on animations
              and user interaction.
            </p>
            <p className="secondary-text">
              I'm ready to bring your ideas to life and add a touch of originality to the online space.
            </p>
          </div>
          <img src="https://i.pinimg.com/736x/a7/94/7f/a7947f1ebd1d3a8ad5c4a94f6d7c9f9d.jpg" className="content-img" alt="about_image"></img>
        </motion.div>
        <div className="more-about">
          <span>Let's make your project special!</span>a
          <a href="#more" className="more-link">
            MORE ABOUT ME
          </a>
        </div>
      </div>
    </section>
  )
}

export default About
