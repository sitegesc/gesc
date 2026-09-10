import type { Metadata } from "next";

import { CalendarioOficinas } from "@/components/oficinas/CalendarioOficinas";
import { EnrollmentLayout } from "@/components/oficinas/EnrollmentLayout";
import { CalendarIcon } from "@/components/ui/icons";
import { DATA_INICIO_OFICINAS } from "@/data/oficinas";
import { formatDate, parseISO } from "@/lib/calendario";

export const metadata: Metadata = {
  title: "Calendário de Oficinas",
  description:
    "Agenda de todos os encontros das oficinas do Projeto IDEIA, semana a semana.",
};

export default function CalendarioPage() {
  return (
    <EnrollmentLayout
      maxWidth="1080px"
      tag={
        <>
          <CalendarIcon className="h-3.5 w-3.5" /> Agenda das oficinas
        </>
      }
      title="Calendário de Oficinas"
      intro={`Todos os encontros de todas as oficinas do Projeto IDEIA, semana a semana, a partir de ${formatDate(
        parseISO(DATA_INICIO_OFICINAS),
      )}.`}
    >
      <CalendarioOficinas />
    </EnrollmentLayout>
  );
}
