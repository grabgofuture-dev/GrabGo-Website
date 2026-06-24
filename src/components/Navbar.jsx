import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container nav-container">
        <div className="navbar-logo">
          <span className="logo-text"><span className="text-grab">GRAB</span><span className="text-go">GO</span></span>
        </div>
        
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#solutions">Solutions</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#partnership">Partnership</a>
          <a href="#franchise">Schemes</a>
          <a href="#contact">Contact Us</a>
        </div>
        
        <button 
          className="mobile-menu-toggle" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mobile-nav-links">
              <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
              <a href="#solutions" onClick={() => setIsMobileMenuOpen(false)}>Solutions</a>
              <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>How It Works</a>
              <a href="#partnership" onClick={() => setIsMobileMenuOpen(false)}>Partnership</a>
              <a href="#franchise" onClick={() => setIsMobileMenuOpen(false)}>Schemes</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
