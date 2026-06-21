import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

/**
 * Button — the shared CTA / action primitive.
 *
 * Renders an <a> when `href` is set (the common case on this page), otherwise a
 * real <button>. Styling lives in globals.css under `.btn` + variant classes.
 *
 *   <Button href="#research">View Research</Button>          // primary
 *   <Button href="#contact" variant="white">Get in Touch</Button>
 *   <Button variant="pill" onClick={fn}>Filter</Button>      // native button
 */
export type ButtonVariant = "primary" | "white" | "pill";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "btn-primary", // warm gradient CTA
  white: "btn-white",     // light secondary
  pill: "btn-cream",      // muted chip-style
};

type Base = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

type AsLink = Base & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof Base | "href"
  >;

type AsButton = Base & { href?: never } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof Base
  >;

export type ButtonProps = AsLink | AsButton;

export function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonProps) {
  const cls = ["btn", VARIANT_CLASS[variant], className]
    .filter(Boolean)
    .join(" ");

  // Wrap the label so it owns its own stacking layer — the primary variant's
  // shine sweep (a ::before) rides BELOW this span, never washing out the text.
  const label = <span className="btn-label">{children}</span>;

  if ("href" in rest && rest.href) {
    return (
      <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {label}
      </a>
    );
  }

  return (
    <button
      className={cls}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {label}
    </button>
  );
}
