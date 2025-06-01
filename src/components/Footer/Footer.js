"use client"

import { useEffect, useRef, useState } from "react"
import "./Footer.css"

const Footer = () => {
  const footerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentTime, setCurrentTime] = useState("")

  // Update time function
  const updateTime = () => {
    const now = new Date()
    const timeString = now.toLocaleTimeString("en-US", {
      timeZone: "Asia/Kolkata",
      hour12: false,
      hour: "numeric",
      minute: "2-digit",
    })
    setCurrentTime(`Delhi, INDIA ${timeString}`)
  }

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  // Update time every minute
  useEffect(() => {
    updateTime()
    const timeInterval = setInterval(updateTime, 60000)
    return () => clearInterval(timeInterval)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Navigation links data
  const mainNavLinks = [
  { label: "HOME", id: "home" },
  { label: "ABOUT", id: "about" },
  { label: "PROJECTS", id: "projects" },
  { label: "CONTACT", id: "contact" }
]

  const socialLinks = [
  { name: "Github", url: "https://github.com/Tarun8595" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/tarun-kushwaha-7519a131a/" },
]

  return (
    <div className="footer-wrapper">
      {/* Video Section */}
      <div className="video-section">
        <video className="footer-video" autoPlay muted loop playsInline>
          <source src="/hello.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Footer Section */}
      <footer className="animated-footer" ref={footerRef}>
        {/* Main Content */}
        <div className="footer-container">
          <div className="footer-grid">
            {/* Get In Touch Section */}
            <div className="footer-section footer-contact-section">
              <p className="footer-get-touch">| Get In Touch</p>
              <p className="footer-line">Let’s collaborate and build something great</p>
              <p className="footer-contact-number">+ 91 8595703558</p>
            </div>

            {/* Navigation Links */}
            <div className="footer-section nav-section">
              <div className="nav-columns">
                <div
                  className={`nav-column fade-in-element ${isVisible ? "animate" : ""}`}
                  style={{ animationDelay: "300ms" }}
                >
                  <nav className="nav-list">
                    {mainNavLinks.map((item, index) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`nav-link ${isVisible ? "animate" : ""}`}
                        style={{ animationDelay: `${1000 + index * 1000}ms` }}
                      >
                        {item.label}
                      </a>

                    ))}
                  </nav>
                </div>

                <div
                  className={`nav-column fade-in-element ${isVisible ? "animate" : ""}`}
                  style={{ animationDelay: "400ms" }}
                >
                  <nav className="nav-list">
                    {socialLinks.map((item, index) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`nav-link ${isVisible ? "animate" : ""}`}
                      style={{ animationDelay: `${500 + index * 100}ms` }}
                    >
                      {item.name}
                    </a>
                    ))}

                  </nav>
                </div>
              </div>
            </div>

            {/* 3D Element */}
            <div className="footer-section sphere-section">
              <div
                className={`sphere-container fade-in-element ${isVisible ? "animate" : ""}`}
                style={{ animationDelay: "600ms" }}
              >
                <div className="sphere-wrapper">
                  <img src="lines-unscreen.gif" alt="3d model"></img>
                </div>
              </div>
            </div>
          </div>

          {/* Large Heading with Letter Animation */}
          <div className="heading-section">
            <h1 className="main-heading">
              <span className="heading-word">
                {"Tarun".split("").map((letter, index) => (
                  <span
                    key={`dotsart-${index}`}
                    className={`letter ${isVisible ? "animate" : ""}`}
                    style={{ animationDelay: `${800 + index * 50}ms` }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
              <span className="heading-word">
                {"Kushwaha".split("").map((letter, index) => (
                  <span
                    key={`studio-${index}`}
                    className={`letter ${isVisible ? "animate" : ""}`}
                    style={{ animationDelay: `${800 + (7 + index) * 50}ms` }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            </h1>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-container">
            <div className="bottom-content">
              <div className={`fade-in-element ${isVisible ? "animate" : ""}`} style={{ animationDelay: "1000ms" }}>
               | May 2025
              </div>
              <div className={`fade-in-element ${isVisible ? "animate" : ""}`} style={{ animationDelay: "1100ms" }}>
                {currentTime}
              </div>
              <button
                className={`back-to-top fade-in-element ${isVisible ? "animate" : ""}`}
                style={{ animationDelay: "1200ms" }}
                onClick={scrollToTop}
              >
                BACK TO TOP
                <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
