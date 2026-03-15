import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type ResourceEntryDraft = {
  title: string;
  content: string;
};

type ResourceEntryStepProps = {
  step: number;
  totalEntries: number;
  currentEntry: ResourceEntryDraft;
  onBack: () => void;
  onNext: () => void;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  disabled: boolean;
  isSubmitting: boolean;
};

export function ResourceEntryStep({
  step,
  totalEntries,
  currentEntry,
  onBack,
  onNext,
  onTitleChange,
  onContentChange,
  disabled,
  isSubmitting,
}: ResourceEntryStepProps) {
  return (
    <form className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor={`question-${step}`}>Entry title</Label>
        <Input
          id={`question-${step}`}
          value={currentEntry.title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="Enter entry title"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`answer-${step}`}>Entry content</Label>
        <Textarea
          id={`answer-${step}`}
          value={currentEntry.content}
          onChange={(event) => onContentChange(event.target.value)}
          placeholder="Enter entry content"
        />
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <Button type="button" variant="secondary" onClick={onBack} disabled={isSubmitting}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button type="button" onClick={onNext} disabled={disabled}>
          {step === totalEntries ? (isSubmitting ? "Submitting..." : "Submit") : "Next entry"}
          {step === totalEntries ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
        </Button>
      </div>
    </form>
  );
}
