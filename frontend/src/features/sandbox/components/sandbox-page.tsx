"use client";

import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  Layers3,
  LayoutDashboard,
  Rows3,
  SwatchBook,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { appConfig } from "@/lib/app-config";

const componentGroups = [
  {
    title: "Buttons and links",
    description:
      "Primary, secondary, and ghost actions with the same rounded starter language.",
    Icon: ArrowRight,
  },
  {
    title: "Cards and surfaces",
    description:
      "Soft glass surfaces for marketing, dashboard, and account-oriented layouts.",
    Icon: Layers3,
  },
  {
    title: "Forms and overlays",
    description:
      "Inputs, textarea, select, and slide-over patterns ready for real product flows.",
    Icon: Rows3,
  },
];

const paletteChips = [
  { label: "Brand", className: "bg-[var(--brand)] text-white" },
  { label: "Accent", className: "bg-[var(--accent-brand)] text-white" },
  {
    label: "Surface",
    className:
      "border border-[rgba(31,41,55,0.08)] bg-[var(--surface)] text-[var(--text)]",
  },
  {
    label: "Canvas",
    className:
      "border border-[rgba(31,41,55,0.08)] bg-white text-[var(--text)]",
  },
];

const starterNotes = [
  "Use the page as a quick visual QA pass before you rename or extend the starter.",
  "Keep one place where contributors can verify the shared UI language still feels coherent.",
  "Swap the sample copy and examples for your own product primitives as the template evolves.",
];

