import { motion } from 'framer-motion';
import './Stats.css';

const stats = [
  { value: "24/7", label: "Support & Availability" },
  { value: "100%", label: "Cashless Transactions" },
  { value: "350+", label: "Product Capacity" },
  { value: "Live", label: "Real-Time Monitoring" }
];

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="stat-item glass-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <h3 className="stat-value gradient-text">{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
