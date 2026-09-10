"use client";

import { useEffect, useMemo, useState } from "react";

import {
  SALA_OFICINAS,
  WEEKDAY_LABELS,
  WEEKDAY_SHORT,
  encontrosLabel,
} from "@/data/oficinas";
import {
  addDays,
  buildSchedule,
  capitalize,
  formatDate,
  formatShortDate,
  isoKey,
  parseISO,
  type OficinaAgenda,
  type Sessao,
} from "@/lib/calendario";
import { Modal } from "@/components/ui/Modal";

import {
  ArrowsIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  InfoIcon,
  MapPinIcon,
} from "@/components/ui/icons";

// Portado de calendario-aulas.html + assets/js/calendario-aulas.js do
// site antigo. No celular a grade mensal fica ilegível, então abaixo de
// 620px mostramos uma agenda semanal.

type ModalState =
  | { kind: "day"; key: string }
  | { kind: "workshop"; oficinaId: string }
  | null;

const MOBILE_QUERY = "(max-width: 620px)";

export function CalendarioOficinas() {
  const { sessions, legend } = useMemo(() => buildSchedule(), []);

  const byDay = useMemo(() => {
    const map = new Map<string, Sessao[]>();
    sessions.forEach((session) => {
      const list = map.get(session.key) ?? [];
      list.push(session);
      map.set(session.key, list);
    });
    for (const list of map.values()) {
      list.sort((a, b) => a.time.localeCompare(b.time));
    }
    return map;
  }, [sessions]);

  const firstSession = sessions[0].date;
  const lastSession = sessions[sessions.length - 1].date;
  const minMonth = firstSession.getFullYear() * 12 + firstSession.getMonth();
  const maxMonth = lastSession.getFullYear() * 12 + lastSession.getMonth();

  const [viewYear, setViewYear] = useState(firstSession.getFullYear());
  const [viewMonth, setViewMonth] = useState(firstSession.getMonth());
  const [selectedKey, setSelectedKey] = useState(isoKey(firstSession));
  const [weekAnchor, setWeekAnchor] = useState(firstSession);
  const [modal, setModal] = useState<ModalState>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const todayKey = isoKey(new Date());

  function weekStartOf(date: Date) {
    const clean = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return addDays(clean, -clean.getDay());
  }

  function openDay(key: string) {
    setSelectedKey(key);
    setModal({ kind: "day", key });
  }

  function step(direction: number) {
    if (isMobile) {
      setWeekAnchor((anchor) => addDays(weekStartOf(anchor), direction * 7));
      return;
    }
    setViewMonth((month) => {
      const next = month + direction;
      if (next < 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      if (next > 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return next;
    });
  }

  const currentMonth = viewYear * 12 + viewMonth;
  const weekStart = weekStartOf(weekAnchor);
  const weekEnd = addDays(weekStart, 6);

  const prevDisabled = isMobile
    ? weekStart.getTime() <= weekStartOf(firstSession).getTime()
    : currentMonth <= minMonth;
  const nextDisabled = isMobile
    ? weekStart.getTime() >= weekStartOf(lastSession).getTime()
    : currentMonth >= maxMonth;

  const navLabel = isMobile
    ? `${formatShortDate(weekStart)} a ${formatShortDate(weekEnd)}`
    : capitalize(
        new Date(viewYear, viewMonth, 1).toLocaleDateString("pt-BR", {
          month: "long",
          year: "numeric",
        }),
      );

  const upcoming = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return sessions
      .filter((session) => session.date >= start)
      .slice(0, 8);
  }, [sessions]);

  const modalDay =
    modal?.kind === "day"
      ? { date: parseISO(modal.key), list: byDay.get(modal.key) ?? [] }
      : null;
  const modalWorkshop =
    modal?.kind === "workshop"
      ? legend.find((item) => item.id === modal.oficinaId) ?? null
      : null;

  return (
    <>
      {/* Resumo */}
      <div className="mb-6 flex flex-wrap gap-x-2.5 gap-y-2">
        {[
          <>
            <strong className="text-[0.9rem] text-brand-blue">
              {legend.length}
            </strong>{" "}
            oficinas
          </>,
          <>
            <strong className="text-[0.9rem] text-brand-blue">
              {sessions.length}
            </strong>{" "}
            encontros
          </>,
          <>
            {formatDate(firstSession)}{" "}
            <span className="text-[#9aa1ac]">→</span> {formatDate(lastSession)}
          </>,
        ].map((content, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#e2e5ea] bg-[#f7f9fc] px-3 py-1.5 text-[0.78rem] font-semibold text-[#3f4652]"
          >
            {content}
          </span>
        ))}
      </div>

      <div className="grid gap-6 min-[900px]:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] min-[900px]:items-start">
        {/* Calendário */}
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={prevDisabled}
              aria-label={isMobile ? "Semana anterior" : "Mês anterior"}
              className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-lg border border-[#dce1e9] bg-white text-brand-blue transition-colors hover:enabled:border-brand-blue hover:enabled:bg-[#eef2f9] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeftIcon />
            </button>
            <span className="text-center text-base font-bold text-brand-blue">
              {navLabel}
            </span>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={nextDisabled}
              aria-label={isMobile ? "Próxima semana" : "Próximo mês"}
              className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-lg border border-[#dce1e9] bg-white text-brand-blue transition-colors hover:enabled:border-brand-blue hover:enabled:bg-[#eef2f9] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRightIcon />
            </button>
          </div>

          {isMobile ? (
            <WeekAgenda
              weekStart={weekStart}
              byDay={byDay}
              todayKey={todayKey}
              onOpenDay={openDay}
            />
          ) : (
            <MonthGrid
              viewYear={viewYear}
              viewMonth={viewMonth}
              byDay={byDay}
              todayKey={todayKey}
              selectedKey={selectedKey}
              onOpenDay={openDay}
            />
          )}

          <p className="mt-3 text-[0.72rem] leading-relaxed text-[#888]">
            Clique num dia com aula para ver os detalhes.
          </p>
        </div>

        {/* Barra lateral */}
        <aside className="grid gap-5">
          <div>
            <h3 className="mb-3 border-b-2 border-[#f0f2f5] pb-2 text-[0.92rem] font-bold text-brand-blue">
              Próximas aulas
            </h3>
            {upcoming.length === 0 ? (
              <p className="text-[0.82rem] text-[#888]">
                Todos os encontros já foram realizados.
              </p>
            ) : (
              <div className="grid gap-2">
                {upcoming.map((session) => (
                  <button
                    key={`${session.key}-${session.oficinaId}-${session.number}`}
                    type="button"
                    onClick={() => {
                      setViewYear(session.date.getFullYear());
                      setViewMonth(session.date.getMonth());
                      setWeekAnchor(session.date);
                      openDay(session.key);
                    }}
                    className="group flex items-center gap-2 text-left text-[0.8rem] text-[#3f4652]"
                  >
                    <span className="min-w-[46px] font-bold text-brand-blue">
                      {formatShortDate(session.date)}
                    </span>
                    <span
                      className="h-[9px] w-[9px] shrink-0 rounded-full"
                      style={{ background: session.color }}
                    />
                    <span className="flex-1 truncate group-hover:text-brand-blue">
                      {session.time} · {session.short}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="mb-3 border-b-2 border-[#f0f2f5] pb-2 text-[0.92rem] font-bold text-brand-blue">
              Oficinas
            </h3>
            <p className="mb-2.5 text-[0.74rem] leading-snug text-[#888]">
              Clique em uma oficina para ver a descrição completa.
            </p>
            <div className="grid gap-0.5">
              {legend.map((workshop) => (
                <button
                  key={workshop.id}
                  type="button"
                  onClick={() =>
                    setModal({ kind: "workshop", oficinaId: workshop.id })
                  }
                  aria-label={`Ver descrição de ${workshop.title}`}
                  className="flex w-full gap-2.5 rounded-lg p-1.5 text-left transition-colors hover:bg-[#f2f5fa]"
                >
                  <span
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded"
                    style={{ background: workshop.color }}
                  />
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-[0.82rem] font-bold leading-snug text-[#333]">
                      {workshop.title}
                    </span>
                    <span className="text-[0.72rem] leading-snug text-[#777]">
                      {workshop.classWeekday} às {workshop.time} ·{" "}
                      {workshop.duration} · {encontrosLabel(workshop.sessions)}
                    </span>
                    <span className="text-[0.72rem] leading-snug text-[#777]">
                      {formatDate(workshop.firstDate)} →{" "}
                      {formatDate(workshop.lastDate)}
                    </span>
                  </span>
                  <ChevronRightIcon className="ml-auto h-3 w-3 shrink-0 self-center text-[#b7bec9]" />
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <Modal
        open={modal !== null}
        onClose={() => setModal(null)}
        title={
          modalDay
            ? `${capitalize(
                WEEKDAY_LABELS[modalDay.date.getDay()],
              )}, ${formatDate(modalDay.date)}`
            : modalWorkshop?.title ?? ""
        }
      >
        {modalDay && <DayModalBody list={modalDay.list} />}
        {modalWorkshop && <WorkshopModalBody workshop={modalWorkshop} />}
      </Modal>
    </>
  );
}

// --- grade mensal (desktop) ---

function MonthGrid({
  viewYear,
  viewMonth,
  byDay,
  todayKey,
  selectedKey,
  onOpenDay,
}: {
  viewYear: number;
  viewMonth: number;
  byDay: Map<string, Sessao[]>;
  todayKey: string;
  selectedKey: string;
  onOpenDay: (key: string) => void;
}) {
  const reference = new Date(viewYear, viewMonth, 1);
  const offset = reference.getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const totalCells = Math.ceil((offset + daysInMonth) / 7) * 7;

  return (
    <div className="grid grid-cols-7 gap-1">
      {WEEKDAY_SHORT.map((label) => (
        <div
          key={label}
          className="py-1.5 text-center text-[0.68rem] font-bold uppercase tracking-wide text-[#5f6775]"
        >
          {label}
        </div>
      ))}

      {Array.from({ length: totalCells }, (_, cellIndex) => {
        const dayNumber = cellIndex - offset + 1;

        if (dayNumber < 1 || dayNumber > daysInMonth) {
          return <div key={cellIndex} className="min-h-[94px] rounded-lg" />;
        }

        const date = new Date(viewYear, viewMonth, dayNumber);
        const key = isoKey(date);
        const dayClasses = byDay.get(key) ?? [];
        const hasClasses = dayClasses.length > 0;

        return (
          <div
            key={cellIndex}
            role={hasClasses ? "button" : undefined}
            tabIndex={hasClasses ? 0 : undefined}
            onClick={hasClasses ? () => onOpenDay(key) : undefined}
            onKeyDown={
              hasClasses
                ? (event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onOpenDay(key);
                    }
                  }
                : undefined
            }
            className={`flex min-h-[94px] flex-col gap-[3px] overflow-hidden rounded-lg border p-[5px] text-left transition-colors ${
              hasClasses
                ? "cursor-pointer border-[#e6e8ec] bg-white hover:border-brand-blue"
                : "border-[#e6e8ec] bg-[#fafafa]"
            } ${
              key === selectedKey
                ? "border-brand-blue shadow-[0_0_0_2px_rgba(0,34,102,0.15)]"
                : ""
            }`}
          >
            <span
              className={`grid h-[22px] w-[22px] place-items-center rounded-full text-[0.72rem] font-bold ${
                key === todayKey
                  ? "bg-brand-blue text-white"
                  : "text-[#333]"
              }`}
            >
              {dayNumber}
            </span>

            {dayClasses.slice(0, 3).map((session) => (
              <span
                key={`${session.oficinaId}-${session.number}`}
                className="block max-w-full truncate rounded px-1.5 py-0.5 text-[0.62rem] font-semibold leading-snug text-white"
                style={{ background: session.color }}
              >
                {session.time} {session.short}
              </span>
            ))}

            {dayClasses.length > 3 && (
              <span className="text-[0.6rem] font-bold text-[#5f6775]">
                +{dayClasses.length - 3}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// --- agenda semanal (celular) ---

function WeekAgenda({
  weekStart,
  byDay,
  todayKey,
  onOpenDay,
}: {
  weekStart: Date;
  byDay: Map<string, Sessao[]>;
  todayKey: string;
  onOpenDay: (key: string) => void;
}) {
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)).filter(
    (date) => (byDay.get(isoKey(date)) ?? []).length > 0,
  );

  if (days.length === 0) {
    return (
      <p className="text-[0.82rem] text-[#888]">Nenhuma aula nesta semana.</p>
    );
  }

  return (
    <div className="grid gap-2">
      {days.map((date) => {
        const key = isoKey(date);
        const list = byDay.get(key) ?? [];
        return (
          <button
            key={key}
            type="button"
            onClick={() => onOpenDay(key)}
            className={`rounded-[10px] border bg-white p-3 text-left transition-colors hover:border-brand-blue ${
              key === todayKey
                ? "border-brand-blue shadow-[0_0_0_2px_rgba(0,34,102,0.12)]"
                : "border-[#e6e8ec]"
            }`}
          >
            <div className="mb-2.5 flex items-baseline gap-2">
              <span className="text-[0.8rem] font-extrabold text-brand-blue">
                {capitalize(WEEKDAY_LABELS[date.getDay()])}
              </span>
              <span className="text-[0.78rem] font-bold text-[#555]">
                {formatShortDate(date)}
              </span>
            </div>
            <ul className="grid gap-2">
              {list.map((session) => (
                <li
                  key={`${session.oficinaId}-${session.number}`}
                  className="flex gap-2.5"
                >
                  <span
                    className="w-1 shrink-0 rounded"
                    style={{ background: session.color }}
                  />
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-[0.74rem] font-bold text-brand-blue">
                      {session.time} – {session.endTime}
                    </span>
                    <span className="text-[0.85rem] leading-snug text-[#333]">
                      {session.title}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </button>
        );
      })}
    </div>
  );
}

// --- corpo dos modais ---

function DayModalBody({ list }: { list: Sessao[] }) {
  return (
    <div>
      {list.map((session, index) => (
        <div
          key={`${session.oficinaId}-${session.number}`}
          className={`flex gap-2.5 py-2.5 ${
            index === 0 ? "" : "border-t border-[#f0f2f5]"
          }`}
        >
          <span
            className="w-1 shrink-0 rounded"
            style={{ background: session.color }}
          />
          <span className="flex min-w-0 flex-col gap-0.5">
            <span className="text-[0.8rem] font-bold text-brand-blue">
              {session.time} – {session.endTime}
            </span>
            <span className="text-[0.85rem] text-[#333]">{session.title}</span>
            <span className="text-[0.72rem] text-[#888]">
              Duração {session.duration} · Encontro {session.number} de{" "}
              {session.total}
            </span>
            <span className="mt-1 inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-brand-blue">
              <MapPinIcon className="h-3 w-3" /> Sala {SALA_OFICINAS}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

function WorkshopModalBody({ workshop }: { workshop: OficinaAgenda }) {
  const facts = [
    {
      icon: <CalendarIcon className="h-3.5 w-3.5" />,
      text: `${workshop.classWeekday} às ${workshop.time}`,
    },
    {
      icon: <ClockIcon className="h-3.5 w-3.5" />,
      text: `Duração ${workshop.duration} · ${encontrosLabel(workshop.sessions)}`,
    },
    {
      icon: <ArrowsIcon className="h-3.5 w-3.5" />,
      text: `${formatDate(workshop.firstDate)} até ${formatDate(workshop.lastDate)}`,
    },
    {
      icon: <MapPinIcon className="h-3.5 w-3.5" />,
      text: `Sala ${SALA_OFICINAS}`,
    },
    ...(workshop.weekdays.length > 1
      ? [
          {
            icon: <InfoIcon className="h-3.5 w-3.5" />,
            text: `Dias possíveis: ${workshop.possibleDays}`,
          },
        ]
      : []),
  ];

  return (
    <div>
      <ul className="mb-4 grid gap-2">
        {facts.map((fact, index) => (
          <li
            key={index}
            className="flex items-baseline gap-2 text-[0.82rem] text-[#3f4652]"
          >
            <span className="shrink-0 text-brand-blue">{fact.icon}</span>
            {fact.text}
          </li>
        ))}
      </ul>
      <div className="border-t border-[#f0f2f5] pt-3.5">
        {workshop.description.map((paragraph, index) => (
          <p
            key={index}
            className="mb-2.5 text-[0.9rem] leading-relaxed text-[#3f4652] last:mb-0"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
