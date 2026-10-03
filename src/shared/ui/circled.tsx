/** A hand-drawn gold ellipse around one word. Used at most once per page. */
export function Circled({ children }: { children: React.ReactNode }) {
  return (
    <span className="circled">
      {children}
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M52 3C24 2 3 9 3 21c0 11 22 17 49 16 27-1 46-8 45-19C96 7 75 1 44 4"
          pathLength={1}
          fill="none"
          stroke="var(--gold)"
          strokeWidth={1.2}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}
