// Hand-painted wooden directional signpost, drawn as SVG for real bevels,
// wood shading, screws, and shadows. Signs alternate pointing left and right.
const TONES = [
  { id: "teal", top: "#4cc0b2", mid: "#2f9d8f", bot: "#1c7064", edge: "#134b41", text: "#fdf7e9" },
  { id: "wood", top: "#dcb47c", mid: "#c0925a", bot: "#8f6537", edge: "#6a4a29", text: "#3a2612" },
  { id: "ocean", top: "#5cabca", mid: "#3f88ad", bot: "#295f80", edge: "#1d465f", text: "#fdf7e9" },
];

const W = 154;
const H = 44;
const NOTCH = 27;
const COUNT = 6;
const GAP = 62;
const TOP = 66;

export default function Signpost({ signs = [] }) {
  const list = signs.slice(0, COUNT);
  const vbW = 360;
  const vbH = TOP + (COUNT - 1) * GAP + H + 54;
  const postTop = 42;
  const postBot = TOP + (list.length - 1) * GAP + H + 6;

  return (
    <svg
      className="signpost-svg"
      viewBox={`0 0 ${vbW} ${vbH}`}
      role="img"
      aria-label={`Directional signpost pointing to ${list.join(", ")}`}
    >
      <defs>
        {TONES.map((t) => (
          <linearGradient key={t.id} id={`plank-${t.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={t.top} />
            <stop offset="0.5" stopColor={t.mid} />
            <stop offset="1" stopColor={t.bot} />
          </linearGradient>
        ))}
        <linearGradient id="post" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#42301c" />
          <stop offset="0.32" stopColor="#7a5636" />
          <stop offset="0.55" stopColor="#8c6640" />
          <stop offset="0.75" stopColor="#654325" />
          <stop offset="1" stopColor="#3c2a18" />
        </linearGradient>
        <radialGradient id="screw" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#f2efe6" />
          <stop offset="0.4" stopColor="#b9b2a2" />
          <stop offset="1" stopColor="#6c6555" />
        </radialGradient>
        <filter id="signShadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#1c1206" floodOpacity="0.32" />
        </filter>
      </defs>

      {/* sand mound */}
      <ellipse cx="180" cy={vbH - 20} rx="86" ry="17" fill="#e3d1a6" opacity="0.9" />
      <ellipse cx="180" cy={vbH - 22} rx="58" ry="10" fill="#d3bd8e" opacity="0.7" />

      {/* post */}
      <rect x="166" y={postTop} width="28" height={postBot - postTop} rx="6" fill="url(#post)" stroke="#2e2013" strokeWidth="1" />
      {/* post grain */}
      {[172, 180, 188].map((x) => (
        <line key={x} x1={x} y1={postTop + 6} x2={x} y2={postBot - 6} stroke="#2e2013" strokeOpacity="0.28" strokeWidth="1" />
      ))}
      {/* post cap */}
      <rect x="160" y={postTop - 12} width="40" height="16" rx="6" fill="url(#post)" stroke="#2e2013" strokeWidth="1" />

      {list.map((label, i) => {
        const tone = TONES[i % TONES.length];
        const left = i % 2 === 0;
        const ty = TOP + i * GAP;
        const tx = left ? 195 - W : 165;
        const rot = left ? -2.4 : 2.4;
        const cx = W / 2;
        const cy = H / 2;
        const path = left
          ? `M ${NOTCH} 0 L ${W} 0 L ${W} ${H} L ${NOTCH} ${H} L 0 ${cy} Z`
          : `M 0 0 L ${W - NOTCH} 0 L ${W} ${cy} L ${W - NOTCH} ${H} L 0 ${H} Z`;
        const textX = left ? (NOTCH + W) / 2 + 3 : (W - NOTCH) / 2 - 3;
        const screwX = left ? W - 13 : 13;
        return (
          <g
            key={label}
            transform={`translate(${tx} ${ty}) rotate(${rot} ${cx} ${cy})`}
            filter="url(#signShadow)"
          >
            <path d={path} fill={`url(#plank-${tone.id})`} stroke={tone.edge} strokeWidth="1.5" />
            {/* top highlight + grain streaks */}
            <path d={path} fill="none" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="1" transform="translate(0 1.5)" />
            <line x1={left ? NOTCH : 6} y1={cy - 7} x2={left ? W - 6 : W - NOTCH} y2={cy - 7} stroke="#000" strokeOpacity="0.07" strokeWidth="1.5" />
            <line x1={left ? NOTCH : 6} y1={cy + 8} x2={left ? W - 6 : W - NOTCH} y2={cy + 8} stroke="#000" strokeOpacity="0.09" strokeWidth="1.5" />
            {/* screws at the post end */}
            {[cy - 10, cy + 10].map((sy) => (
              <g key={sy}>
                <circle cx={screwX} cy={sy} r="3.1" fill="url(#screw)" stroke="#4a4335" strokeWidth="0.6" />
                <line x1={screwX - 2} y1={sy} x2={screwX + 2} y2={sy} stroke="#4a4335" strokeWidth="0.7" />
              </g>
            ))}
            <text
              x={textX}
              y={cy + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              className="signpost-text"
              fill={tone.text}
            >
              {label.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
