import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

type InputAttributes = InputHTMLAttributes<HTMLInputElement>;

interface Props extends DetailedHTMLProps<InputAttributes, HTMLInputElement> {
  id: string;
  inputRef?: any;
  label: string;
  labelSize?: number;
  rows?: number;
  required?: boolean;
  lastRow?: boolean;
  frmField?: object;
  errMessage?: string | undefined;
}

class Input extends React.Component<Props> {
  render() {
    const {
      inputRef,
      id,
      label,
      labelSize = 3,
      rows = 1,
      className = "",
      required = false,
      lastRow = false,
      frmField,
      errMessage,
      ...others
    } = this.props;
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
        <div className="col-sm">
          {rows > 1 ? (
            <textarea
              ref={inputRef}
              id={id}
              rows={rows}
              {...(others as TextareaHTMLAttributes<HTMLTextAreaElement>)}
              className={inputClass}
              {...frmField}
            ></textarea>
          ) : (
            <input
              ref={inputRef}
              id={id}
              {...others}
              className={inputClass}
              {...frmField}
            />
          )}
          {errMessage ? (
            <div className="invalid-feedback">{errMessage}</div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Input;
