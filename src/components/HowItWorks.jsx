import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import './HowItWorks.css';

export default function HowItWorks() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isIntersecting = false;

    // Force unmuted state
    video.muted = false;

    // Helper to trigger audio playback
    const playWithAudio = async () => {
      if (!video) return;
      video.muted = false;
      try {
        await video.play();
      } catch (err) {
        // Fallback to muted temporarily if browser policy blocks unmuted play without gesture
        video.muted = true;
        try {
          await video.play();
        } catch (e) {}
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (entry.isIntersecting) {
          playWithAudio();
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(video);

    // Global listener on all gestures (scroll, touch, click, wheel) to unlock audio automatically
    const unlockAudio = () => {
      if (video) {
        video.muted = false;
        if (isIntersecting) {
          video.play().catch(() => {});
        }
      }
    };

    const options = { capture: true, passive: true };
    const events = ['touchstart', 'touchend', 'pointerdown', 'pointermove', 'click', 'scroll', 'wheel'];

    events.forEach((evt) => {
      window.addEventListener(evt, unlockAudio, options);
      document.addEventListener(evt, unlockAudio, options);
    });

    return () => {
      observer.disconnect();
      events.forEach((evt) => {
        window.removeEventListener(evt, unlockAudio, options);
        document.removeEventListener(evt, unlockAudio, options);
      });
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
