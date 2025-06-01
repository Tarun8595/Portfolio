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
      <section id="gallery">
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
                <p>Take a tour of our finest memories</p>
                <img
                  className="welcome-img"
                  src="https://i.pinimg.com/736x/3c/3f/91/3c3f917bc07cb5c663f178f05250596f.jpg"
                  alt="welcome-img" 
                />
              </div>
            </Animator>
          </ScrollPage>
  
          {/* Page 1 */}
          <ScrollPage page={1}>
            <Animator animation={ZoomInScrollOut}>
              <div className="my_Gallary_section">
                <h1>Grace in Nature</h1>
                <p>From vibrant colors to silent emotions — our lens sees it all</p>
                <img
                  src="https://i.pinimg.com/736x/67/c2/24/67c22456cdd6f835422ce1a26b8153ee.jpg"
                  alt="man-in-nature"
                />
              </div>
            </Animator>
          </ScrollPage>
  
          {/* Page 2 */}
          <ScrollPage page={2}>
            <Animator animation={FadeUp}>
              <div className="my_Gallary_section">
                <h1>Beauty</h1>
                <p>Experience the magic of everyday life through our curated collection.</p>
                <img
                  src="https://i.pinimg.com/736x/94/b2/83/94b283a81d6227412adcdcbaabf58917.jpg"
                  alt="beauty-work"
                />
              </div>
            </Animator>
          </ScrollPage>
  
          {/* Page 3 */}
          <ScrollPage page={3}>
  <div className="my_Gallary_section">
    <h1>Stories</h1>
    <p>
      Let your eyes do the reading — visual tales await.
    </p>
    <div className="flex-container">
      <Animator animation={MoveIn(-1000, 0)}>
        <img
          src="https://i.pinimg.com/736x/30/fd/9c/30fd9cb02596a9ffbdde698fcd61fc9f.jpg"
          alt="tarun-img1"
        />
      </Animator>
      <Animator animation={MoveIn(1000, 0)}>
        <img
          src="https://i.pinimg.com/736x/c8/41/42/c841425366b905d22488c23b88b7e017.jpg"
          alt="my-group"
        />
      </Animator>
      <Animator animation={MoveOut(1000, 0)}>
        <img
          src="https://i.pinimg.com/736x/42/eb/0b/42eb0b6f13fbca95a8a89e5878073075.jpg"
          alt="tarun-rider"
        />
      </Animator>
      <Animator animation={MoveOut(-1000, 0)}>
        <img
          src="https://i.pinimg.com/736x/15/3a/4a/153a4a4e3a3a28f7c25e3a5a0cf8f945.jpg"
          alt="tarun-guiter"
        />
      </Animator>
    </div>
  </div>
</ScrollPage>

  
          {/* Page 4 */}
          <ScrollPage page={4}>
            <Animator animation={batch(Fade(), Sticky())}>
              <div className="my_Gallary_section">
                <h1>Remember</h1>
                <p>A journey from the lens to the heart.</p>
                <img
                  src="https://i.pinimg.com/736x/de/67/49/de6749c6dab2db4d63b80e8bd95d91d8.jpg"
                  alt="last-img"
                />
              </div>
            </Animator>
          </ScrollPage>
        </ScrollContainer>
      </div>
      </section>
    );
  }
  