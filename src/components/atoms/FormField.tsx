import { ReactNode } from "react";
import { FieldError } from "react-hook-form/dist/types";

interface Props {
  name: "name" | "guests" | "date" | "email" | "phone" | "time";
  label: string;
  errors: FieldError | undefined;
  children: ReactNode;
}

export const FormField = (props: Props) => {
  return (
    <div className="flex flex-col py-2">
      <label htmlFor={props.name} className="pb-2">
        {props.label}
      </label>

      {props.children}

      {props.errors?.message && (
        <p className="text-red-800">{props.errors.message}</p>
      )}
    </div>
  );
};
