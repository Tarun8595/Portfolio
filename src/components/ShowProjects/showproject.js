"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ScrollTriggered() {
  return (
    <div style={container}>
      {work.map(([imgSrc, splashColor, name, description, complete, duration, pages, link], i) => (
        <Card
          i={i}
          imgSrc={imgSrc}
          splashColor={splashColor}
          name={name}
          description={description}
          complete={complete}
          duration={duration}
          pages={pages}
          link={link}
          key={i}
        />
      ))}
    </div>
  );
}

function Card({ imgSrc, splashColor, i, name, description, complete, duration, pages, link }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const blur = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [10, 0, 0, 10]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <div ref={ref} style={sectionContainer}>
      {/* Left Text */}
      <motion.div
        style={leftText}
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.5 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <h1 style={textTitle}>{name}</h1>
        <p style={textDescription}>{description}</p>
      </motion.div>

      {/* Card Container */}
      <motion.div
        className={`card-container-${i}`}
        style={{
          ...cardContainer,
          filter: `blur(${blur}px)`,
          opacity,
        }}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.8 }}
      >
        <div
          className="card-design"
          style={{ ...splash, backgroundColor: splashColor }}
        />
        <motion.div style={card} variants={cardVariants} className="card">
          <div style={cardContent}>
            <div style={imageContainer}>
              <img src={imgSrc} alt={name} style={imageStyle} />
            </div>
            <motion.button
              style={projectButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(link, "_blank")}
            >
              View Project
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Text */}
      <motion.div
        style={rightText}
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div style={nutritionInfo}>
          <div style={nutritionItem}>
            <span style={nutritionLabel}>Complete</span>
            <span style={nutritionValue}>{complete}</span>
          </div>
          <div style={nutritionItem}>
            <span style={nutritionLabel}>Duration</span>
            <span style={nutritionValue}>{duration}</span>
          </div>
          <div style={nutritionItem}>
            <span style={nutritionLabel}>Pages</span>
            <span style={nutritionValue}>{pages}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Animation Variants
const cardVariants = {
  offscreen: {
    y: 300,
    scale: 0.3,
    rotate: 0,
    opacity: 0,
  },
  onscreen: {
    y: 50,
    scale: 1,
    rotate: -10,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1.2,
      staggerChildren: 0.1,
    },
  },
};

// =================== Work Data ===================

const work = [
  ["figof.png", "#1d1d1d", "Figof", "A dating website where users create profiles, chat, share stories, and get partner suggestions. Built with HTML, CSS, Bootstrap.", "100%", "1 day", "One", "https://figof.com"],
  ["natural-makeup.png", "#FFA500", "Natural Makeup Clone", "A simple clone of the Natural Makeup site showing products, their uses, and a short video. Built with HTML and CSS.", "95%", "2 days", "One", "https://h-tarun-c.github.io/Natural-Makeup/"],
  ["booth-app.png", "#FDE910", "Booth App", "A social media app with chat, calls, notifications, cloud features, games, and payments. Built with HTML, CSS, Bootstrap.", "100%", "1 days", "One", "https://booth-app.onrender.com/"],
  ["todo-list.png", "#D1E231", "Todo List", "A task manager with two cards for setting and viewing task details, notes, and checklists. Built with HTML, CSS, JS.", "90%", "3 day", "One", "https://todo-qqh9.onrender.com/"],
  ["music.png", "#A8E6CF", "Music Player", "A frontend design of a music player with playlist, lyrics, favorites, and search features. Built with HTML, CSS, JS.", "85%", "2 days", "One", "https://music-player-unty.onrender.com/"],
  ["slci-project.png", "#8A2BE2", "SLCI Data Manager", "A web app to manage student data: registration, inquiry, fees, and receipts. Built with HTML, CSS, Bootstrap, JS, Django, MySQL.", "90%", "5 days", "Multi", "https://github.com/Tarun8595/Data_management"],
  ["multi-step.png", "#6A0DAD", "Profile Manager", "A multi-step user profile system with view and update features after login. Built with HTML, CSS, Bootstrap, JS, Django, MongoDB.", "95%", "2 days", "Two", "https://multi-step-profile-lmc7.onrender.com/"],
  ["kutto.png", "#9B59B6", "Kutto Clone", "A pet website to buy, sell, or adopt dogs. Built with HTML and CSS.", "80%", "3 days", "Multi", "https://kutto.onrender.com/index.html"],
];

// =================== Styles ===================
  
const container = {
  paddingBottom: 20,
  paddingTop: 50,
  width: "100%",
  background: "#d9d9d9",
};

const sectionContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 200,
  gap: 40,
  padding: "0 20px",
};

const cardContainer = {
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  paddingTop: 20,
  flex: "0 0 auto",
};

const splash = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 200.5 C 600.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
};

const card = {
  width: 300,
  height: 430,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
  background: "var(--white)",
  boxShadow:
    "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
  transformOrigin: "10% 50%",
  padding: 20,
};

const cardContent = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100%",
  width: "100%",
  justifyContent: "space-around",
};

const imageContainer = {
  width: "100%",
  height: "80%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const imageStyle = {
  maxWidth: "200%",
  maxHeight: "100%",
  borderRadius: "12px",
};

const projectButton = {
  color: "#d9d9d9",
  border: "none",
  borderRadius: 50,
  background: "#1d1d1d",
  padding: "12px 24px",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0px 0px 10px rgba(61, 60, 60, 0.93)",
  transition: "all 0.3s ease",
};

const leftText = {
  flex: "1",
  textAlign: "right",
  paddingRight: 40,
  color: "#1d1d1d",
  fontFamily: "Bebas Neue, sans-serif",
  letterSpacing: "0.5rem",
  wordSpacing: "0.8rem",
};

const rightText = {
  flex: "1",
  textAlign: "left",
  paddingLeft: 40,
  color: "#1d1d1d",
};

const textTitle = {
  fontSize: "5rem",
  fontWeight: 600,
  marginBottom: 16,
  color: "#1d1d1d",
};

const textDescription = {
  fontSize: 16,
  lineHeight: 1.6,
  opacity: 0.8,
  maxWidth: 400,
  letterSpacing: 1,
  wordSpacing: 0,
  marginLeft: "auto",
};

const nutritionInfo = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  maxWidth: 200,
};

const nutritionItem = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 0",
  borderBottom: "1px solid rgba(29, 29, 29, 0.53)",
};

const nutritionLabel = {
  fontSize: 14,
  opacity: 0.7,
  color: "#1d1d1d",
};

const nutritionValue = {
  fontSize: 14,
  fontWeight: 600,
  color: "#1d1d1d",
};
