import { useEffect, useRef } from 'react';

/**
 * AnimatedDotGrid
 * ─────────────────────────────────────────────────────────────────
 * Regular dot grid with:
 *   • Always-visible base dots (low opacity)
 *   • Mouse GLOW — dots near cursor brighten and grow (no movement)
 *   • Subtle random twinkle on all dots
 */
export default function AnimatedDotGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');

    // ── Config ────────────────────────────────────────────────────
    const SPACING       = 30;    // grid cell size (px)
    const DOT_R         = 1.6;   // base dot radius (px)
    const BASE_OPACITY  = 0.22;  // resting opacity
    const HOVER_OPACITY = 0.90;  // peak opacity near cursor
    const MOUSE_RADIUS  = 180;   // glow influence radius (px)
    const TWINKLE_SPD   = 0.5;   // radians / second
    // ─────────────────────────────────────────────────────────────

    let rafId;
    let dots = [];
    const mouse = { x: -9999, y: -9999 };

    // ── Dot class ─────────────────────────────────────────────────
    class Dot {
      constructor(x, y) {
        this.x     = x;
        this.y     = y;
        this.phase = Math.random() * Math.PI * 2; // random twinkle offset
      }

      draw(time) {
        // Distance to cursor (page-space)
        const mx   = mouse.x + window.scrollX;
        const my   = mouse.y + window.scrollY;
        const dx   = this.x - mx;
        const dy   = this.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Proximity [0 → 1] — 1 = cursor is right on it
        const proximity = dist < MOUSE_RADIUS ? 1 - dist / MOUSE_RADIUS : 0;

        // Twinkle oscillation around base opacity
        const twinkle = Math.sin(time * TWINKLE_SPD + this.phase) * 0.10;

        // Final opacity
        const opacity = Math.min(
          1,
          BASE_OPACITY + twinkle + proximity * (HOVER_OPACITY - BASE_OPACITY)
        );

        // Radius grows slightly when hovered
        const radius = DOT_R + proximity * 1.6;

        // Colour: white base → cyan-white glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = proximity > 0.05
          ? `rgba(200, 230, 255, ${opacity})`
          : `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();

        // Soft bloom halo for strongly hovered dots
        if (proximity > 0.4) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 230, 255, ${proximity * 0.12})`;
          ctx.fill();
        }
      }
    }

    // ── Build the grid ───────────────────────────────────────────
    const buildGrid = () => {
      const w    = canvas.width;
      const h    = canvas.height;
      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;
      const offX = (w % SPACING) / 2;
      const offY = (h % SPACING) / 2;

      dots = [];
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          dots.push(new Dot(offX + c * SPACING, offY + r * SPACING));
        }
      }
    };

    // ── Resize ───────────────────────────────────────────────────
    const onResize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      buildGrid();
    };

    // ── Mouse (viewport coords) ──────────────────────────────────
    const onMouseMove  = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onMouseLeave = ()  => { mouse.x = -9999;     mouse.y = -9999;     };

    // ── Animation loop ───────────────────────────────────────────
    const animate = (ts) => {
      const time = ts / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < dots.length; i++) dots[i].draw(time);
      rafId = requestAnimationFrame(animate);
    };

    // ── Init ─────────────────────────────────────────────────────
    onResize();

    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseout',  onMouseLeave);

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout',  onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position      : 'absolute',
        top           : 0,
        left          : 0,
        width         : '100%',
        height        : '100%',
        pointerEvents : 'none',
        zIndex        : 0,
      }}
    />
  );
}
