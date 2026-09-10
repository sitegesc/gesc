import type {
  ComponentPropsWithRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import Link from "next/link";

import { CheckCircleIcon, SendIcon, SpinnerIcon } from "./icons";

// Primitivos de formulário compartilhados pelas telas de inscrição.
// Portado de assets/css/inscricao-oficina.css (.input-group, .choice-group,
// .btn-submit, .form-feedback…).

export const inputClass =
  "w-full rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-2.5 text-base text-[#333] outline-none transition-colors focus:border-brand-blue focus:bg-white";

export function FormSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-6 last:mb-0">
      <h2 className="mb-4 border-b-2 border-[#f0f2f5] pb-2 text-[1.05rem] font-bold text-brand-blue">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function Field({
  label,
  htmlFor,
  required,
  hint,
  children,
}: {
  label: ReactNode;
  htmlFor?: string;
  required?: boolean;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mb-3.5 flex flex-col">
      <label
        htmlFor={htmlFor}
        className="mb-1.5 text-[0.8rem] font-bold text-[#333]"
      >
        {label} {required && <span className="text-brand-red">*</span>}
      </label>
      {children}
      {hint && (
        <span className="mt-1.5 text-[0.72rem] font-normal text-[#888]">
          {hint}
        </span>
      )}
    </div>
  );
}

export function FieldRow({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-x-3.5 sm:grid-cols-2">{children}</div>
  );
}

export function TextInput(props: ComponentPropsWithRef<"input">) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function TextArea(props: ComponentPropsWithRef<"textarea">) {
  return (
    <textarea {...props} className={`${inputClass} ${props.className ?? ""}`} />
  );
}

// Pílula clicável de radio/checkbox (o input fica escondido; o estilo
// reage via has-[:checked]).
export function ChoiceChip({
  children,
  disabled,
  ...inputProps
}: InputHTMLAttributes<HTMLInputElement> & { children: ReactNode }) {
  return (
    <label
      className={`flex items-center gap-1.5 rounded-lg border border-[#ddd] bg-[#fafafa] px-3 py-[7px] text-[0.82rem] text-[#333] transition-colors has-[:checked]:border-brand-blue has-[:checked]:bg-[#eef2f9] has-[:checked]:text-brand-blue ${
        disabled ? "cursor-not-allowed opacity-55" : "cursor-pointer"
      }`}
    >
      <input
        {...inputProps}
        disabled={disabled}
        className="accent-brand-blue"
      />
      {children}
    </label>
  );
}

export function ChoiceGroup({
  children,
  invalid,
}: {
  children: ReactNode;
  invalid?: boolean;
}) {
  return (
    <div
      className={`flex flex-wrap gap-2 ${
        invalid ? "rounded-lg border border-brand-red p-2" : ""
      }`}
    >
      {children}
    </div>
  );
}

export function SubmitButton({
  loading,
  disabled,
  children,
}: {
  loading?: boolean;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className="mb-2.5 flex w-full items-center justify-center gap-2.5 rounded-lg bg-brand-blue px-4 py-3 text-[0.95rem] font-bold text-white transition-colors hover:bg-[#001a4d] disabled:cursor-not-allowed disabled:bg-[#99a5bd]"
    >
      {loading ? (
        <>
          <SpinnerIcon /> Enviando…
        </>
      ) : (
        <>
          <SendIcon /> {children}
        </>
      )}
    </button>
  );
}

export function PrivacyNote() {
  return (
    <p className="text-center text-[0.75rem] text-[#999]">
      Ao enviar, você concorda com o tratamento dos seus dados conforme a{" "}
      <Link href="/privacidade" className="underline hover:text-brand-red">
        Política de Privacidade
      </Link>
      .
    </p>
  );
}

export function Feedback({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) {
  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className={`mt-5 rounded-lg p-4 text-center text-[0.9rem] ${
        type === "success"
          ? "border border-[#c3e6cb] bg-[#e6f4ea] text-[#1e7e34]"
          : "border border-[#f3c6c6] bg-[#fbe9e9] text-brand-red"
      }`}
    >
      {message}
    </div>
  );
}

export function SuccessPanel({
  title,
  children,
  onReset,
  resetLabel = "Fazer nova inscrição",
}: {
  title: string;
  children: ReactNode;
  onReset: () => void;
  resetLabel?: string;
}) {
  return (
    <div className="px-2 py-8 text-center sm:px-5 sm:py-10">
      <CheckCircleIcon className="mx-auto mb-4 h-12 w-12 text-[#2f9e44]" />
      <h2 className="mb-2 text-xl font-bold text-brand-blue">{title}</h2>
      <p className="mx-auto mb-6 max-w-[520px] text-[0.95rem] leading-relaxed text-[#444]">
        {children}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="rounded-lg bg-brand-blue px-5 py-3 text-[0.95rem] font-bold text-white transition-colors hover:bg-[#001a4d]"
      >
        {resetLabel}
      </button>
    </div>
  );
}

/** Máscara de telefone brasileiro: (19) 99999-9999. */
export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length > 10) {
    return digits.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  }
  if (digits.length > 5) {
    return digits.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
  }
  if (digits.length > 2) {
    return digits.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
  }
  return digits;
}
