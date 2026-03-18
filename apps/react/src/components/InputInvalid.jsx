import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function InputInvalid({
  id,
  label,
  type = "text",
  placeholder,
  error,
  registration,
  ...props
}) {
  return (
    <Field data-invalid>
      <FieldLabel htmlFor={id}>{error?.message || label}</FieldLabel>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        aria-invalid
        {...registration}
        {...props}
      />
    </Field>
  );
}
