import * as React from "react";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";

type ButtonAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;
interface Props
  extends React.DetailedHTMLProps<ButtonAttributes, HTMLButtonElement> {
  color: string;
  icon?: string;
  isLoading?: boolean;
}

const CustomButton: React.FC<Props> = ({
  color,
  className = "",
  type = "button",
  icon,
  isLoading = false,
  children,
  ...others
}) => {
  const buttonClass = `btn btn-${color} ${className}`;
  const iconClass = `${icon} me-1`;
  return (
    <button className={buttonClass} type={type} {...others}>
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
