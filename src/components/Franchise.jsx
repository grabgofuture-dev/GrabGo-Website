import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Store, X, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import './Franchise.css';

export default function Franchise() {
  const [activeScheme, setActiveScheme] = useState(null);
  const overlayRef = useRef(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (activeScheme) {
      // Save current scroll position
      scrollYRef.current = window.scrollY;
      // Lock the entire page — works for mouse wheel AND two-finger trackpad
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore page to exact same scroll position
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollYRef.current);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
    };
  }, [activeScheme]);

  const collegeDetails = [
    { title: "100% Free Installation", desc: "Delivery, configuration, and complete setup are entirely covered." },
    { title: "Zero Institutional Investment", desc: "No financial liability or upfront costs for the campus." },
    { title: "Utility Compensation", desc: "We pay the college monthly for electricity & internet (2% of total sales)." },
    { title: "What GrabGo Handles", desc: "Complete installation, 24/7 support, restocking, maintenance, and hygiene." },
    { title: "What Institution Provides", desc: "Small floor space, power outlet, Wi-Fi/LAN, and an official permission letter." }
  ];

  const franchiseDetails = [
    { title: "Machine Cost", desc: "₹290,000 + 18% GST for the VK-OV-COTS-22 model." },
    { title: "Payment Terms", desc: "50% advance + 50% after installation." },
    { title: "Franchise Fee", desc: "6% of monthly sales revenue." },
    { title: "First Year Benefits", desc: "Free maintenance + free software support." },
    { title: "Software (From Year 2)", desc: "₹13,000 per year." },
    { title: "AMC (Optional from Year 2)", desc: "Basic: ₹15,000/yr | Premium: ₹25,000/yr." }
  ];

  return (
    <section id="franchise" className="franchise-section">
      <div className="container">
        <div className="section-header">
          <motion.h2
            className="section-title continuous-gradient"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Explore Our Schemes
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Choose the perfect partnership model for your campus or business.
          </motion.p>
        </div>

        <div className="schemes-grid">
          <motion.div
            className="scheme-card scheme-colleges"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="scheme-icon-wrapper">
              <Building2 size={48} className="scheme-icon" />
            </div>
            <h3 className="scheme-title">Scheme for Colleges</h3>
            <p className="scheme-desc">
              Zero setup cost, fully managed operations, and monthly utility compensation. Bring cutting-edge convenience to your students with absolutely no institutional investment required.
            </p>
            <button className="btn-secondary scheme-btn" onClick={() => setActiveScheme('colleges')}>View Details</button>
          </motion.div>

          <motion.div
            className="scheme-card scheme-franchise"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="scheme-icon-wrapper">
              <Store size={48} className="scheme-icon" />
            </div>
            <h3 className="scheme-title">Scheme for Franchise</h3>
            <p className="scheme-desc">
              High ROI potential with competitive upfront pricing. Take ownership of the machine, keep 100% of the profits, and scale your automated retail business with our proven system.
            </p>
            <button className="btn-secondary scheme-btn" onClick={() => setActiveScheme('franchise')}>View Details</button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {activeScheme && (
          <motion.div
            ref={overlayRef}
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveScheme(null)}
          >
            <motion.div
              className={`modal-content modal-${activeScheme}`}
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setActiveScheme(null)}>
                <X size={24} />
              </button>

              <h3 className="modal-title">
                <span className="mobile-block">Scheme for</span>
                <span className="desktop-only-space"> </span>
                <span className="mobile-block">
                  {activeScheme === 'colleges' ? 'Colleges' : 'Franchise'} <span className="gradient-text">Details</span>
                </span>
              </h3>

              <div className="modal-details-grid">
                {(activeScheme === 'colleges' ? collegeDetails : franchiseDetails).map((detail, i) => (
                  <div key={i} className="detail-card glass-card">
                    <h4 className="detail-title"><CheckCircle2 size={18} className="text-go" /> {detail.title}</h4>
                    <p className="detail-desc">{detail.desc}</p>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                <button
                  className="btn-primary"
                  onClick={() => {
                    setActiveScheme(null);
                    setTimeout(() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  Apply Now <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
