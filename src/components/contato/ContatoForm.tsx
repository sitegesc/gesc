"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

import {
  Feedback,
  Field,
  FieldRow,
  SubmitButton,
  SuccessPanel,
  TextArea,
  TextInput,
  inputClass,
} from "@/components/ui/FormControls";
import { AREAS_INTERESSE } from "@/data/gesc";
import { submitContato } from "@/lib/contato";

type Status = "idle" | "sending" | "success";

const EMPTY = {
  nome: "",
  email: "",
  instituicao: "",
  area: "",
  mensagem: "",
};

export function ContatoForm() {
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof typeof EMPTY>(key: K, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setStatus("sending");

    try {
      await submitContato({
        nome: values.nome,
        email: values.email,
        instituicao: values.instituicao,
        area_interesse: values.area,
        mensagem: values.mensagem,
      });
      setStatus("success");
    } catch {
      setStatus("idle");
      setError(
        "Não foi possível enviar a mensagem agora. Tente novamente em instantes.",
      );
    }
  }

  if (status === "success") {
    return (
      <SuccessPanel
        title="Mensagem enviada"
        resetLabel="Enviar outra mensagem"
        onReset={() => {
          setValues(EMPTY);
          setStatus("idle");
        }}
      >
        Recebemos o seu contato e retornaremos pelo e-mail informado.
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-5 text-[0.8rem] text-[#666]">
        Campos marcados com <span className="text-brand-red">*</span> são
        obrigatórios.
      </p>

      <FieldRow>
        <Field label="Nome completo" htmlFor="nome" required>
          <TextInput
            id="nome"
            name="nome"
            placeholder="Seu nome"
            required
            value={values.nome}
            onChange={(e) => set("nome", e.target.value)}
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

      <Field label="Instituição / empresa" htmlFor="instituicao">
        <TextInput
          id="instituicao"
          name="instituicao"
          placeholder="Universidade, empresa ou organização"
          value={values.instituicao}
          onChange={(e) => set("instituicao", e.target.value)}
        />
      </Field>

      <Field label="Área de interesse" htmlFor="area">
        <select
          id="area"
          name="area"
          className={inputClass}
          value={values.area}
          onChange={(e) => set("area", e.target.value)}
        >
          <option value="">Selecione uma opção…</option>
          {AREAS_INTERESSE.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Mensagem" htmlFor="mensagem" required>
        <TextArea
          id="mensagem"
          name="mensagem"
          rows={5}
          placeholder="Descreva seu interesse, projeto ou dúvida com o máximo de detalhes…"
          required
          value={values.mensagem}
          onChange={(e) => set("mensagem", e.target.value)}
        />
      </Field>

      <SubmitButton loading={status === "sending"}>Enviar mensagem</SubmitButton>
      <p className="text-center text-[0.75rem] text-[#999]">
        Os dados informados são usados apenas para responder ao seu contato. Veja
        a{" "}
        <Link href="/privacidade" className="underline hover:text-brand-red">
          Política de Privacidade
        </Link>
        .
      </p>

      {error && <Feedback message={error} type="error" />}
    </form>
  );
}