export function SandboxPage() {
  return (
    <main className="relative overflow-x-hidden px-0 pb-12">
      <div
        aria-hidden
        className="pointer-events-none absolute top-[8%] left-[6%] h-44 w-44 rounded-full bg-[rgba(255,194,161,0.34)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[18%] right-[8%] h-52 w-52 rounded-full bg-[rgba(31,111,120,0.16)] blur-3xl"
      />

      <section className="relative px-0 pt-6 pb-5">
        <div className="mx-auto grid w-[min(1100px,calc(100%-2rem))] gap-6 max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))] lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
          <div className="grid gap-5 rounded-[36px] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_28%),linear-gradient(135deg,rgba(16,52,67,0.95),rgba(31,111,120,0.82))] p-[clamp(1.75rem,4vw,3rem)] text-white shadow-[var(--shadow)]">
            <Badge className="w-fit rounded-full bg-white/14 px-4 py-2 text-white hover:bg-white/14">
              Starter Sandbox
            </Badge>
            <div className="grid gap-3">
              <h1 className="m-0 max-w-[11ch] font-[family-name:var(--font-display)] text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.92] tracking-[-0.06em]">
                Starter sandbox for UI, forms, and layout blocks.
              </h1>
              <p className="m-0 max-w-[680px] text-[1rem] leading-8 text-white/82">
                Browse the shared building blocks that ship with{" "}
                {appConfig.name}. This page is meant to help you inspect the
                starter visually before you start renaming features or swapping
                product copy.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild variant="secondary">
                <Link href="/">Back home</Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard">Open dashboard preview</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/templates/demo-resource">Open demo template</Link>
              </Button>
            </div>
          </div>

          <Card className="border-white/80 bg-white/82 backdrop-blur-[16px]">
            <CardHeader className="gap-3">
              <Badge variant="outline" className="w-fit">
                What to check here
              </Badge>
              <CardTitle className="text-[2rem] leading-none tracking-[-0.04em]">
                A public surface for the shared UI kit.
              </CardTitle>
              <CardDescription className="text-sm leading-7">
                Keep this route around as a visual audit page while the starter
                grows. It makes regressions easier to spot and gives visitors a
                fast feel for your component language.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {paletteChips.map((chip) => (
                  <span
                    key={chip.label}
                    className={`rounded-full px-4 py-3 text-sm font-semibold shadow-sm ${chip.className}`}
                  >
                    {chip.label}
                  </span>
                ))}
              </div>
              <div className="grid gap-3">
                {starterNotes.map((note, index) => (
                  <div
                    key={note}
                    className="rounded-[24px] border border-[rgba(31,41,55,0.08)] bg-[var(--surface)] p-4"
                  >
                    <span className="text-xs font-bold tracking-[0.16em] text-[var(--accent-brand)] uppercase">
                      0{index + 1}
                    </span>
                    <p className="mt-2 mb-0 text-sm leading-7 text-[var(--muted-text)]">
                      {note}
                    </p>
                  </div>
                ))}
              </div>
              <Button asChild variant="secondary" className="w-full sm:w-fit">
                <Link href="/templates/demo-resource">
                  Preview a public template page
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="relative px-0 pt-3 pb-4">
        <div className="mx-auto grid w-[min(1100px,calc(100%-2rem))] gap-6 max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))] lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
          <Card className="border-white/80 bg-white/84 backdrop-blur-[16px]">
            <CardHeader className="gap-3">
              <Badge variant="outline" className="w-fit">
                Button Styles
              </Badge>
              <CardTitle className="text-[2rem] tracking-[-0.04em]">
                Shared actions in the starter language.
              </CardTitle>
              <CardDescription className="text-sm leading-7">
                These are the same primitives used across the landing page,
                auth, and dashboard views.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5">
              <div className="flex flex-wrap gap-3">
                <Button>Primary action</Button>
                <Button variant="secondary">Secondary action</Button>
                <Button variant="ghost">Ghost action</Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="sm">Small primary</Button>
                <Button size="sm" variant="secondary">
                  Small secondary
                </Button>
                <Button size="sm" variant="ghost">
                  Small ghost
                </Button>
              </div>
              <div className="grid gap-3 rounded-[28px] bg-[var(--surface)] p-5">
                <p className="m-0 text-sm font-semibold text-[var(--text)]">
                  Quick read
                </p>
                <p className="m-0 text-sm leading-7 text-[var(--muted-text)]">
                  Primary buttons stay warm and high-emphasis, secondary actions
                  keep a white glass feel, and ghost actions are there for
                  lighter utility moments.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {componentGroups.map(({ title, description, Icon }) => (
              <Card
                key={title}
                className="border-white/80 bg-white/82 backdrop-blur-[14px]"
              >
                <CardContent className="grid gap-3 p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-[rgba(31,111,120,0.08)] text-[var(--accent-brand)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="grid gap-1.5">
                    <h2 className="m-0 font-[family-name:var(--font-display)] text-[1.4rem] tracking-[-0.03em]">
                      {title}
                    </h2>
                    <p className="m-0 text-sm leading-7 text-[var(--muted-text)]">
                      {description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-0 pt-3 pb-4">
        <div className="mx-auto grid w-[min(1100px,calc(100%-2rem))] gap-6 max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))] lg:grid-cols-[minmax(320px,0.92fr)_minmax(0,1.08fr)]">
          <Card className="border-white/80 bg-white/84 backdrop-blur-[16px]">
            <CardHeader className="gap-3">
              <Badge variant="outline" className="w-fit">
                Form Surfaces
              </Badge>
              <CardTitle className="text-[2rem] tracking-[-0.04em]">
                Inputs that already match the starter.
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="sandbox-name">Workspace name</Label>
                <Input
                  id="sandbox-name"
                  placeholder="Starter sandbox audit"
                  defaultValue="Starter sandbox audit"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sandbox-type">Surface type</Label>
                <Select defaultValue="dashboard">
                  <SelectTrigger id="sandbox-type">
                    <SelectValue placeholder="Select a surface" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dashboard">Dashboard shell</SelectItem>
                    <SelectItem value="auth">Auth flow</SelectItem>
                    <SelectItem value="marketing">Marketing section</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sandbox-notes">Notes</Label>
                <Textarea
                  id="sandbox-notes"
                  defaultValue="Use this playground to verify that inputs, select menus, and text areas still feel coherent after customization."
                />
              </div>
              <Button className="w-full">Save sample state</Button>
            </CardContent>
          </Card>

          <Card className="border-white/80 bg-white/84 backdrop-blur-[16px]">
            <CardHeader className="gap-3">
              <Badge variant="outline" className="w-fit">
                Overlay Demo
              </Badge>
              <CardTitle className="text-[2rem] tracking-[-0.04em]">
                A slide-over for starter-side utilities.
              </CardTitle>
              <CardDescription className="text-sm leading-7">
                This uses the shared sheet primitive that also powers the mobile
                navigation.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5">
              <div className="grid gap-3 rounded-[28px] bg-[var(--surface)] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-[rgba(239,125,87,0.12)] text-[var(--brand-deep)]">
                    <SwatchBook className="h-5 w-5" />
                  </div>
                  <div className="grid gap-1">
                    <p className="m-0 font-semibold text-[var(--text)]">
                      Sandbox notes
                    </p>
                    <p className="m-0 text-sm leading-7 text-[var(--muted-text)]">
                      Use overlays for onboarding hints, quick settings, or
                      internal audits while you adapt the template.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button>
                      Open sheet preview
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <div className="grid gap-5 pt-8">
                      <Badge variant="outline" className="w-fit">
                        Starter overlay
                      </Badge>
                      <div className="grid gap-3">
                        <h2 className="m-0 font-[family-name:var(--font-display)] text-3xl tracking-[-0.04em] text-[var(--text)]">
                          Shared sheet component
                        </h2>
                        <p className="m-0 text-sm leading-7 text-[var(--muted-text)]">
                          This is a good place for lightweight app controls,
                          internal notes, onboarding steps, or status panels.
                        </p>
                      </div>
                      <div className="grid gap-3">
                        <div className="rounded-[22px] border border-[rgba(31,41,55,0.08)] bg-[var(--surface)] p-4">
                          <div className="flex items-center gap-3">
                            <LayoutDashboard className="h-5 w-5 text-[var(--accent-brand)]" />
                            <span className="font-semibold text-[var(--text)]">
                              Dashboard preview
                            </span>
                          </div>
                          <p className="mt-2 mb-0 text-sm leading-7 text-[var(--muted-text)]">
                            Public on `/dashboard`, private when the owner logs
                            in.
                          </p>
                        </div>
                        <div className="rounded-[22px] border border-[rgba(31,41,55,0.08)] bg-[var(--surface)] p-4">
                          <div className="flex items-center gap-3">
                            <Blocks className="h-5 w-5 text-[var(--brand-deep)]" />
                            <span className="font-semibold text-[var(--text)]">
                              Template detail preview
                            </span>
                          </div>
                          <p className="mt-2 mb-0 text-sm leading-7 text-[var(--muted-text)]">
                            Public on `/templates/demo-resource` with the same
                            starter surface used for detail pages.
                          </p>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                <Button asChild variant="secondary">
                  <Link href="/login">Open auth demo</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
