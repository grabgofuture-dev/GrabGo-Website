import { motion } from 'framer-motion';
import './Founders.css';

const founders = [
  {
    name: "Muhammed Sinan",
    role: "Founder & Creative Director",
    image: "/images/founders info 1.jpeg",
    instagram: "https://www.instagram.com/s.inuu_?igsh=Mm94NXJwNWVxenRr"
  },
  {
    name: "Rifan Rafeeq",
    role: "Co-Founder & Business Director",
    image: "/images/founders info 2.jpeg",
    instagram: "https://www.instagram.com/___rifan___k?igsh=MXBnYmw4MGU0ZTM2bg=="
  },
  {
    name: "Anu Sharwan",
    role: "Co-Founder & Operations Director",
    image: "/images/founders info 3.jpeg",
    instagram: "https://www.instagram.com/sharvaann_?igsh=cHIxaWEycjg1dmQ0"
  }
];

export default function Founders() {
  return (
    <section className="founders-section">
      <div className="container">
        <div className="section-header">
          <motion.h2
            className="section-title continuous-gradient"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Minds Behind GRABGO
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            A team of visionaries dedicated to revolutionizing campus convenience through technology.
          </motion.p>
        </div>

        <div className="founders-grid">
          {founders.map((founder, index) => (
            <motion.div
              key={index}
              className="founder-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover="hover"
            >
              <div className="founder-image-wrapper">
                <img src={founder.image} alt={founder.name} className="founder-image" />
                <motion.div
                  className="founder-overlay"
                  variants={{ hover: { opacity: 1 } }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <a href={founder.instagram} target="_blank" rel="noopener noreferrer" className="social-link" aria-label={`Instagram of ${founder.name}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
