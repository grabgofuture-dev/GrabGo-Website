import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import './HowItWorks.css';

export default function HowItWorks() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Fast and reliable playback start
    const playVideo = async () => {
      try {
        await video.play();
      } catch (err) {
        // Fallback to muted if unmuted autoplay is blocked by browser policy
        video.muted = true;
        setIsMuted(true);
        try {
          await video.play();
        } catch (e) {
          // Playback deferred until user interaction
        }
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playVideo();
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);

    // Auto-unmute when the user taps/clicks anywhere on the site
    const handleGesture = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    };

    window.addEventListener('click', handleGesture, { once: true });
    window.addEventListener('touchstart', handleGesture, { once: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
    };
  }, []);

  const toggleSound = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      setIsMuted(false);
      video.play().catch(() => {});
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

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
          <div className="hiw-video-wrapper" onClick={toggleSound}>
            <video 
              ref={videoRef}
              className="hiw-working-video"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="auto"
            >
              <source src="/videos/new-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <button 
              className={`hiw-sound-badge ${isMuted ? 'muted' : 'unmuted'}`}
              onClick={toggleSound}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              type="button"
            >
              {isMuted ? (
                <>
                  <VolumeX size={15} />
                  <span>Tap for sound</span>
                </>
              ) : (
                <>
                  <Volume2 size={15} />
                  <span>Sound On</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
