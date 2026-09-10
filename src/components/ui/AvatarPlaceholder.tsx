// Avatar genérico (usado enquanto não há foto da pessoa).
export function AvatarPlaceholder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <rect width="100" height="100" fill="#e9edf2" />
      <circle cx="50" cy="38" r="17" fill="#aab4c0" />
      <path d="M18 86c2-18 15-28 32-28s30 10 32 28z" fill="#aab4c0" />
    </svg>
  );
}
