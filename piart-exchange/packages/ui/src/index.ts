import { createElement } from "react";
import type { ButtonHTMLAttributes, PropsWithChildren, ReactElement } from "react";

export function Button({
  children,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>): ReactElement {
  return createElement(
    "button",
    {
      ...props,
      style: {
        borderRadius: 8,
        border: "1px solid #ccc",
        padding: "0.5rem 0.75rem",
        cursor: "pointer"
      }
    },
    children
  );
}
