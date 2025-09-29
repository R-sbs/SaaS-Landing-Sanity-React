export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    // Replace your existing <svg> with this
    <svg
      aria-hidden="true"
      viewBox="0 0 119 40"
      {...props}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>BlogPal</title>

      {/* blue mark (kept as-is) */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 20c0 11.046 8.954 20 20 20s20-8.954 20-20S31.046 0 20 0 0 8.954 0 20Zm20 16c-7.264 0-13.321-5.163-14.704-12.02C4.97 22.358 6.343 21 8 21h24c1.657 0 3.031 1.357 2.704 2.98C33.32 30.838 27.264 36 20 36Z"
        fill="#2563EB"
      />

      {/* Text: 'Blog' (dark) + 'Pal' (blue) */}
      <g transform="translate(44,0)">
        <text
          x="0"
          y="26"
          fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
          fontWeight="700"
          fontSize="18"
          letterSpacing="0.2"
          fill="#0F172A"
          alignmentBaseline="middle"
          dominantBaseline="middle"
        >
          <tspan>Blog</tspan>
          <tspan fill="#2563EB" dx="0">
            Pal
          </tspan>
        </text>
      </g>
    </svg>
  )
}
