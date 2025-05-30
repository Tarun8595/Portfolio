"use client"

import { useState, useEffect, useRef } from "react"
import "./Contact.css"

export default function Contact() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, angle: 45 })
  const [isStretching, setIsStretching] = useState(false)
  const buttonRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted")
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
    setIsStretching(false)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setMousePosition({ x: 0, y: 0, angle: 45 })
    setIsStretching(true)

    // Remove stretch effect after animation
    setTimeout(() => {
      setIsStretching(false)
    }, 600)
  }

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const x = e.clientX - centerX
    const y = e.clientY - centerY

    // Calculate angle for arrow rotation
    const angle = Math.atan2(y, x) * (180 / Math.PI)

    setMousePosition({ x, y, angle })
  }

  return (
    <div className="contact-wrapper">
      {/* Main Contact Section */}
      <section ref={sectionRef} className={`contact-section ${isVisible ? "animate-in" : ""}`}>
        <div className="contact-content">
          <h1 className="contact-title">
            <span className="title-main slide-from-left">LET'S Talk</span>
            <span className="title-script slide-from-center">& Make Something Great</span>
            <span className="title-main slide-from-right">TOGETHER</span>
          </h1>

          <button
            ref={buttonRef}
            className={`contact-button ${isStretching ? "stretch" : ""}`}
            onClick={toggleForm}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <span className="button-text">OPEN CONTACT FORM</span>
            <span
              className="button-icon"
              style={{
                transform: isHovering
                  ? `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px) rotate(${mousePosition.angle || 0}deg)`
                  : "translate(0, 0) rotate(45deg)",
              }}
            >
              ↗
            </span>
          </button>
        </div>
      </section>

      {/* Contact Form Modal */}
      <div className={`form-overlay ${isFormOpen ? "active" : ""}`}>
        <div className={`form-container ${isFormOpen ? "slide-down" : ""}`}>
          <div className="form-content">
            <div className={`form-left ${isFormOpen ? "slide-from-top" : ""}`}>
              <button className="close-button" onClick={toggleForm}>
                ×
              </button>

              <h2 className="form-title">
                <span className="form-title-main">GET IN</span>
                <span className="form-title-script">Touch</span>
              </h2>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <input type="text" placeholder="Name" className="form-input" required />
                  <input type="email" placeholder="Email" className="form-input" required />
                </div>

                <textarea
                  placeholder="What can I help you with?"
                  className="form-textarea"
                  rows="6"
                  required
                ></textarea>

                <div className="form-checkbox">
                  <input type="checkbox" id="privacy" required />
                  <label htmlFor="privacy">
                    I've accepted the{" "}
                    <a href="#" className="privacy-link">
                      privacy policy
                    </a>
                    .*
                  </label>
                </div>

                <button type="submit" className="submit-button">
                  SUBMIT MESSAGE
                </button>
              </form>
            </div>

            <div className={`form-right ${isFormOpen ? "slide-from-bottom" : ""}`}>
              <img
                src="contact-form-img.jpg"
                alt="Minimalist flower illustration"
                className="form-image"
              />

              <div className="contact-info">
                <p className="contact-text">
                  You can also contact me at
                  <br />
                  <a href="mailto:hey@aust.design" className="contact-email">
                    tarunkhuswaha456@gmail.com
                  </a>
                </p>
              </div>
              <div className="social-icons">
                  <a href="#" className="social-icon">
                    <img src="https://cdn-icons-png.flaticon.com/128/3670/3670133.png"></img>
                  </a>
                  <a href="#" className="social-icon">
                    <img src="https://cdn-icons-png.flaticon.com/128/11376/11376446.png"></img>
                  </a>
                  <a href="#" className="social-icon">
                    <img src="https://cdn-icons-png.flaticon.com/128/3670/3670129.png"></img>
                  </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
