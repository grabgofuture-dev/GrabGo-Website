import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import './HowItWorks.css';

export default function HowItWorks() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Backup: explicitly play if video is paused when it scrolls into view.
    // The native autoPlay attribute handles the primary play, this is a safety net.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && video.paused) {
          video.play().catch(() => {});
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    // Unmute on first user interaction anywhere on the page
    const unlockAudio = () => {
      video.muted = false;
      if (video.paused) video.play().catch(() => {});
    };

    ['touchstart', 'click', 'scroll'].forEach((evt) =>
      window.addEventListener(evt, unlockAudio, { once: true, passive: true })
    );

    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="hiw-section">
      <div className="container">
        <div className="section-header">
          <motion.h2
            className="section-title continuous-gradient"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            How It Works
          </motion.h2>
        </div>

        <motion.div
          className="hiw-video-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="hiw-video-wrapper">
            {/* autoPlay + muted + playsInline = browser-native guaranteed autoplay on all platforms */}
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
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

