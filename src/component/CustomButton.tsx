import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { Spinner } from "react-bootstrap";

type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;
interface CustomButtonProps
  extends DetailedHTMLProps<ButtonAttributes, HTMLButtonElement> {
  color: string;
  icon?: string;
  isLoading?: boolean;
}
const CustomButton: React.FC<CustomButtonProps> = ({
  color,
  className = "",
  type = "button",
  children,
  icon,
  isLoading = false,
  ...others
}) => {
  const buttonclass = `btn btn-${color} ${className}`;
  const iconClass = `${icon} me-1`;
  return (
    <button className={buttonclass} type={type} {...others}>
      {isLoading ? (
        <Spinner animation="border" size="sm" className="me-1" />
      ) : icon ? (
        <i className={iconClass} />
      ) : (
        ""
      )}
      {children}
    </button>
  );
};
export default CustomButton;
