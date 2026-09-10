"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

import {
  Field,
  FieldRow,
  SubmitButton,
  SuccessPanel,
  TextArea,
  TextInput,
  inputClass,
  panelActionClass,
} from "@/components/ui/FormControls";
import { AREAS_INTERESSE, CONTATO } from "@/data/gesc";
import { mailtoHref } from "@/lib/mailto";

const EMPTY = {
  nome: "",
  email: "",
  instituicao: "",
  area: "",
  mensagem: "",
};

export function ContatoForm() {
  const [values, setValues] = useState(EMPTY);
  const [href, setHref] = useState<string | null>(null);

  const set = <K extends keyof typeof EMPTY>(key: K, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const link = mailtoHref(CONTATO.email, `Contato pelo site — ${values.nome}`, [
      ["Nome", values.nome],
      ["E-mail", values.email],
      ["Instituição/empresa", values.instituicao || "—"],
      ["Área de interesse", values.area || "—"],
      "",
      "Mensagem:",
      values.mensagem,
    ]);

    setHref(link);
    window.location.href = link;
  }

  if (href) {
    return (
      <SuccessPanel
        title="Falta só enviar o e-mail"
        resetLabel="Preencher de novo"
        onReset={() => {
          setValues(EMPTY);
          setHref(null);
        }}
        action={
          <a href={href} className={panelActionClass}>
            Abrir e-mail
          </a>
        }
      >
        Abrimos seu programa de e-mail com a mensagem já preenchida. Se nada
        abriu, use o botão abaixo — ou escreva direto para {CONTATO.email}.
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

      <SubmitButton>Enviar mensagem</SubmitButton>
      <p className="text-center text-[0.75rem] text-[#999]">
        O envio abre seu programa de e-mail com os dados preenchidos. Eles são
        usados apenas para responder ao seu contato — veja a{" "}
        <Link href="/privacidade" className="underline hover:text-brand-red">
          Política de Privacidade
        </Link>
        .
      </p>
    </form>
  );
}
