export default function PageDecorations() {
  return (
    <>
      {/* Top-right: star + quarter-circle arc from corner */}
      <div
        aria-hidden="true"
        className="fixed top-6 right-8 z-10 flex items-center gap-3 pointer-events-none"
      >
        <span className="text-lg text-text-primary opacity-60">✦</span>
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-text-primary opacity-20"
        >
          {/* Quarter-circle arcs anchored at top-right corner (60,0) */}
          <path d="M 10,0 A 50,50 0 0 1 60,50" />
          <path d="M 25,0 A 35,35 0 0 1 60,35" />
        </svg>
      </div>

      {/* Bottom-left: two quarter-circle arcs + small star */}
      <div
        aria-hidden="true"
        className="fixed bottom-8 left-8 z-10 flex items-end gap-2 pointer-events-none"
      >
        <svg
          width="70"
          height="70"
          viewBox="0 0 70 70"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-text-primary opacity-20"
        >
          {/* Quarter-circle arcs anchored at bottom-left corner (0,70) */}
          <path d="M 0,15 A 55,55 0 0 0 55,70" />
          <path d="M 0,32 A 38,38 0 0 0 38,70" />
        </svg>
        <span className="text-sm text-text-primary opacity-70 mb-2">✦</span>
      </div>

      {/* Bottom-right: large star + smaller offset star */}
      <div
        aria-hidden="true"
        className="fixed bottom-10 right-10 z-10 pointer-events-none"
      >
        <span className="text-2xl text-text-primary opacity-70">✦</span>
        <span className="text-xs text-text-primary opacity-40 absolute -top-3 -right-3">✦</span>
      </div>

      {/* Top-left: single faint quarter-circle arc */}
      <div
        aria-hidden="true"
        className="fixed top-20 left-6 z-10 pointer-events-none"
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-text-primary opacity-15"
        >
          {/* Quarter-circle arc anchored at top-left corner (0,0) */}
          <path d="M 45,0 A 45,45 0 0 0 0,45" />
        </svg>
      </div>
    </>
  );
}
