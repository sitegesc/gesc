"use client";

import { useState, type FormEvent } from "react";

import { CONTATO } from "@/data/gesc";
import { mailtoHref } from "@/lib/mailto";

import {
  ChoiceChip,
  ChoiceGroup,
  Feedback,
  Field,
  FieldRow,
  FormSection,
  PrivacyNote,
  SubmitButton,
  SuccessPanel,
  TextArea,
  TextInput,
  maskPhone,
  panelActionClass,
} from "@/components/ui/FormControls";
import { TimePicker } from "./TimePicker";

// Portado de index.html (commit 705404b) + assets/js/inscricao-oficina.js
// do site antigo: quem quer APLICAR uma oficina (professores/alunos).

const DIAS = [
  { value: "segunda", label: "Segunda" },
  { value: "terca", label: "Terça" },
  { value: "quarta", label: "Quarta" },
  { value: "quinta", label: "Quinta" },
  { value: "sexta", label: "Sexta" },
  { value: "sabado", label: "Sábado" },
];

const EMPTY = {
  isStudent: "",
  ra: "",
  fullName: "",
  email: "",
  whatsapp: "",
  workshopName: "",
  workshopDescription: "",
  preferredTime: "14:00",
  dayDuration: "",
  totalWorkshops: "",
};

export function InscricaoProfessoresForm() {
  const [values, setValues] = useState(EMPTY);
  const [days, setDays] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [href, setHref] = useState<string | null>(null);

  const set = <K extends keyof typeof EMPTY>(key: K, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const toggleDay = (value: string) =>
    setDays((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value],
    );

  const isStudent = values.isStudent === "sim";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (days.length === 0) {
      setError("Selecione ao menos um dia de interesse para aplicar a oficina.");
      return;
    }
    setError(null);

    const link = mailtoHref(
      CONTATO.email,
      `Inscrição para aplicar oficina — ${values.fullName}`,
      [
        ["É aluno(a) da UNICAMP", isStudent ? "Sim" : "Não"],
        ...(isStudent ? [["RA", values.ra] as [string, string]] : []),
        ["Nome completo", values.fullName],
        ["E-mail", values.email],
        ["WhatsApp", values.whatsapp],
        ["Nome da oficina", values.workshopName],
        ["Descrição", values.workshopDescription],
        [
          "Dias de interesse",
          days
            .map((d) => DIAS.find((day) => day.value === d)?.label ?? d)
            .join(", "),
        ],
        ["Horário", values.preferredTime],
        ["Duração de cada dia (h)", values.dayDuration],
        ["Total de oficinas", values.totalWorkshops],
      ],
    );

    setHref(link);
    window.location.href = link;
  }

  function reset() {
    setValues(EMPTY);
    setDays([]);
    setError(null);
    setHref(null);
  }

  if (href) {
    return (
      <SuccessPanel
        title="Falta só enviar o e-mail"
        resetLabel="Preencher de novo"
        onReset={reset}
        action={
          <a href={href} className={panelActionClass}>
            Abrir e-mail
          </a>
        }
      >
        Abrimos seu programa de e-mail com a inscrição já preenchida. Se nada
        abriu, use o botão abaixo — ou escreva para {CONTATO.email}.
      </SuccessPanel>
    );
  }

  return (
    <>
      <p className="mb-5 text-[0.8rem] text-[#666]">
        Campos marcados com <span className="text-brand-red">*</span> são
        obrigatórios.
      </p>

      <form onSubmit={handleSubmit}>
        <FormSection title="Dados Pessoais">
          <Field label="Você é aluno(a)?" required>
            <ChoiceGroup>
              <ChoiceChip
                type="radio"
                name="isStudent"
                value="sim"
                required
                checked={values.isStudent === "sim"}
                onChange={() => set("isStudent", "sim")}
              >
                Sim
              </ChoiceChip>
              <ChoiceChip
                type="radio"
                name="isStudent"
                value="nao"
                checked={values.isStudent === "nao"}
                onChange={() => set("isStudent", "nao")}
              >
                Não
              </ChoiceChip>
            </ChoiceGroup>
          </Field>

          {isStudent && (
            <div className="mb-3.5 rounded-lg bg-[#f5f7fa] p-3">
              <Field label="RA (Registro Acadêmico)" htmlFor="ra" required>
                <TextInput
                  id="ra"
                  name="ra"
                  placeholder="Ex: 123456"
                  required
                  value={values.ra}
                  onChange={(e) => set("ra", e.target.value)}
                />
              </Field>
            </div>
          )}

          <FieldRow>
            <Field label="Nome completo" htmlFor="fullName" required>
              <TextInput
                id="fullName"
                name="fullName"
                placeholder="Seu nome completo"
                required
                value={values.fullName}
                onChange={(e) => set("fullName", e.target.value)}
              />
            </Field>
            <Field label="E-mail" htmlFor="email" required>
              <TextInput
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                required
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </Field>
          </FieldRow>

          <Field label="WhatsApp" htmlFor="whatsapp" required>
            <TextInput
              id="whatsapp"
              name="whatsapp"
              type="tel"
              placeholder="(19) 99999-9999"
              required
              value={values.whatsapp}
              onChange={(e) => set("whatsapp", maskPhone(e.target.value))}
            />
          </Field>
        </FormSection>

        <FormSection title="Dados da Oficina">
          <Field label="Nome da oficina" htmlFor="workshopName" required>
            <TextInput
              id="workshopName"
              name="workshopName"
              placeholder="Ex: Introdução à Teoria dos Jogos"
              required
              value={values.workshopName}
              onChange={(e) => set("workshopName", e.target.value)}
            />
          </Field>

          <Field
            label="Descrição rápida da oficina"
            htmlFor="workshopDescription"
            required
          >
            <TextArea
              id="workshopDescription"
              name="workshopDescription"
              rows={3}
              placeholder="Resuma em poucas linhas o conteúdo e o objetivo da oficina"
              required
              value={values.workshopDescription}
              onChange={(e) => set("workshopDescription", e.target.value)}
            />
          </Field>

          <Field label="Dias que tem interesse em aplicar" required>
            <ChoiceGroup invalid={Boolean(error) && days.length === 0}>
              {DIAS.map((day) => (
                <ChoiceChip
                  key={day.value}
                  type="checkbox"
                  name="days"
                  value={day.value}
                  checked={days.includes(day.value)}
                  onChange={() => toggleDay(day.value)}
                >
                  {day.label}
                </ChoiceChip>
              ))}
            </ChoiceGroup>
          </Field>

          <FieldRow>
            <Field label="Horário que quer aplicar" htmlFor="preferredTime" required>
              <TimePicker
                id="preferredTime"
                value={values.preferredTime}
                onChange={(value) => set("preferredTime", value)}
              />
            </Field>
            <Field
              label="Duração de cada dia (horas)"
              htmlFor="dayDuration"
              required
            >
              <TextInput
                id="dayDuration"
                name="dayDuration"
                type="number"
                min="0.5"
                step="0.5"
                placeholder="Ex: 2"
                required
                value={values.dayDuration}
                onChange={(e) => set("dayDuration", e.target.value)}
              />
            </Field>
          </FieldRow>

          <Field
            label="Quantas oficinas terão ao todo"
            htmlFor="totalWorkshops"
            required
            hint="Número total de encontros previstos para essa oficina."
          >
            <TextInput
              id="totalWorkshops"
              name="totalWorkshops"
              type="number"
              min="1"
              step="1"
              placeholder="Ex: 4"
              required
              value={values.totalWorkshops}
              onChange={(e) => set("totalWorkshops", e.target.value)}
            />
          </Field>
        </FormSection>

        <SubmitButton>Enviar inscrição</SubmitButton>
        <PrivacyNote />

        {error && <Feedback message={error} type="error" />}
      </form>
    </>
  );
}
