import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function InputField({
  id,
  label,
  type = "text",
  placeholder,
  description,
  registration,
  ...props
}) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...registration}
        {...props}
      />
      {description ? <FieldDescription>{description}</FieldDescription> : null}
    </Field>
  );
}
