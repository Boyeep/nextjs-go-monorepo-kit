import { expect, test } from "@playwright/test";

const demoEmail =
  process.env.PLAYWRIGHT_DEMO_EMAIL ?? "demo@nextjs-go-kit.local";
const demoPassword = process.env.PLAYWRIGHT_DEMO_PASSWORD ?? "demo12345";

test.describe("starter smoke flows", () => {
  test("renders the public starter pages", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        name: /Build your next product from a calmer, more adaptable full-stack base\./,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Open dashboard preview" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Open starter sandbox" }),
    ).toBeVisible();

    await page.goto("/sandbox");

    await expect(
      page.getByRole("heading", {
        name: "Component Gallery",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Buttons",
      }),
    ).toBeVisible();

    await page.goto("/templates/demo-resource");

    await expect(
      page.getByRole("heading", {
        name: "Demo Template",
      }),
    ).toBeVisible();
    await expect(page.getByText("Section 1")).toBeVisible();

    await page.goto("/dashboard");

    await expect(
      page.getByRole("heading", {
        name: "Preview the private workspace before wiring login.",
      }),
    ).toBeVisible();
    await expect(page.getByText("Public demo")).toBeVisible();

    await page.goto("/collections");

    await expect(
      page.getByRole("heading", {
        name: "The page you asked for is not part of this starter.",
      }),
    ).toBeVisible();

    await page.goto("/create-resource");

    await expect(
      page.getByRole("heading", {
        name: "The page you asked for is not part of this starter.",
      }),
    ).toBeVisible();
  });

  test("logs in with the demo account and opens the owner dashboard", async ({
    page,
  }) => {
    await page.goto("/login");

    await page.getByLabel("Email").fill(demoEmail);
    await page.getByLabel("Password").fill(demoPassword);
    await page.getByRole("button", { name: "Login" }).click();

    const primaryNav = page.getByLabel("Primary");
    const dashboardNavLink = primaryNav.getByRole("link", {
      name: "Dashboard",
    });

    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
    await expect(dashboardNavLink).toBeVisible();

    await dashboardNavLink.click();

    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByText("Owner Dashboard")).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Review owner access, account context, and analytics from one private workspace.",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Session Overview" }),
    ).toBeVisible();
  });
});
