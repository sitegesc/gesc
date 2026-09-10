// Montagem da agenda do calendário de oficinas.
//
// Portado de assets/js/calendario-aulas.js do site antigo. As oficinas
// não têm data de início própria — assume-se uma data única
// (DATA_INICIO_OFICINAS) e, a partir dela, cada oficina acontece 1x por
// semana no primeiro "dia possível", repetindo pela quantidade de
// encontros.

import {
  DATA_INICIO_OFICINAS,
  OFICINAS,
  WEEKDAY_LABELS,
  WEEKDAY_PLURAL,
  WEEKDAY_SHORT,
  duracaoLabel,
  type Oficina,
} from "@/data/oficinas";

export type Sessao = {
  oficinaId: string;
  title: string;
  short: string;
  color: string;
  date: Date;
  key: string;
  time: string;
  endTime: string;
  duration: string;
  number: number;
  total: number;
};

export type OficinaAgenda = Oficina & {
  duration: string;
  classWeekday: string;
  possibleDays: string;
  firstDate: Date;
  lastDate: Date;
};

// --- utilidades de data ---

export function parseISO(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function addDays(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}

export function isoKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${date.getFullYear()}`;
}

export function formatShortDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}`;
}

export function addMinutesToTime(time: string, minutes: number): string {
  const [hour, minute] = time.split(":").map(Number);
  const total = hour * 60 + minute + minutes;
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function weekdaysLabel(weekdays: number[]): string {
  const sorted = [...weekdays].sort((a, b) => a - b);
  const contiguous = sorted.every(
    (value, index) => index === 0 || value === sorted[index - 1] + 1,
  );

  if (contiguous && sorted.length > 2) {
    const first = WEEKDAY_LABELS[sorted[0]].replace("-feira", "");
    const last = WEEKDAY_LABELS[sorted[sorted.length - 1]]
      .replace("-feira", "")
      .toLowerCase();
    return `${first} a ${last}`;
  }

  return sorted.map((day) => WEEKDAY_SHORT[day]).join(", ");
}

// --- montagem da agenda ---

function firstOccurrence(startDate: Date, weekdays: number[]): Date {
  let date = startDate;

  for (let i = 0; i < 7; i += 1) {
    if (weekdays.includes(date.getDay())) return date;
    date = addDays(date, 1);
  }

  return startDate;
}

export function buildSchedule(): {
  sessions: Sessao[];
  legend: OficinaAgenda[];
} {
  const sessions: Sessao[] = [];
  const legend: OficinaAgenda[] = [];

  OFICINAS.forEach((oficina) => {
    const start = parseISO(DATA_INICIO_OFICINAS);
    const first = firstOccurrence(start, oficina.weekdays);
    const dates: Date[] = [];

    for (let i = 0; i < oficina.sessions; i += 1) {
      const date = addDays(first, i * 7);
      dates.push(date);

      sessions.push({
        oficinaId: oficina.id,
        title: oficina.title,
        short: oficina.short,
        color: oficina.color,
        date,
        key: isoKey(date),
        time: oficina.time,
        endTime: addMinutesToTime(oficina.time, oficina.durationMin),
        duration: duracaoLabel(oficina.durationMin),
        number: i + 1,
        total: oficina.sessions,
      });
    }

    legend.push({
      ...oficina,
      duration: duracaoLabel(oficina.durationMin),
      classWeekday: WEEKDAY_PLURAL[first.getDay()],
      possibleDays: weekdaysLabel(oficina.weekdays),
      firstDate: dates[0],
      lastDate: dates[dates.length - 1],
    });
  });

  sessions.sort((a, b) => a.date.getTime() - b.date.getTime());

  return { sessions, legend };
}
