// Ícones em SVG inline (o projeto não usa Font Awesome). Todos herdam
// `currentColor` e o tamanho vem de classes utilitárias (w-4 h-4 etc.).

type IconProps = { className?: string };

function base(className = "h-4 w-4") {
  return {
    className,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor" as const,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function RepeatIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M17 2l4 4-4 4" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <path d="M7 22l-4-4 4-4" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

export function MapPinIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function InfoIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </svg>
  );
}

export function ArrowsIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M8 3L4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4" />
    </svg>
  );
}

export function ChevronLeftIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function CheckCircleIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </svg>
  );
}

export function SendIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

export function SpinnerIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      className={`animate-spin ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  );
}

export function GraduationIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M22 10L12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

export function BuildingIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M10 21v-4h4v4" />
    </svg>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function FilterIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M3 5h18l-7 8v6l-4-2v-4L3 5z" />
    </svg>
  );
}
