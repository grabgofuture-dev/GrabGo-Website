import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, Receipt, Handshake, PhoneCall, BadgeCheck, Zap } from 'lucide-react';
import './Partnerships.css';

export default function Partnerships() {
  const eligibility = [
    { icon: <ShieldCheck size={24} />, text: "Valid FSSAI License" },
    { icon: <TrendingUp size={24} />, text: "Minimum 3 Years Sales Record" },
    { icon: <Receipt size={24} />, text: "Minimum 3 Years GST Filings" },
    { icon: <Handshake size={24} />, text: "Eligible for Partnership Program" }
  ];

  return (
    <section id="partnership" className="fssai-section">
      <div className="container">
        
        <div className="fssai-header">
          <motion.h2 
            className="section-title fssai-title continuous-gradient"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            WE ARE LOOKING FOR ONLY ONE <br/>
            FSSAI LICENSE PARTNER
          </motion.h2>
          <motion.p 
            className="fssai-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Partner with <span className="text-grab">GRAB</span><span className="text-go">GO</span> & Earn Monthly Income
          </motion.p>
        </div>

        <div className="fssai-grid">
          {/* Left Column */}
          <div className="fssai-left">
            <motion.div 
              className="fssai-card glass-card eligibility-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="card-badge">ELIGIBILITY</div>
              <ul className="eligibility-list">
                {eligibility.map((item, i) => (
                  <li key={i} className="eligibility-item">
                    <div className="icon-box">{item.icon}</div>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              className="fssai-card glass-card benefit-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="benefit-label">MONTHLY PARTNERSHIP BENEFIT</h4>
              <p className="benefit-sub">EARN UP TO</p>
              <h3 className="benefit-amount gold-text">₹30,000 <span className="benefit-month">/ MONTH</span></h3>
              <p className="benefit-asterisk">Based on eligibility & partnership terms</p>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="fssai-right">
            <motion.div 
              className="fssai-graphics-container"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="glow-circle"></div>
              
              <div className="compliance-badges">
                <div className="compliance-badge glass-card">
                  <BadgeCheck size={28} className="text-grab" />
                  <span>FSSAI COMPLIANT</span>
                </div>
                <div className="compliance-badge glass-card">
                  <Receipt size={28} className="text-grab" />
                  <span>GST COMPLIANT</span>
                </div>
                <div className="compliance-badge glass-card">
                  <Handshake size={28} className="text-grab" />
                  <span>STRONGER TOGETHER</span>
                </div>
              </div>
              
              <div className="expand-text">
                <h3>EXPAND PARTNER<br/><span className="gold-text">EARN MORE</span></h3>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="fssai-footer glass-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="footer-left">
            <h3>BECOME A <span className="text-grab">GRAB</span><span className="text-go">GO</span></h3>
            <p>FSSAI LICENSE PARTNER TODAY</p>
          </div>
          <div className="footer-right">
            <p className="contact-label">CONTACT NOW:</p>
            <a href="tel:+918157825826" className="contact-number">
              <PhoneCall size={28} className="text-go" />
              <span>+91 81578 25826</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
