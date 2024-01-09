import React, {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  ReactElement,
  TextareaHTMLAttributes,
} from "react";
type InputAttributes = InputHTMLAttributes<HTMLInputElement>;
interface Props extends DetailedHTMLProps<InputAttributes, HTMLInputElement> {
  id: string;
  inputRef?: any;
  label: string;
  labelSize?: number;
  row?: number;
  required?: boolean;
  lastrow?: boolean;
  frmField?: object;
  errMessage?: string | undefined;
}

const Input: FC<Props> = (Props): ReactElement => {
  const {
    inputRef,
    id,
    label,
    labelSize = 3,
    className = "",
    row = 1,
    required = false,
    frmField,
    errMessage,
    ...Others
  } = Props;
  const labelClass = `col-sm-${labelSize} col-form-label ${
    required ? "required" : ""
  }`;
  const inputClass = `form-control ${className ? className : ""}${
    errMessage ? "is-invalid" : ""
  }`;
  return (
    <div className="row mb-3">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="col-sm">
        {row > 1 ? (
          <textarea
            ref={inputRef}
            id={id}
            rows={row}
            {...(Others as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className={inputClass}
            {...frmField}
          ></textarea>
        ) : (
          <input
            {...Others}
            ref={inputRef}
            className={inputClass}
            id={id}
            {...frmField}
          />
        )}
        {errMessage ? <div className="invalid-feedback">{errMessage}</div> : ""}
      </div>
    </div>
  );
};
export default Input;
