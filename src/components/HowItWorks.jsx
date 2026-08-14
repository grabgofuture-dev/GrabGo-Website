import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import './HowItWorks.css';

export default function HowItWorks() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    let isIntersecting = false;

    // Helper to attempt unmuted playback by default
    const attemptUnmutedPlay = async () => {
      if (!video) return;
      video.muted = false;
      try {
        await video.play();
      } catch (err) {
        // If unmuted playback is temporarily blocked by browser autoplay policy,
        // fallback to muted play until the user touches/clicks anywhere
        video.muted = true;
        try {
          await video.play();
        } catch (e) {
          // Playback deferred
        }
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (entry.isIntersecting) {
          attemptUnmutedPlay();
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);

    // Unmute sound automatically on any user interaction with the page
    const enableAudio = () => {
      if (video) {
        video.muted = false;
        if (isIntersecting && video.paused) {
          video.play().catch(() => {});
        }
      }
    };

    window.addEventListener('click', enableAudio);
    window.addEventListener('touchstart', enableAudio);
    window.addEventListener('pointerdown', enableAudio);

    return () => {
      observer.disconnect();
      window.removeEventListener('click', enableAudio);
      window.removeEventListener('touchstart', enableAudio);
      window.removeEventListener('pointerdown', enableAudio);
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
