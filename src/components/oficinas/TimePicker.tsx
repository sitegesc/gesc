"use client";

import { useEffect, useRef, useState } from "react";

import { ClockIcon } from "@/components/ui/icons";

// Seletor de horário próprio (o <input type="time"> nativo muda muito de
// aparência entre navegadores). Portado de initTimePicker() em
// assets/js/inscricao-oficina.js.

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];

type TimePickerProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
};

export function TimePicker({ id, value, onChange }: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [hour, minute] = value.split(":");

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const column = (
    values: string[],
    selected: string,
    onSelect: (next: string) => void,
  ) => (
    <div className="flex max-h-[180px] w-14 flex-col gap-0.5 overflow-y-auto">
      {values.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onSelect(item)}
          className={`rounded-md py-2 text-center text-[0.85rem] transition-colors ${
            item === selected
              ? "bg-brand-blue font-semibold text-white"
              : "text-[#333] hover:bg-[#f0f2f5]"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        id={id}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center gap-2.5 rounded-lg border bg-[#fafafa] px-3 py-2.5 text-base text-[#333] transition-colors ${
          open ? "border-brand-blue bg-white" : "border-[#ddd] hover:border-brand-blue"
        }`}
      >
        <ClockIcon className="h-4 w-4 text-brand-blue" />
        <span>{value}</span>
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-20 flex gap-1 rounded-lg border border-[#ddd] bg-white p-2 shadow-[0_10px_24px_rgba(0,0,0,0.12)]">
          {column(HOURS, hour, (next) => onChange(`${next}:${minute}`))}
          {column(MINUTES, minute, (next) => onChange(`${hour}:${next}`))}
        </div>
      )}
    </div>
  );
}
