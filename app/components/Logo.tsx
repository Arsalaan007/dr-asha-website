export function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="var(--teal)" />
      {/* stylised spine */}
      <g fill="#fff">
        <rect x="16" y="7" width="8" height="4.2" rx="2.1" />
        <rect x="15" y="13" width="10" height="4.2" rx="2.1" />
        <rect x="14.5" y="19" width="11" height="4.2" rx="2.1" />
        <rect x="15" y="25" width="10" height="4.2" rx="2.1" />
        <rect x="16.5" y="31" width="7" height="3" rx="1.5" opacity=".7" />
      </g>
    </svg>
  );
}
