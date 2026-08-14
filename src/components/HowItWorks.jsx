import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import './HowItWorks.css';

export default function HowItWorks() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start muted — required for 100% reliable autoplay across all browsers
    video.muted = true;

    let audioUnlocked = false;
    let hasPlayed = false;

    // Unlock audio on any user gesture
    const UNLOCK_EVENTS = [
      'scroll', 'touchstart', 'touchmove', 'touchend',
      'pointerdown', 'mousedown', 'click', 'keydown', 'wheel',
    ];

    const unlockAudio = () => {
      if (audioUnlocked) return;
      audioUnlocked = true;
      video.muted = false;
      UNLOCK_EVENTS.forEach((evt) =>
        window.removeEventListener(evt, unlockAudio, { capture: true })
      );
    };

    UNLOCK_EVENTS.forEach((evt) =>
      window.addEventListener(evt, unlockAudio, { capture: true, passive: true })
    );

    // rootMargin: '0px 0px 300px 0px' extends ONLY the bottom of the viewport by 300px
    // → triggers play when the video is 300px BELOW the visible area (before user reaches it)
    // → does NOT affect the top, so no false pause() on initial page load
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
          hasPlayed = true;
        } else if (hasPlayed) {
          // Only pause after video has played at least once (avoids killing autoPlay on mount)
          video.pause();
        }
      },
      { threshold: 0, rootMargin: '0px 0px 300px 0px' }
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
