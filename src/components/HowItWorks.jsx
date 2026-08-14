import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import './HowItWorks.css';

export default function HowItWorks() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isIntersecting = false;

    const enableAudioOnInteraction = () => {
      if (video && isIntersecting && video.muted) {
        video.muted = false;
        video.play().catch(() => {});
      }
    };

    window.addEventListener('click', enableAudioOnInteraction);
    window.addEventListener('touchstart', enableAudioOnInteraction);
    window.addEventListener('keydown', enableAudioOnInteraction);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (entry.isIntersecting) {
          video.muted = false;
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Fallback to muted if browser blocks unmuted autoplay until user interaction
              video.muted = true;
              video.play().catch(() => {});
            });
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      window.removeEventListener('click', enableAudioOnInteraction);
      window.removeEventListener('touchstart', enableAudioOnInteraction);
      window.removeEventListener('keydown', enableAudioOnInteraction);
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
          <video 
            ref={videoRef}
            className="hiw-working-video"
            autoPlay
            loop
            playsInline
          >
            <source src="/videos/new-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </div>
    </section>
  );
}
