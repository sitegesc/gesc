import type { Metadata } from "next";

import { EnrollmentLayout } from "@/components/oficinas/EnrollmentLayout";
import { InscricaoPaisForm } from "@/components/oficinas/InscricaoPaisForm";
import { GraduationIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Inscrição em Oficinas",
  description:
    "Formulário para pais e responsáveis inscreverem a criança nas oficinas do Projeto IDEIA.",
};

export default function InscricaoPaisPage() {
  return (
    <EnrollmentLayout
      tag={
        <>
          <GraduationIcon className="h-3.5 w-3.5" /> Inscrições abertas
        </>
      }
      title="Inscrição em Oficinas"
      intro="Preencha o formulário abaixo para inscrever a criança em uma ou mais oficinas do Projeto IDEIA. Os dados serão usados apenas para organizar as turmas e entrar em contato com você."
    >
      <InscricaoPaisForm />
    </EnrollmentLayout>
  );
}
