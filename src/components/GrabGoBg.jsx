import AnimatedDotGrid from './ParticleGrid';

/**
 * GrabGoBg
 * Full-page decorative background:
 *   1. Vibrant blue base colour (set on body / .app-wrapper via CSS)
 *   2. Animated dot grid (always visible, mouse-glow + twinkle)
 *   3. Thick curvy-loop SVG watermark shapes (poster aesthetic)
 *
 * This component is rendered once at the top of App and sits behind
 * every section via position: fixed / z-index: 0.
 */
export default function GrabGoBg() {
  return (
    <div className="grabgo-bg" aria-hidden="true">

      {/* ── 1. Animated dot grid ── */}
      <AnimatedDotGrid />

      {/* ── 2. Curvy-loop SVG watermark shapes (tiled) ── */}
      {[0, 1, 2, 3].map((tile) => (
        <svg
          key={tile}
          className="grabgo-bg-tile"
          style={{ top: `${tile * 900}px` }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Top-left: two thick wavy strokes */}
          <path
            d="M -80,200 C 60,80 200,260 340,160 C 430,90 400,220 500,280"
            fill="none"
            stroke="rgba(110,170,255,0.38)"
            strokeWidth="68"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M -100,420 C 60,310 210,500 360,380 C 460,290 430,430 560,500"
            fill="none"
            stroke="rgba(110,170,255,0.30)"
            strokeWidth="68"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Top-right: large open curl */}
          <path
            d="M 1060,-60 C 1420,-30 1520,260 1320,360 C 1160,440 1000,360 1100,200 C 1160,100 1320,130 1340,260"
            fill="none"
            stroke="rgba(110,170,255,0.34)"
            strokeWidth="72"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Bottom-right: double-loop pretzel */}
          <path
            d="M 980,980 C 980,760 1180,760 1180,940 C 1180,680 1400,680 1400,900 C 1400,1080 1200,1080 1150,940 C 1100,820 1260,780 1310,880"
            fill="none"
            stroke="rgba(110,170,255,0.34)"
            strokeWidth="72"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Bottom-left accent loop */}
          <path
            d="M -60,820 C 60,680 200,820 180,960 C 160,1060 40,1040 20,940"
            fill="none"
            stroke="rgba(110,170,255,0.26)"
            strokeWidth="60"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}
