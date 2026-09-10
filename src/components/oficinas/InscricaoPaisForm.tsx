"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";

import {
  OFICINAS,
  diasPossiveis,
  duracaoLabel,
  encontrosLabel,
  type Oficina,
} from "@/data/oficinas";
import { weekdaysLabel } from "@/lib/calendario";
import { submitInscricao } from "@/lib/inscricoes";
import { Modal } from "@/components/ui/Modal";

import {
  Feedback,
  Field,
  FieldRow,
  FormSection,
  PrivacyNote,
  SubmitButton,
  SuccessPanel,
  TextInput,
  maskPhone,
} from "@/components/ui/FormControls";
import { CalendarIcon, ClockIcon, RepeatIcon } from "@/components/ui/icons";

// Portado de inscricao-nas-oficinas.html + assets/js/inscricao-nas-oficinas.js
// do site antigo: pais/responsáveis inscrevendo a criança nas oficinas.
//
// Regra das turmas por idade (oficinas com `ageBased`):
//   até 9 anos  → Turma 1
//   10 anos ou + → Turma 2
// Enquanto a idade não é informada, essas oficinas ficam desabilitadas.

type Status = "idle" | "sending" | "success";

const EMPTY = { fullName: "", age: "", guardianName: "", phone: "" };

function parseAge(value: string): number {
  const age = Number(value);
  return Number.isInteger(age) && age >= 1 ? age : 0;
}

