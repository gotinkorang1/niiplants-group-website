import { cn } from "@/lib/utils";

/**
 * Brand artwork — a stylized route network (roads, freight lanes, and
 * travel arcs radiating from Accra) drawn as inline SVG. Lines draw in,
 * nodes pop, and the hub pulses; all pure CSS animation, so it inherits
 * the global prefers-reduced-motion kill switch and costs no image bytes.
 */
export function RouteNetworkArt({
  mode = "dark",
  className,
}: {
  mode?: "dark" | "light";
  className?: string;
}) {
  const line = mode === "dark" ? "rgba(255,255,255,0.28)" : "rgba(30,41,59,0.25)";
  const gold = "var(--color-accent-500)";
  const node = mode === "dark" ? "rgba(255,255,255,0.75)" : "rgba(30,41,59,0.6)";

  const draw = (delay: number) => ({
    strokeDasharray: 1,
    strokeDashoffset: 1,
    animation: `dash-draw 1.6s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s forwards`,
  });

  const pop = (delay: number) => ({
    opacity: 0,
    transformOrigin: "center",
    transformBox: "fill-box" as const,
    animation: `node-pop 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s forwards`,
  });

  return (
    <svg
      viewBox="0 0 600 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="Stylized network of routes radiating from Accra across Ghana"
    >
      {/* Route arcs radiating from the Accra hub (300, 340). */}
      <path d="M300 340 C 240 260, 160 220, 90 200" stroke={line} strokeWidth="1.5" pathLength={1} style={draw(0.2)} />
      <path d="M300 340 C 300 240, 280 160, 250 80" stroke={line} strokeWidth="1.5" pathLength={1} style={draw(0.35)} />
      <path d="M300 340 C 370 270, 440 230, 520 210" stroke={line} strokeWidth="1.5" pathLength={1} style={draw(0.5)} />
      <path d="M300 340 C 380 330, 460 350, 530 390" stroke={line} strokeWidth="1.5" pathLength={1} style={draw(0.65)} />
      <path d="M300 340 C 240 380, 170 400, 100 440" stroke={line} strokeWidth="1.5" pathLength={1} style={draw(0.8)} />
      {/* Gold "flagship" route. */}
      <path
        d="M300 340 C 360 220, 430 140, 500 70"
        stroke={gold}
        strokeWidth="2"
        pathLength={1}
        style={draw(0.95)}
      />
      {/* Dashed connector between two outer nodes — the group's adjacency. */}
      <path
        d="M90 200 C 150 120, 200 100, 250 80"
        stroke={line}
        strokeWidth="1"
        strokeDasharray="4 6"
        opacity="0.7"
      />
      <path
        d="M520 210 C 530 270, 535 330, 530 390"
        stroke={line}
        strokeWidth="1"
        strokeDasharray="4 6"
        opacity="0.7"
      />

      {/* Destination nodes. */}
      <circle cx="90" cy="200" r="5" fill={node} style={pop(1.1)} />
      <circle cx="250" cy="80" r="5" fill={node} style={pop(1.2)} />
      <circle cx="520" cy="210" r="5" fill={node} style={pop(1.3)} />
      <circle cx="530" cy="390" r="5" fill={node} style={pop(1.4)} />
      <circle cx="100" cy="440" r="5" fill={node} style={pop(1.5)} />
      <circle cx="500" cy="70" r="6" fill={gold} style={pop(1.6)} />

      {/* Accra hub — concentric pulse. */}
      <circle
        cx="300"
        cy="340"
        r="26"
        stroke={gold}
        strokeWidth="1"
        opacity="0.5"
        style={{ animation: "pulse-soft 3s ease-in-out 1.8s infinite" }}
      />
      <circle cx="300" cy="340" r="14" stroke={gold} strokeWidth="1.5" style={pop(0.15)} />
      <circle cx="300" cy="340" r="6" fill={gold} style={pop(0.1)} />
    </svg>
  );
}
