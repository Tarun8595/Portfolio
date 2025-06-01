import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from "../Navbar/Navbar"
import { useTypewriter } from "./UseTypewrite"
import "./Home.css"
import About from "../About/About"
import Gallary from "../Gallary/Gallary"
import Project from "../Projects/Project"
import ScrollTriggered from "../ShowProjects/showproject"
import Contact from "../Contact/Contact"
import Footer from "../Footer/Footer"


export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const typewriterText = useTypewriter(
    ["👋 Hii I'm Tarun", "Welcome to my portfolio", "Check out my projects"],
    100,
    50,
  )

  const bounceAnimation = {
    y: [200, 190, 200],
    transition: {
      y: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 1,
        ease: "easeInOut",
      },
    },
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  },
   []

)


  return (
    <>
    <section id="home">
      <div className={`Home_main_container ${isVisible ? "visible" : ""}`}>
      <Navbar />
      <div className="Home_content">
        <h1>{typewriterText}</h1>
      </div>
      <motion.p className="scroll-btn" animate={bounceAnimation}>Scroll Down</motion.p>
      </div>
      <About />
      <Gallary />
      <Project />
      <ScrollTriggered />
      <Contact />
      <Footer />
    </section>
    </>
  )
}

