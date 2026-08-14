import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import './HowItWorks.css';

export default function HowItWorks() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start muted — required for reliable autoplay in all browsers
    video.muted = true;

    let audioUnlocked = false;

    // Unmute + ensure video plays with sound
    const unlockAudio = () => {
      if (audioUnlocked) return;
      audioUnlocked = true;
      video.muted = false;
      // If video is already visible and playing, just unmute it live
      if (!video.paused) {
        // already playing, just unmuted now — audio kicks in immediately
      } else {
        video.play().catch(() => {});
      }
      // Clean up all listeners once audio is unlocked
      UNLOCK_EVENTS.forEach((evt) =>
        window.removeEventListener(evt, unlockAudio, { capture: true })
      );
    };

    // Broad list of gestures — scroll, touch, pointer, key all count
    const UNLOCK_EVENTS = [
      'scroll', 'touchstart', 'touchmove', 'touchend',
      'pointerdown', 'pointermove', 'mousedown', 'click',
      'keydown', 'wheel',
    ];

    UNLOCK_EVENTS.forEach((evt) =>
      window.addEventListener(evt, unlockAudio, { capture: true, passive: true })
    );

    // Play/pause video as it enters/leaves viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      UNLOCK_EVENTS.forEach((evt) =>
        window.removeEventListener(evt, unlockAudio, { capture: true })
      );
    };
  }, []);

  return (
    <section id="how-it-works" className="hiw-section">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            className="section-title continuous-gradient"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            How It Works
          </motion.h2>
        </div>
        
        <motion.div 
          className="hiw-video-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="hiw-video-wrapper">
            <video 
              ref={videoRef}
              className="hiw-working-video"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src="/videos/new-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
