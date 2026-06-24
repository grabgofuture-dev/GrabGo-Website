import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductCategories from './ProductCategories';
import './Hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-background">
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          <motion.h1
            className="hero-title continuous-gradient"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            INTELLIGENT VENDING <br />
            REDEFINED
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="show-on-mobile">GrabGo is India's next-generation cashless, AI-powered <br />smart vending platform Built for the future</span> <span className="hide-on-mobile">GrabGo is India's next-generation cashless, AI-powered smart vending platform built for the future of retail. We deliver seamless 24/7 access to premium snacks, beverages, and daily essentials through cutting-edge automated technology, zero queues, and instant digital payments. Smarter convenience, everywhere you are.</span>
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button className="btn-secondary" onClick={() => document.getElementById('franchise')?.scrollIntoView({ behavior: 'smooth' })}>
              <span style={{ color: '#3198FF' }}>EXPLORE</span> <span style={{ color: '#FFB547' }}>SCHEMES</span> <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </div>

      <ProductCategories />
    </section>
  );
}
