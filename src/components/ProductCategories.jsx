import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Candy, Cookie, CupSoda, Battery, Sandwich, Coffee, Apple, Pizza, GlassWater, IceCream } from 'lucide-react';
import './ProductCategories.css';

const iconList = [Candy, Cookie, CupSoda, Battery, Sandwich, Coffee, Apple, Pizza, GlassWater, IceCream];

// We use plenty of items so it doesn't run out when scrolling
const icons = [...iconList, ...iconList, ...iconList, ...iconList, ...iconList];

export default function ProductCategories() {
  const containerRef = useRef(null);

  // Track the scroll progress of the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // "start end" means animation starts when top of section hits bottom of viewport
    // "end start" means animation ends when bottom of section hits top of viewport
    offset: ["start end", "end start"]
  });

  // Translate horizontally purely based on scroll progress (moving left as we scroll down)
  // Reduced from -35% to -8% to make the scroll effect beautifully subtle and slow
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section className="categories-section" ref={containerRef}>
      <motion.div
        className="marquee-container"
        style={{ x }}
      >
        <div className="wave-flex">
          {icons.map((Icon, i) => (
            <div
              key={i}
              className="category-icon-circle"
              style={{ '--index': i }}
            >
              <Icon size={16} strokeWidth={1.5} />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
