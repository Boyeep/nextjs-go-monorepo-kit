"use client";

import {
  type CSSProperties,
  type HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

type ScrollRevealTag =
  | "article"
  | "div"
  | "header"
  | "main"
  | "section"
  | "span";

type ScrollRevealProps = HTMLAttributes<HTMLElement> & {
  as?: ScrollRevealTag;
  blurPx?: number;
  delayMs?: number;
  distancePx?: number;
  durationMs?: number;
  once?: boolean;
  rootMargin?: string;
  scaleFrom?: number;
  threshold?: number;
};

export function ScrollReveal({
  as = "div",
  blurPx = 4,
  children,
  className,
  delayMs = 0,
  distancePx = 18,
  durationMs = 540,
  once = true,
  rootMargin = "0px 0px -4% 0px",
  scaleFrom = 0.992,
  threshold = 0.06,
  style,
  ...props
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const setElement = useCallback((node: HTMLElement | null) => {
    ref.current = node;
  }, []);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      const frame = window.requestAnimationFrame(() => setIsVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          setIsVisible(true);

          if (once) {
            observer.unobserve(entry.target);
          }

          return;
        }

        if (!once) {
          setIsVisible(false);
        }
      },
      {
        rootMargin,
        threshold,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  const revealStyle = {
    "--scroll-reveal-blur": `${blurPx}px`,
    "--scroll-reveal-delay": `${delayMs}ms`,
    "--scroll-reveal-distance": `${distancePx}px`,
    "--scroll-reveal-duration": `${durationMs}ms`,
    "--scroll-reveal-scale-from": `${scaleFrom}`,
    ...style,
  } as CSSProperties;

  const sharedProps = {
    ...props,
    className: cn(
      className,
      "scroll-reveal",
      !isVisible && "is-hidden",
      isVisible && "is-visible",
    ),
    style: revealStyle,
  };

  switch (as) {
    case "article":
      return (
        <article ref={setElement} {...sharedProps}>
          {children}
        </article>
      );
    case "header":
      return (
        <header ref={setElement} {...sharedProps}>
          {children}
        </header>
      );
    case "main":
      return (
        <main ref={setElement} {...sharedProps}>
          {children}
        </main>
      );
    case "section":
      return (
        <section ref={setElement} {...sharedProps}>
          {children}
        </section>
      );
    case "span":
      return (
        <span ref={setElement} {...sharedProps}>
          {children}
        </span>
      );
    default:
      return (
        <div ref={setElement} {...sharedProps}>
          {children}
        </div>
      );
  }
}
