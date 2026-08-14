import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import './HowItWorks.css';

export default function HowItWorks() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure muted for 100% reliable instant autoplay across all browsers & mobile devices
    video.muted = true;

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

    // Unmute audio smoothly upon the first user click or tap anywhere on the site
    const enableAudio = () => {
      if (video) {
        video.muted = false;
      }
    };

    window.addEventListener('click', enableAudio, { once: true });
    window.addEventListener('touchstart', enableAudio, { once: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('click', enableAudio);
      window.removeEventListener('touchstart', enableAudio);
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
