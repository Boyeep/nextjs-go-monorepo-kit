"use client";

import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  FileText,
  FolderOpen,
  LayoutDashboard,
  Layers3,
  PanelRightOpen,
  Search,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
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
import { StatCard } from "@/components/ui/stat-card";
import { Textarea } from "@/components/ui/textarea";

type SandboxSectionProps = {
  title: string;
  children: React.ReactNode;
};

type PreviewPanelProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

function SandboxSection({ title, children }: SandboxSectionProps) {
  return (
    <section className="grid gap-4 border-t border-[rgba(31,41,55,0.08)] py-8 first:border-t-0 first:pt-0">
      <div className="flex items-center justify-between gap-3">
        <h2 className="m-0 font-[family-name:var(--font-display)] text-[1.9rem] tracking-[-0.04em] text-[var(--text)]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function PreviewPanel({ title, children, className }: PreviewPanelProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <CardDescription className="font-semibold tracking-[0.08em] uppercase">
          {title}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">{children}</CardContent>
    </Card>
  );
}

export function SandboxPage() {
  return (
    <main className="relative overflow-x-hidden px-0 pt-6 pb-16">
      <div className="mx-auto grid w-[min(1040px,calc(100%-2rem))] gap-10 max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))]">
        <header className="grid gap-5">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline">Sandbox</Badge>
            <Badge className="bg-[var(--accent-brand)] text-white shadow-sm hover:bg-[var(--accent-brand)]">
              Live Components
            </Badge>
          </div>
          <div className="grid gap-2">
            <h1 className="m-0 font-[family-name:var(--font-display)] text-[clamp(2.8rem,5vw,4.4rem)] leading-[0.95] tracking-[-0.06em] text-[var(--text)]">
              Component Gallery
            </h1>
            <p className="m-0 text-sm leading-7 text-[var(--muted-text)]">
              Buttons, forms, cards, overlays, and a few starter-ready extras.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <Link href="/">Back home</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Dashboard preview</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/templates/demo-resource">Sample template page</Link>
            </Button>
          </div>
        </header>

        <SandboxSection title="Buttons">
          <div className="grid gap-4 lg:grid-cols-2">
            <PreviewPanel title="Variants">
              <div className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="sm">Small</Button>
                <Button size="sm" variant="secondary">
                  Small
                </Button>
                <Button size="sm" variant="ghost">
                  Small
                </Button>
              </div>
            </PreviewPanel>
            <PreviewPanel title="With icons">
              <div className="flex flex-wrap gap-3">
                <Button>
                  New item
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="secondary">
                  Search
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="ghost">
                  Alerts
                  <BellRing className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/sandbox">Primary link</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/dashboard">Secondary link</Link>
                </Button>
              </div>
            </PreviewPanel>
          </div>
        </SandboxSection>

        <SandboxSection title="Badges">
          <div className="grid gap-4 lg:grid-cols-2">
            <PreviewPanel title="Badge variants">
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </PreviewPanel>
            <PreviewPanel title="Common usage">
              <div className="flex flex-wrap gap-3">
                <Badge>New</Badge>
                <Badge variant="secondary">Owner</Badge>
                <Badge variant="outline">Preview</Badge>
                <Badge variant="outline">Sandbox</Badge>
              </div>
            </PreviewPanel>
          </div>
        </SandboxSection>

        <SandboxSection title="Typography">
          <PreviewPanel title="Type scale">
            <div className="grid gap-3">
              <h1 className="m-0 font-[family-name:var(--font-display)] text-[clamp(2.8rem,5vw,4.3rem)] leading-[0.93] tracking-[-0.06em] text-[var(--text)]">
                Display heading
              </h1>
              <h2 className="m-0 font-[family-name:var(--font-display)] text-[clamp(1.8rem,3vw,2.8rem)] tracking-[-0.05em] text-[var(--text)]">
                Section heading
              </h2>
              <p className="m-0 max-w-[52rem] text-base leading-8 text-[var(--muted-text)]">
                Body text stays spacious, neutral, and easy to scan.
              </p>
              <span className="text-xs font-bold tracking-[0.18em] text-[var(--accent-brand)] uppercase">
                Label / metadata
              </span>
            </div>
          </PreviewPanel>
        </SandboxSection>

        <SandboxSection title="Forms">
          <div className="grid gap-4 lg:grid-cols-2">
            <PreviewPanel title="Inputs">
              <div className="grid gap-2">
                <Label htmlFor="sandbox-search">Search</Label>
                <Input id="sandbox-search" placeholder="Search components" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sandbox-email">Email</Label>
                <Input
                  id="sandbox-email"
                  type="email"
                  placeholder="hello@example.com"
                />
              </div>
            </PreviewPanel>
            <PreviewPanel title="Select + textarea">
              <div className="grid gap-2">
                <Label htmlFor="sandbox-surface">Surface</Label>
                <Select defaultValue="dashboard">
                  <SelectTrigger id="sandbox-surface">
                    <SelectValue placeholder="Choose one" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dashboard">Dashboard</SelectItem>
                    <SelectItem value="auth">Auth</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sandbox-notes">Notes</Label>
                <Textarea
                  id="sandbox-notes"
                  className="resize-none"
                  placeholder="Short note"
                  defaultValue="This starter already covers the basics."
                />
              </div>
            </PreviewPanel>
          </div>
        </SandboxSection>

        <SandboxSection title="Cards">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardDescription>Basic card</CardDescription>
                <CardTitle>Starter card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="m-0 text-sm leading-7 text-[var(--muted-text)]">
                  Good for grouped content, dashboards, or settings surfaces.
                </p>
              </CardContent>
              <CardFooter className="gap-3">
                <Button size="sm">Action</Button>
                <Button size="sm" variant="secondary">
                  Secondary
                </Button>
              </CardFooter>
            </Card>
            <Card className="bg-[linear-gradient(180deg,rgba(239,250,250,0.92),rgba(255,255,255,0.86))]">
              <CardHeader>
                <CardDescription>Feature card</CardDescription>
                <CardTitle>Quick overview</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="flex items-center gap-3 text-sm text-[var(--muted-text)]">
                  <Layers3 className="h-4 w-4 text-[var(--accent-brand)]" />
                  Reusable layout
                </div>
                <div className="flex items-center gap-3 text-sm text-[var(--muted-text)]">
                  <LayoutDashboard className="h-4 w-4 text-[var(--accent-brand)]" />
                  Preview-ready pages
                </div>
                <div className="flex items-center gap-3 text-sm text-[var(--muted-text)]">
                  <Sparkles className="h-4 w-4 text-[var(--accent-brand)]" />
                  Shared visual language
                </div>
              </CardContent>
            </Card>
          </div>
        </SandboxSection>

        <SandboxSection title="Useful Extras">
          <div className="grid gap-4 lg:grid-cols-2">
            <PreviewPanel title="StatCard">
              <div className="grid gap-3 sm:grid-cols-2">
                <StatCard
                  label="Visitors"
                  value="12.4k"
                  hint="Last 30 days"
                  icon={<LayoutDashboard className="h-5 w-5" />}
                  tone="accent"
                />
                <StatCard
                  label="Templates"
                  value="08"
                  hint="Published"
                  icon={<FolderOpen className="h-5 w-5" />}
                  tone="brand"
                />
              </div>
            </PreviewPanel>
            <PreviewPanel title="EmptyState">
              <EmptyState
                icon={<FileText className="h-6 w-6" />}
                title="No items yet"
                description="Good for empty lists, first-run states, and waiting-for-content screens."
                action={
                  <Button size="sm">
                    Create first item
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                }
              />
            </PreviewPanel>
          </div>
        </SandboxSection>

        <SandboxSection title="Overlays">
          <div className="grid gap-4 lg:grid-cols-2">
            <PreviewPanel title="Sheet">
              <div className="flex flex-wrap gap-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button>
                      Open sheet
                      <PanelRightOpen className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <div className="grid gap-5 pt-8">
                      <Badge variant="outline" className="w-fit">
                        Overlay
                      </Badge>
                      <h3 className="m-0 font-[family-name:var(--font-display)] text-3xl tracking-[-0.04em] text-[var(--text)]">
                        Sheet Preview
                      </h3>
                      <div className="grid gap-3">
                        <StatCard
                          label="Preview"
                          value="Ready"
                          hint="Useful for compact tools and quick controls."
                          icon={<Sparkles className="h-5 w-5" />}
                        />
                        <Button variant="secondary">Secondary action</Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                <Button asChild variant="secondary">
                  <Link href="/login">Auth demo</Link>
                </Button>
              </div>
            </PreviewPanel>
            <PreviewPanel title="Inline states">
              <div className="grid gap-3">
                <div className="rounded-[22px] border border-[rgba(31,111,120,0.16)] bg-[rgba(31,111,120,0.08)] px-4 py-4 text-sm text-[var(--text)]">
                  Saved successfully
                </div>
                <div className="rounded-[22px] border border-[rgba(239,125,87,0.18)] bg-[rgba(255,244,236,0.92)] px-4 py-4 text-sm text-[var(--text)]">
                  Draft mode enabled
                </div>
              </div>
            </PreviewPanel>
          </div>
        </SandboxSection>
      </div>
    </main>
  );
}
