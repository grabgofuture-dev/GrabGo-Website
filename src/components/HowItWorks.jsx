import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import './HowItWorks.css';

export default function HowItWorks() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Always start muted — required for autoplay on all browsers
    video.muted = true;
    video.playsInline = true;

    // Play when video enters viewport, pause when it leaves
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const promise = video.play();
          if (promise !== undefined) {
            promise.catch(() => {
              // Retry after short delay (helps some mobile browsers)
              setTimeout(() => video.play().catch(() => {}), 300);
            });
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    // Unlock audio automatically on first user gesture (scroll, tap, click)
    const unlockAudio = () => {
      video.muted = false;
      if (video.paused) video.play().catch(() => {});
    };

    ['touchstart', 'touchend', 'click', 'scroll', 'pointerdown'].forEach((evt) =>
      window.addEventListener(evt, unlockAudio, { once: true, passive: true })
    );

    return () => {
      observer.disconnect();
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
            <video
              ref={videoRef}
              className="hiw-working-video"
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

