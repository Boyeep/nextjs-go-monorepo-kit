import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { featuredTemplates } from "@/lib/site-data";
import { TemplateIdeas } from "./template-ideas";

describe("TemplateIdeas", () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, "scrollBy", {
      configurable: true,
      value: vi.fn(),
      writable: true,
    });
  });

  it("renders the featured template ideas from site data", () => {
    render(<TemplateIdeas />);

    for (const template of featuredTemplates) {
      expect(screen.getAllByText(template.title).length).toBeGreaterThan(0);
    }
  });

  it("scrolls the carousel when the navigation buttons are clicked", () => {
    render(<TemplateIdeas />);

    const buttons = screen.getAllByRole("button");
    const scrollBy = vi.mocked(HTMLElement.prototype.scrollBy);

    fireEvent.click(buttons[0]);
    expect(scrollBy).toHaveBeenLastCalledWith({
      behavior: "smooth",
      left: -320,
    });

    fireEvent.click(buttons[1]);
    expect(scrollBy).toHaveBeenLastCalledWith({
      behavior: "smooth",
      left: 320,
    });
  });
});
