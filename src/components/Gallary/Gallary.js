import {
    Animator,
    ScrollContainer,
    ScrollPage,
    batch,
    Fade,
    FadeIn,
    Move,
    MoveIn,
    MoveOut,
    Sticky,
    StickyIn,
    ZoomIn,
  } from "react-scroll-motion";
  import "./Gallary.css";


  import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";
  
function ParallaxText({ children, baseVelocity = 100 }) {
    const baseX = useMotionValue(0); // Motion value to track position
    const { scrollY } = useScroll(); // Tracks scroll position
    const scrollVelocity = useVelocity(scrollY); // Tracks scroll speed
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400,
    }); // Smoothens velocity changes
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
      clamp: false,
    });
  
    // Dynamically calculates the position
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  
    const directionFactor = useRef(1); // Tracks direction of scroll
    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
  
      // Adjust direction based on scroll velocity
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }
  
      moveBy += directionFactor.current * moveBy * velocityFactor.get();
      baseX.set(baseX.get() + moveBy); // Update baseX
    });
  
    return (
      <>
        <div className="parallax">
        <motion.div className="scroller" style={{ x }}>
          <span>{children} </span>
          <span>{children} </span>
          <span>{children} </span>
          <span>{children} </span>
        </motion.div>
      </div>
      </>
    );
  }


  export default function Gallary() {
    const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
    const FadeUp = batch(Fade(), Move(), Sticky());
  
    return (
      <div className="my_Gallary">
        <section className="Gallary_heading">
          <ParallaxText baseVelocity={-2}>Welcome To My Gallary</ParallaxText>
          <ParallaxText baseVelocity={2}>Scroll And Injoy</ParallaxText>
        </section>
        <ScrollContainer>
          {/* Page 0 */}
          <ScrollPage page={0}>
            <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -500))}>
              <div className="my_Gallary_section">
                <h1>Welcome</h1>
                <p>Enjoy a stunning gallery with on-scroll animations.</p>
                <img
                  src="img_0788.jpg"
                  alt="Girl 1"
                />
              </div>
            </Animator>
          </ScrollPage>
  
          {/* Page 1 */}
          <ScrollPage page={1}>
            <Animator animation={ZoomInScrollOut}>
              <div className="my_Gallary_section">
                <h1>Grace in Nature</h1>
                <p>A serene moment captured in a natural setting.</p>
                <img
                  src="https://i.pinimg.com/236x/5f/de/3e/5fde3ee3039b0105b1209491a97333a0.jpg"
                  alt="Girl 2"
                />
              </div>
            </Animator>
          </ScrollPage>
  
          {/* Page 2 */}
          <ScrollPage page={2}>
            <Animator animation={FadeUp}>
              <div className="my_Gallary_section">
                <h1>Peaceful Reflection</h1>
                <p>Take a deep breath and appreciate the calm.</p>
                <img
                  src="https://i.pinimg.com/736x/33/c4/9f/33c49f753aa212335494bfa546d4a8a5.jpg"
                  alt="Girl 3"
                />
              </div>
            </Animator>
          </ScrollPage>
  
          {/* Page 3 */}
          <ScrollPage page={3}>
  <div className="my_Gallary_section">
    <h1>Dynamic Entry</h1>
    <p>
      Watch as elements gracefully enter and leave the frame with smooth animations.
    </p>
    <div className="flex-container">
      <Animator animation={MoveIn(-1000, 0)}>
        <img
          src="https://i.pinimg.com/236x/d3/4f/21/d34f2148dc912f471c18b32f27a34e67.jpg"
          alt="Girl 4"
        />
      </Animator>
      <Animator animation={MoveIn(1000, 0)}>
        <img
          src="https://i.pinimg.com/474x/23/81/2b/23812b3265290f69c51dfb4a417d53c5.jpg"
          alt="Girl 5"
        />
      </Animator>
      <Animator animation={MoveOut(1000, 0)}>
        <img
          src="https://i.pinimg.com/474x/79/62/21/796221b2c7320e8f7b99b18a66fd3804.jpg"
          alt="Girl 6"
        />
      </Animator>
      <Animator animation={MoveOut(-1000, 0)}>
        <img
          src="https://i.pinimg.com/236x/96/98/34/969834e7faa9f074a7565e9a847d43b6.jpg"
          alt="Girl 7"
        />
      </Animator>
    </div>
  </div>
</ScrollPage>

  
          {/* Page 4 */}
          <ScrollPage page={4}>
            <Animator animation={batch(Fade(), Sticky())}>
              <div className="my_Gallary_section">
                <h1>Farewell</h1>
                <p>End your journey with a smile and come back anytime!</p>
                <img
                  src="https://i.pinimg.com/236x/a6/b7/35/a6b7358705c30ed4e0e5482670446394.jpg"
                  alt="Girl 8"
                />
              </div>
            </Animator>
          </ScrollPage>
        </ScrollContainer>
      </div>
    );
  }
  