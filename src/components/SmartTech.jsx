import { motion } from 'framer-motion';
import { Database, BrainCircuit, BarChart3, Wallet, RotateCcw, MonitorSmartphone } from 'lucide-react';
import './SmartTech.css';

const techCards = [
  { icon: <Database size={40} />, title: "Real-Time Inventory", image: "/tech/tech_inventory.png", colSpan: 2, rowSpan: 2 },
  { icon: <BrainCircuit size={40} />, title: "AI-Powered Monitoring", image: "/tech/tech_ai.png", colSpan: 1, rowSpan: 1 },
  { icon: <BarChart3 size={40} />, title: "Smart Analytics", image: "/features/smart_inventory_v3.png", colSpan: 1, rowSpan: 1 },
  { icon: <Wallet size={40} />, title: "Cashless Payments", image: "/features/cashless_payments_v2.png", colSpan: 1, rowSpan: 1 },
  { icon: <RotateCcw size={40} />, title: "Instant Refund System", image: "/features/24_7_availability_v2.png", colSpan: 1, rowSpan: 1 },
  { icon: <MonitorSmartphone size={40} />, title: "Remote Management", image: "/features/maintenance_included_v2.png", colSpan: 1, rowSpan: 1 }
];

export default function SmartTech() {
  return (
    <section className="smart-tech-section">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            className="section-title continuous-gradient"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Powered by Smart Technology
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            We leverage cutting-edge hardware and software to deliver a flawless experience.
          </motion.p>
        </div>
        
        <div className="tech-grid">
          {techCards.map((tech, index) => (
            <motion.div 
              key={index}
              className={`tech-card glass-card col-span-${tech.colSpan} row-span-${tech.rowSpan}`}
              style={{ backgroundImage: `url(${tech.image})` }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="tech-icon">{tech.icon}</div>
              <h3 className="tech-title">{tech.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
