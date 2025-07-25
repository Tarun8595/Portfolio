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

  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async (e) => {
  e.preventDefault();

  setIsSending(true);


  const name = document.getElementById("new_friend_name").value;
  const email = document.getElementById("new_friend_mail").value;
  const message = document.getElementById("new_friend_msg").value;

  const payload = { name, email, message };


  try {
    const res = await fetch("http://localhost:5000/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      document.getElementById("contact-form").reset();
    } else {
      alert("Failed to send message: " + data.error);
    }
  } catch (err) {
    alert("Error: " + err.message);
  }

  setIsSending(false);
};


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
    <section id="contact">
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
              
              <div className="msg-sending-loader">{isSending && <p>Sending message... <img src="/msg-loader.gif" alt="msg-runner" className="msg-loader-img"></img></p>}</div>

              <form onSubmit={handleSubmit} className="contact-form" id="contact-form">
                <div className="form-row">
                  <input type="text" placeholder="Name" id="new_friend_name" className="form-input" required />
                  <input type="email" placeholder="Email" id="new_friend_mail" className="form-input" required />
                </div>

                <textarea
                  placeholder="Write your message and take the first step in starting our conversation 😊"
                  className="form-textarea"
                  id="new_friend_msg"
                  rows="6"
                  required
                ></textarea>

                <div className="form-checkbox">
                  <input type="checkbox" id="new_friend_privacy" required />
                  <label htmlFor="privacy">
                    I've accepted the{""}
                    <a href="tarun_work" className="privacy-link">
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
                  <a href="https://github.com/Tarun8595" className="social-icon">
                    <img src="https://cdn-icons-png.flaticon.com/128/11376/11376446.png" alt="github"></img>
                  </a>
                  <a href="https://www.linkedin.com/in/tarun-kushwaha-7519a131a/" className="social-icon">
                    <img src="https://cdn-icons-png.flaticon.com/128/3670/3670129.png" alt="linkedin"></img>
                  </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  )
}
