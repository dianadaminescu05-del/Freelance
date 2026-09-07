type LogoSize = 'sm' | 'md' | 'lg';

const SCALE: Record<LogoSize, number> = { sm: 0.52, md: 0.8, lg: 1.1 };

/** Stacked-plates mark + wordmark, reproduced from the original site. */
export default function Logo({
  size = 'md',
  darkBg = false,
}: {
  size?: LogoSize;
  darkBg?: boolean;
}) {
  const s = SCALE[size];
  const wordColor = darkBg ? '#F8F7F5' : '#111111';
  const ruleColor = darkBg ? '#5a5a5a' : '#b6b3ad';
  // 'Print & Packaging' renders at 4px in the small lockup — below any
  // legible size. The compact mark drops it and keeps the wordmark.
  const showTagline = size !== 'sm';
  const box = Math.round(110 * s);

  const plates = [
    { y: 92, top: '#3A3A3A', left: '#1E1E1E', right: '#555555' },
    { y: 75, top: '#F5C200', left: '#C89A00', right: '#FFD740' },
    { y: 58, top: '#E8318A', left: '#B01560', right: '#F060A4' },
    { y: 41, top: '#0099CC', left: '#006E99', right: '#33BBEE', gloss: true },
  ];

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: `${Math.round(12 * s)}px` }}>
      <svg width={box} height={box} viewBox="0 0 110 110" aria-hidden="true">
        <ellipse cx="55" cy="103" rx="42" ry="9" fill="rgba(0,0,0,0.06)" />
        {plates.map((p) => (
          <g key={p.y} transform={`translate(55,${p.y})`}>
            <polygon points="0,-9 36,9 0,18 -36,9" fill={p.top} />
            <polygon points="-36,9 -36,17 0,26 0,18" fill={p.left} />
            <polygon points="36,9 36,17 0,26 0,18" fill={p.right} />
            {p.gloss && (
              <polygon points="0,-9 14,2 0,8 -14,2" fill="rgba(255,255,255,0.18)" />
            )}
          </g>
        ))}
      </svg>

      <div>
        <div
          style={{
            fontFamily: "'Space Grotesk', 'Arial Black', sans-serif",
            fontWeight: 700,
            fontSize: `${Math.round(20 * s)}px`,
            color: wordColor,
            letterSpacing: `${(0.5 * s).toFixed(1)}px`,
            lineHeight: 1,
            textTransform: 'uppercase',
          }}
        >
          Almariones
        </div>
        {showTagline && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: `${Math.round(5 * s)}px`,
              marginTop: `${Math.round(5 * s)}px`,
            }}
          >
            <span style={{ height: 1, width: Math.round(16 * s), background: ruleColor }} />
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 500,
                fontSize: `${Math.max(11, Math.round(7 * s))}px`,
                color: darkBg ? 'rgba(248,247,245,0.72)' : '#6b6b6b',
                letterSpacing: `${(2 * s).toFixed(1)}px`,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              Print &amp; Packaging
            </span>
            <span style={{ height: 1, width: Math.round(16 * s), background: ruleColor }} />
          </div>
        )}
      </div>
    </div>
  );
}
