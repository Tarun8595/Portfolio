import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Project.css";

gsap.registerPlugin(ScrollTrigger);

const Project = () => {
  const experienceRef = useRef(null);
  const imageRef = useRef(null);
  const workRef = useRef(null);
  const expertiseRef = useRef(null);

  const letterContainers = {
    W: useRef(null),
    O: useRef(null),
    R: useRef(null),
    K: useRef(null),
  };

  const copies = 11;

  // Refs are stable; safe to omit from dependencies
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const experience = experienceRef.current;
    const image = imageRef.current;
    const containers = {
      W: letterContainers.W.current,
      O: letterContainers.O.current,
      R: letterContainers.R.current,
      K: letterContainers.K.current,
    };

    gsap.set(image, { scale: 1 });
    gsap.set([containers.W, containers.O, containers.R, containers.K], {
      x: 0,
      opacity: 1,
    }, []);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: experience,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (self.progress > 0.5) {
            const progress = (self.progress - 0.5) * 2;

            const getPosition = (i, total, radius, direction) => {
              const angle = (i / total) * Math.PI;
              const x = Math.cos(angle) * radius * direction;
              const y = Math.sin(angle) * radius * 0.08;
              return { x, y };
            };

            const animateLetters = (container, direction, spread) => {
              gsap.to(Array.from(container.children), {
                x: (i) => {
                  if (i === 0) return 0;
                  const pos = getPosition(i, copies, spread * progress, direction);
                  return pos.x;
                },
                y: (i) => {
                  if (i === 0) return 0;
                  const pos = getPosition(i, copies, spread * progress, direction);
                  return pos.y;
                },
                rotateY: (i) => (i === 0 ? 0 : i * 5 * progress * direction),
                opacity: (i) => (i === 0 ? 1 : 1 + Math.sin(i * 0.01) * 0.2),
                scale: (i) => (i === 0 ? 1 : 0.5 - progress * 0.1),
                duration: 0.5,
                ease: "power1.out",
              });
            };

            animateLetters(containers.W, -1, 600);
            animateLetters(containers.O, -1, 600);
            animateLetters(containers.R, 1, 600);
            animateLetters(containers.K, 1, 600);
          } else {
            gsap.to(
              [
                containers.W.children,
                containers.O.children,
                containers.R.children,
                containers.K.children,
              ],
              {
                x: 0,
                y: 0,
                rotateY: 0,
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "power2.inOut",
              }
            );
          }
        },
      },
    });

    tl.to(image, {
      scale: 11,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isEffectEnabled] = useState(true); // No setter needed
  const lastScrollY = useRef(0);
  const [scrollDirection, setScrollDirection] = useState("down");

  const headingText = "Let  Start";

  useEffect(() => {
    const handleScroll = () => {
      if (!expertiseRef.current || !isEffectEnabled) return;

      const rect = expertiseRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const sectionTop = rect.top;
      const viewportHeight = window.innerHeight;

      const progress = Math.min(
        Math.max(0, (viewportHeight - sectionTop) / (sectionHeight + viewportHeight)),
        1
      );

      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      setScrollDirection(isScrollingDown ? "down" : "up");
      lastScrollY.current = currentScrollY;

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isEffectEnabled]);

  const getLetterOpacity = (index) => {
    if (!isEffectEnabled) return 1;
    const total = headingText.length;

    const letterProgress =
      scrollDirection === "down"
        ? index / (total - 1)
        : (total - 1 - index) / (total - 1);

    const threshold = letterProgress * 0.4;
    return Math.min(Math.max(0, (scrollProgress - threshold) / 0.2), 1);
  };

  const getLetterTransform = (index) => {
    const opacity = getLetterOpacity(index);
    const translateX = (1 - opacity) * -10;
    return `translateX(${translateX}px)`;
  };

  return (
    <div className="project-container">
      <div className="topbox"></div>

      <div className="work" ref={workRef}>
        {Object.entries({ W: "W", O: "O", R: "R", K: "K" }).map(([key, letter]) => (
          <div key={key} className="letter-container" ref={letterContainers[key]}>
            {[...Array(copies)].map((_, i) => (
              <div key={`${letter}-${i}`} className={`work-letter ${i === 0 ? "original" : "copy"}`}>
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="experience" ref={experienceRef}>
        <div className="experience-middle-container">
          <img ref={imageRef} className="experience-middle" src="port-bg2.png" alt="Background" />
        </div>
      </div>

      <div className="expertise-section" ref={expertiseRef}>
        <div className="expertise-heading">
          {headingText.split("").map((letter, index) => (
            <span
              key={index}
              style={{
                opacity: getLetterOpacity(index),
                transform: getLetterTransform(index),
                display: "inline-block",
                transition: "all 0.3s ease-out",
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
