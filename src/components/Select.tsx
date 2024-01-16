import React, { DetailedHTMLProps, SelectHTMLAttributes } from "react";

type SelectAttributes = SelectHTMLAttributes<HTMLSelectElement>;

interface Props extends DetailedHTMLProps<SelectAttributes, HTMLSelectElement> {
  id: string;
  inputRef?: any;
  label: string;
  labelSize?: number;
  inputSize?: number;
  rows?: number;
  required?: boolean;
  lastRow?: boolean;
  frmField?: object;
  errMessage?: string | undefined;
  values: { code: string; name: string }[];
}

const Select: React.FC<Props> = ({
  inputRef,
  id,
  label,
  labelSize = 3,
  inputSize,
  rows = 1,
  className = "",
  required = false,
  lastRow = false,
  frmField,
  errMessage,
  values,
  ...others
}) => {
  const labelClass = `col-sm-${labelSize} col-form-label ${
    required ? "required" : ""
  }`;
  const inputClass = `form-control ${className} ${
    errMessage ? "is-invalid" : ""
  }`;
  return (
    <div className={`row ${lastRow ? "" : "mb-3"}`}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className={`col-sm${inputSize ? "-" + inputSize : ""}`}>
        <select {...others} {...frmField} className={inputClass}>
          <option value="">-----</option>
          {values.map((el) => (
            <option key={el.code} value={el.code}>
              {el.name}
            </option>
          ))}
        </select>
        {errMessage ? <div className="invalid-feedback">{errMessage}</div> : ""}
      </div>
    </div>
  );
};

export default Select;
