import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Github, Download } from "lucide-react";
import "./Navbar.css";

const MenuIcon = ({ isOpen, toggleMenu }) => (
  <motion.div
    className="menu-icon"
    onClick={toggleMenu}
    style={{
      cursor: "pointer",
    }}
  >
    <motion.span
      animate={{
        rotate: isOpen ? 40 : 0,
        y: isOpen ? 8 : 0,
      }}
      transition={{ duration: 0.2 }}
      style={{
        backgroundColor: isOpen ? "#1d1d1d" : "#b8b5b5",
         // Change bar color
      }}
    />
     <motion.span
     className="small-bar"
      animate={{
        rotate: isOpen ? -45 : 0,
        y: isOpen ? -1 : 0,
      }}
      transition={{ duration: 0.2 }}
      style={{
        backgroundColor: isOpen ? "transparent" : "#b8b5b5", // Change bar color
        opacity : isOpen ? "0" : "1"
      }}
    />
    <motion.span
      animate={{
        rotate: isOpen ? -45 : 0,
        y: isOpen ? -5 : 0,
      }}
      transition={{ duration: 0.2 }}
      style={{
        backgroundColor: isOpen ? "#1d1d1d" : "#b8b5b5", // Change bar color
      }}
    />
  </motion.div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    closed: {
      y: "-100%", // Go to the top when closed
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    open: {
      y: "0%", // Come from the bottom when open
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const pageVariants = {
    closed: { y: "100%", opacity: 0.7 },
    open: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 70,
        damping: 15,
      },
    }),
  };

  const colors = ["#383636", "#757373", "#A4A2A2", "#d9d9d9"];
  const menuItems = ["", "", "", ""];

  return (
    <nav className="navbar">
      <motion.div
        className="logo"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <a><img className="logo-img" src="tarun-robot.png" alt="Logo" /></a>
      </motion.div>

      <MenuIcon isOpen={isOpen} toggleMenu={toggleMenu} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="menu-container"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "100vh",
              backgroundColor: "#fff",
              zIndex: 10,
              overflow: "hidden",
            }}
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                className="menu-page"
                variants={pageVariants}
                custom={index}
                style={{ backgroundColor: colors[index % colors.length] }}
              >
                <motion.div href={`#${item.toLowerCase()}`} onClick={toggleMenu}>
                  {item}
                  <motion.div className="menuitem_div">
                    <motion.ul>
                      <motion.li>
                        <a href="#home">Home</a>
                      </motion.li>
                      <motion.li>
                        <a href="#about">About</a>
                      </motion.li>
                      <motion.li>
                        <a href="#projects">Projects</a>
                      </motion.li>
                      <motion.li>
                        <a href="#contact">Contact</a>
                      </motion.li>
                    </motion.ul>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}

            <motion.div
              className="social-icons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.a
                href="https://www.linkedin.com/in/tarun-kushwaha-7519a131a/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={32} />
              </motion.a>
              <motion.a
                href="https://github.com/Tarun8595"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={32} />
              </motion.a>
              <motion.a
                href="/Tarun_Kushwaha_Resume.pdf"
                download="Tarun_Kushwaha_Resume.pdf"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Download size={32} />
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
