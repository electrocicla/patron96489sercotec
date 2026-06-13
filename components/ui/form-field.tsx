import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

interface FieldShellProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}

function FieldShell({ id, label, hint, error, children }: FieldShellProps) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-civic-ink" htmlFor={id}>
        {label}
      </label>
      {children}
      {hint ? (
        <p className="text-sm leading-5 text-civic-muted" id={hintId}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="text-sm font-medium text-civic-red" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const controlClasses =
  "w-full min-w-0 max-w-full rounded-md border border-civic-line bg-white px-3 py-2.5 text-sm text-civic-ink outline-none transition placeholder:text-civic-muted focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
  id: string;
};

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  hint?: string;
  error?: string;
  id: string;
  options: readonly (string | { label: string; value: string })[];
  placeholder?: string;
};

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  hint?: string;
  error?: string;
  id: string;
};

export function InputField({ label, hint, error, className = "", id, ...props }: InputFieldProps) {
  return (
    <FieldShell error={error} hint={hint} id={id} label={label}>
      <input
        aria-describedby={`${hint ? `${id}-hint` : ""} ${error ? `${id}-error` : ""}`.trim() || undefined}
        className={`${controlClasses} ${className}`}
        id={id}
        {...props}
      />
    </FieldShell>
  );
}

export function SelectField({
  label,
  hint,
  error,
  className = "",
  id,
  options,
  placeholder = "Selecciona una opcion",
  ...props
}: SelectFieldProps) {
  return (
    <FieldShell error={error} hint={hint} id={id} label={label}>
      <select
        aria-describedby={`${hint ? `${id}-hint` : ""} ${error ? `${id}-error` : ""}`.trim() || undefined}
        className={`${controlClasses} ${className}`}
        id={id}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => {
          const value = typeof option === "string" ? option : option.value;
          const optionLabel = typeof option === "string" ? option : option.label;

          return (
            <option key={value} value={value}>
              {optionLabel}
            </option>
          );
        })}
      </select>
    </FieldShell>
  );
}

export function TextareaField({ label, hint, error, className = "", id, ...props }: TextareaFieldProps) {
  return (
    <FieldShell error={error} hint={hint} id={id} label={label}>
      <textarea
        aria-describedby={`${hint ? `${id}-hint` : ""} ${error ? `${id}-error` : ""}`.trim() || undefined}
        className={`${controlClasses} min-h-32 resize-y ${className}`}
        id={id}
        {...props}
      />
    </FieldShell>
  );
}
