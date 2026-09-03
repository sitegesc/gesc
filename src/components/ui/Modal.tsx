"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "md" | "lg";
};

export function Modal({ open, onClose, title, children, size = "md" }: ModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-[family-name:'Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
      <button
        type="button"
        aria-label="Fechar"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative z-10 max-h-[85vh] w-full overflow-y-auto rounded-xl bg-white p-8 shadow-2xl ${
          size === "lg" ? "max-w-4xl" : "max-w-2xl"
        }`}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-xl font-bold text-brand-blue">
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="-mt-1 -mr-1 shrink-0 rounded p-1 text-2xl leading-none text-zinc-400 transition-colors hover:text-brand-red"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="text-sm leading-relaxed text-[#444]">{children}</div>
      </div>
    </div>
  );
}
