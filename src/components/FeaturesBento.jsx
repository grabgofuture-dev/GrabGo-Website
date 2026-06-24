import { motion } from 'framer-motion';
import { 
  Clock, CreditCard, Box, 
  ShieldCheck, Wrench, Zap 
} from 'lucide-react';
import './FeaturesBento.css';

const features = [
  { icon: <Clock size={32} />, title: "24/7 Availability", desc: "Access round the clock without any dependencies.", colSpan: 2, image: "/features/24_7_availability_v2.png", bgPos: "center top" },
  { icon: <CreditCard size={32} />, title: "Cashless Payments", desc: "100% digital transactions via UPI & QR.", colSpan: 1, image: "/features/cashless_payments_v2.png" },
  { icon: <Zap size={32} />, title: "No Queues", desc: "Instant grab and go.", colSpan: 1, image: "/features/no_queues_v3.png" },
  { icon: <Box size={32} />, title: "Smart Inventory", desc: "Automated tracking ensures machines are never empty.", colSpan: 2, image: "/features/smart_inventory_v3.png" },
  { icon: <ShieldCheck size={32} />, title: "Hygiene First", desc: "Contactless delivery and strict food safety.", colSpan: 1, image: "/features/hygiene_first_v3.png" },
  { icon: <Wrench size={32} />, title: "Maintenance Included", desc: "Zero operational burden for the campus.", colSpan: 1, image: "/features/maintenance_included_v2.png" }
];

export default function FeaturesBento() {
  return (
    <section id="solutions" className="features-section">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            className="section-title continuous-gradient"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Choose GRABGO
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            A completely automated utility asset that brings unparalleled convenience to your ecosystem with zero&nbsp;risk.
          </motion.p>
        </div>
        
        <div className="bento-grid">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className={`glass-card bento-item span-${feature.colSpan}`}
              style={{ 
                backgroundImage: `url(${feature.image})`,
                backgroundPosition: feature.bgPos || 'center'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
