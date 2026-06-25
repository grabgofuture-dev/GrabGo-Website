import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, CheckCircle2, X } from 'lucide-react';
import { useState } from 'react';
import './CTA.css';

export default function CTA() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const interests = [
    { value: "colleges", label: "Partnership for Colleges" },
    { value: "franchise", label: "Become a Franchise" },
    { value: "fssai", label: "FSSAI License Partner" }
  ];

  const selectedLabel = interests.find(i => i.value === selectedInterest)?.label || "Select Interest...";

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Honeypot check for spam bots
    if (e.target.honeypot.value) {
      console.warn("Spam bot detected!");
      return;
    }
    
    const formData = new FormData();
    formData.append("entry.1321316006", e.target.name.value);
    formData.append("entry.1109254305", e.target.phone.value);
    
    let interestValue = "";
    if (selectedInterest === "colleges") interestValue = "Partnership for Collages";
    if (selectedInterest === "franchise") interestValue = "Become a Franchise";
    if (selectedInterest === "fssai") interestValue = "FSSAI License Partner";
    
    formData.append("entry.276860121", interestValue);

    fetch("https://docs.google.com/forms/u/0/d/e/1FAIpQLSefBKAyrlcmHplBZBGmMc0Bp7DPAiuDwDUN3Ca2APUzipv5CQ/formResponse", {
      method: "POST",
      mode: "no-cors",
      body: formData
    }).then(() => {
      setShowSuccess(true);
      setSelectedInterest("");
      e.target.reset();
    }).catch(err => {
      console.error(err);
      setShowSuccess(true);
      setSelectedInterest("");
      e.target.reset();
    });
  };

  return (
    <>
      <section id="contact" className="cta-section">
        <div className="container">
          <motion.div 
            className="cta-card glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="cta-bg-wrapper">
              <div className="cta-glow"></div>
            </div>
            
            <h2 className="cta-title continuous-gradient">Ready To Modernize Your Space?</h2>
            <p className="cta-subtitle">
              Join the smart vending revolution with <span className="text-grab">GRAB</span><span className="text-go">GO</span>. Get started today and transform your campus experience.
            </p>
            
            <form className="cta-form" onSubmit={handleSubmit}>
              {/* Hidden honeypot field to catch spam bots */}
              <input type="text" name="honeypot" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

              <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                className="form-input" 
                required 
                pattern="^[a-zA-Z\s]{2,50}$" 
                title="Please enter a valid name (letters and spaces only, 2-50 characters)."
              />
              
              <div className="custom-select-container">
                <div 
                  className={`form-input custom-select ${isDropdownOpen ? 'active' : ''} ${selectedInterest ? 'selected' : ''}`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span>{selectedLabel}</span>
                  <ChevronDown size={20} className={`select-arrow ${isDropdownOpen ? 'open' : ''}`} />
                </div>
                
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div 
                      className="custom-options"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {interests.map((interest) => (
                        <div 
                          key={interest.value}
                          className={`custom-option ${selectedInterest === interest.value ? 'selected' : ''}`}
                          onClick={() => {
                            setSelectedInterest(interest.value);
                            setIsDropdownOpen(false);
                          }}
                        >
                          {interest.label}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Hidden input to ensure required validation if needed */}
                <input type="hidden" required value={selectedInterest} />
              </div>

              <input 
                type="tel" 
                name="phone" 
                placeholder="Phone Number" 
                className="form-input" 
                required 
                pattern="^\+?[0-9\s\-\(\)]{10,15}$" 
                title="Please enter a valid phone number (10-15 digits)."
              />

              <button type="submit" className="btn-primary form-submit">
                Request Callback <ArrowRight size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            className="success-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSuccess(false)}
          >
            <motion.div 
              className="success-modal"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="success-close" onClick={() => setShowSuccess(false)}>
                <X size={24} />
              </button>
              
              <div className="success-icon-wrapper">
                <CheckCircle2 size={70} color="var(--logo-grab)" />
              </div>
              <h3 className="success-title">Request Received!</h3>
              <p className="success-desc">
                Thank you for your interest! Our team will review your details and contact you very soon to discuss your partnership with <span className="text-grab">GRAB</span><span className="text-go">GO</span>.
              </p>
              
              <button className="btn-primary form-submit" style={{width: '100%'}} onClick={() => setShowSuccess(false)}>
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