export function InscricaoPaisForm() {
  const [values, setValues] = useState(EMPTY);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [availability, setAvailability] = useState<Record<string, string[]>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [detailsId, setDetailsId] = useState<string | null>(null);

  const ageInputRef = useRef<HTMLInputElement>(null);

  const age = parseAge(values.age);
  const ageValid = age > 0;
  const turma = age <= 9 ? 1 : 2;

  const set = <K extends keyof typeof EMPTY>(key: K, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  function handleAgeChange(raw: string) {
    set("age", raw);

    // Idade inválida desmarca as oficinas que dependem dela.
    if (parseAge(raw) === 0) {
      setSelected((prev) => {
        const next = { ...prev };
        OFICINAS.forEach((o) => {
          if (o.ageBased) delete next[o.id];
        });
        return next;
      });
    }
  }

  function toggleWorkshop(id: string) {
    setSelected((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      return next;
    });
  }

  function toggleDay(id: string, day: string) {
    setAvailability((prev) => {
      const current = prev[id] ?? [];
      return {
        ...prev,
        [id]: current.includes(day)
          ? current.filter((d) => d !== day)
          : [...current, day],
      };
    });
  }

  const selectedIds = useMemo(
    () => OFICINAS.filter((o) => selected[o.id]).map((o) => o.id),
    [selected],
  );

  const missingDayFor = (id: string) =>
    selected[id] && (availability[id]?.length ?? 0) === 0;

  const formValid =
    ageValid &&
    selectedIds.length > 0 &&
    selectedIds.every((id) => (availability[id]?.length ?? 0) > 0);

  function displayTitle(o: Oficina) {
    return o.ageBased && ageValid ? `${o.title} — Turma ${turma}` : o.title;
  }

  function descricao(o: Oficina): string[] {
    const byAge = o.ageBased?.descriptionByAge;
    if (!byAge) return o.description;
    if (!ageValid) {
      return [
        "Preencha a idade do aluno para o site indicar automaticamente a turma e mostrar o conteúdo correspondente.",
      ];
    }
    return age <= 9 ? byAge.upTo9 : byAge.from10;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    if (!ageValid) {
      setError("Informe uma idade válida para continuar.");
      ageInputRef.current?.focus();
      return;
    }
    if (selectedIds.length === 0) {
      setError("Selecione pelo menos uma oficina para continuar.");
      return;
    }
    if (!formValid) {
      setError(
        "Para cada oficina selecionada, marque pelo menos um dia em que a criança pode participar.",
      );
      return;
    }

    setError(null);
    setStatus("sending");

    try {
      const oficinasSelecionadas = selectedIds.map((id) => {
        const o = OFICINAS.find((item) => item.id === id)!;
        const valor = o.ageBased
          ? `${o.ageBased.baseValue} - Turma ${turma}`
          : o.title;
        return `${valor} [dias disponíveis: ${(availability[id] ?? []).join(", ")}]`;
      });

      await submitInscricao("pais", {
        nome_completo: values.fullName,
        idade: values.age,
        nome_responsavel: values.guardianName,
        telefone_contato: values.phone,
        oficinas_selecionadas: oficinasSelecionadas.join(" | "),
      });

      setStatus("success");
    } catch {
      setStatus("idle");
      setError(
        "Não foi possível enviar a inscrição. Verifique sua conexão e tente novamente.",
      );
    }
  }

  function reset() {
    setValues(EMPTY);
    setSelected({});
    setAvailability({});
    setStatus("idle");
    setError(null);
    setSubmitted(false);
  }

  if (status === "success") {
    return (
      <SuccessPanel title="Inscrição enviada com sucesso!" onReset={reset}>
        Recebemos os seus dados. Em breve entraremos em contato pelo telefone
        informado com mais detalhes sobre a(s) oficina(s) selecionada(s).
      </SuccessPanel>
    );
  }

  const detailsOficina = detailsId
    ? OFICINAS.find((o) => o.id === detailsId) ?? null
    : null;

  return (
    <>
      <p className="mb-5 text-[0.8rem] text-[#666]">
        Campos marcados com <span className="text-brand-red">*</span> são
        obrigatórios.
      </p>

      <form onSubmit={handleSubmit}>
        <FormSection title="Dados Pessoais">
          <FieldRow>
            <Field label="Nome completo (aluno)" htmlFor="fullName" required>
              <TextInput
                id="fullName"
                name="fullName"
                placeholder="Seu nome completo"
                required
                value={values.fullName}
                onChange={(e) => set("fullName", e.target.value)}
              />
            </Field>
            <Field label="Idade (aluno)" htmlFor="age" required>
              <TextInput
                ref={ageInputRef}
                id="age"
                name="age"
                type="number"
                min="1"
                step="1"
                placeholder="Ex: 12"
                required
                value={values.age}
                onChange={(e) => handleAgeChange(e.target.value)}
              />
            </Field>
          </FieldRow>

          <FieldRow>
            <Field label="Nome do responsável" htmlFor="guardianName" required>
              <TextInput
                id="guardianName"
                name="guardianName"
                placeholder="Nome completo do responsável"
                required
                value={values.guardianName}
                onChange={(e) => set("guardianName", e.target.value)}
              />
            </Field>
            <Field label="Telefone para contato" htmlFor="phone" required>
              <TextInput
                id="phone"
                name="phone"
                type="tel"
                placeholder="(19) 99999-9999"
                required
                value={values.phone}
                onChange={(e) => set("phone", maskPhone(e.target.value))}
              />
            </Field>
          </FieldRow>
        </FormSection>

        <FormSection title="Oficinas">
          <p className="mb-2 text-[0.8rem] font-bold text-[#333]">
            Selecione uma ou mais oficinas{" "}
            <span className="text-brand-red">*</span>
          </p>

          {!ageValid && (
            <p className="mb-3 text-[0.75rem] text-[#888]">
              Informe a idade do aluno para liberar as oficinas com turmas por
              faixa etária (IA, Criando Histórias e Cálculo).
            </p>
          )}

          <div
            className={`grid gap-2.5 sm:grid-cols-2 ${
              submitted && selectedIds.length === 0
                ? "rounded-lg border border-brand-red p-2"
                : ""
            }`}
          >
            {OFICINAS.map((o) => {
              const disabled = Boolean(o.ageBased) && !ageValid;
              const checked = Boolean(selected[o.id]);

              return (
                <div
                  key={o.id}
                  className={`grid grid-cols-[minmax(0,1fr)_auto] overflow-hidden rounded-[10px] border transition-colors ${
                    checked
                      ? "border-brand-blue bg-[#eef2f9]"
                      : "border-[#ddd] bg-[#fafafa]"
                  } ${disabled ? "opacity-55" : ""}`}
                >
                  <label
                    className={`flex min-w-0 gap-2 p-3 ${
                      disabled ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mt-1 shrink-0 accent-brand-blue"
                      checked={checked}
                      disabled={disabled}
                      onChange={() => toggleWorkshop(o.id)}
                    />
                    <span className="flex min-w-0 flex-col gap-1">
                      <span
                        className={`text-[0.9rem] font-semibold leading-snug ${
                          checked ? "text-brand-blue" : "text-[#333]"
                        }`}
                      >
                        {displayTitle(o)}
                      </span>
                      <span className="flex flex-col gap-[3px] text-[0.76rem] font-semibold leading-snug text-[#5f6775]">
                        <span className="flex items-baseline gap-1.5">
                          <CalendarIcon className="h-3 w-3 shrink-0 text-brand-blue" />
                          Dias possíveis: {weekdaysLabel(o.weekdays)}
                        </span>
                        <span className="flex items-baseline gap-1.5">
                          <ClockIcon className="h-3 w-3 shrink-0 text-brand-blue" />
                          Horário proposto: {o.time} • Duração:{" "}
                          {duracaoLabel(o.durationMin)}
                        </span>
                        <span className="flex items-baseline gap-1.5">
                          <RepeatIcon className="h-3 w-3 shrink-0 text-brand-blue" />
                          Quantidade proposta: {encontrosLabel(o.sessions)}
                        </span>
                      </span>
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setDetailsId(o.id)}
                    aria-label={`Ver detalhes de ${o.title}`}
                    className="self-stretch border-l border-[#e2e5ea] px-2.5 text-[0.76rem] font-bold text-brand-blue transition-colors hover:bg-[#e5eaf4]"
                  >
                    Detalhes
                  </button>

                  {checked && (
                    <fieldset className="col-span-2 border-0 border-t border-[#dce1e9] bg-[#f7f9fc] p-3">
                      <legend className="text-[0.78rem] font-bold text-[#333]">
                        Em quais desses dias a criança pode participar?
                      </legend>
                      <div className="mt-2.5 flex flex-wrap gap-[7px]">
                        {diasPossiveis(o).map((day) => {
                          const on = (availability[o.id] ?? []).includes(day);
                          return (
                            <label
                              key={day}
                              className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-[7px] text-[0.78rem] font-semibold transition-colors ${
                                on
                                  ? "border-brand-blue bg-[#e7edf8] text-brand-blue"
                                  : "border-[#cfd5df] bg-white text-[#394150]"
                              }`}
                            >
                              <input
                                type="checkbox"
                                className="accent-brand-blue"
                                checked={on}
                                onChange={() => toggleDay(o.id, day)}
                              />
                              {day}
                            </label>
                          );
                        })}
                      </div>
                      {submitted && missingDayFor(o.id) && (
                        <p className="mt-2 text-[0.72rem] font-semibold text-brand-red">
                          Marque pelo menos um dia.
                        </p>
                      )}
                    </fieldset>
                  )}
                </div>
              );
            })}
          </div>

          <p className="mt-2.5 text-[0.72rem] text-[#888]">
            Os dias indicam quando o aplicador pode oferecer cada oficina.
            Selecione a oficina e marque todos os dias em que a criança pode
            participar. A organização confirmará o dia da turma posteriormente.
          </p>
        </FormSection>

        <SubmitButton loading={status === "sending"} disabled={!formValid}>
          Enviar inscrição
        </SubmitButton>
        <PrivacyNote />

        {error && <Feedback message={error} type="error" />}
      </form>

      <Modal
        open={detailsOficina !== null}
        onClose={() => setDetailsId(null)}
        title={detailsOficina ? displayTitle(detailsOficina) : ""}
      >
        {detailsOficina && (
          <>
            <p className="mb-4 inline-flex flex-wrap items-center gap-2 rounded-full bg-[#eef2f9] px-3 py-1.5 text-[0.82rem] font-bold text-brand-blue">
              Dias possíveis: {weekdaysLabel(detailsOficina.weekdays)} • horário
              proposto: {detailsOficina.time} • duração:{" "}
              {duracaoLabel(detailsOficina.durationMin)} • quantidade proposta:{" "}
              {encontrosLabel(detailsOficina.sessions)}
            </p>
            {descricao(detailsOficina).map((paragraph, index) => (
              <p key={index} className="mb-3 last:mb-0">
                {paragraph}
              </p>
            ))}
          </>
        )}
      </Modal>
    </>
  );
}
