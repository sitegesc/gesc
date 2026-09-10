import type { Metadata } from "next";

import { EnrollmentLayout } from "@/components/oficinas/EnrollmentLayout";
import { InscricaoProfessoresForm } from "@/components/oficinas/InscricaoProfessoresForm";
import { GraduationIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Inscrição para Aplicar Oficina | GESC",
  description:
    "Formulário para professores e alunos se inscreverem como aplicadores de uma oficina do Projeto IDEIA.",
};

export default function InscricaoProfessoresPage() {
  return (
    <EnrollmentLayout
      tag={
        <>
          <GraduationIcon className="h-3.5 w-3.5" /> Inscrições abertas
        </>
      }
      title="Inscrição para Aplicação de Oficina"
      intro="Preencha o formulário abaixo para se inscrever como aplicador(a) de uma oficina do Projeto IDEIA. Os dados serão usados para organizar a agenda e entrar em contato com você."
    >
      <InscricaoProfessoresForm />
    </EnrollmentLayout>
  );
}
