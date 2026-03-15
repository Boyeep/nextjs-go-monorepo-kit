import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type ResourceMeta = {
  madeBy: string;
  title: string;
  description: string;
  numberOfEntries: number;
};

type ResourceMetaStepProps = {
  meta: ResourceMeta;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onContinue: () => void;
  disabled: boolean;
};

export function ResourceMetaStep({ meta, onChange, onContinue, disabled }: ResourceMetaStepProps) {
  return (
    <form className="grid gap-4">
      <div className="grid grid-cols-2 gap-4 max-[720px]:grid-cols-1">
        <div className="grid gap-2">
          <Label htmlFor="madeBy">Made by</Label>
          <Input id="madeBy" name="madeBy" value={meta.madeBy} onChange={onChange} placeholder="Your name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="title">Resource title</Label>
          <Input id="title" name="title" value={meta.title} onChange={onChange} placeholder="Enter title" />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={meta.description}
          onChange={onChange}
          placeholder="What is this resource for?"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="numberOfEntries">Number of entries</Label>
        <Input
          id="numberOfEntries"
          name="numberOfEntries"
          type="number"
          min={1}
          value={meta.numberOfEntries}
          onChange={onChange}
        />
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <p className="m-0 leading-[1.75] text-[var(--muted-text)]">Next we will fill in each entry one by one.</p>
        <Button type="button" onClick={onContinue} disabled={disabled}>
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
