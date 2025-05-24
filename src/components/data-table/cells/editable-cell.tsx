import { useState, useRef, useEffect } from "react";
import type { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface EditableCellProps {
  id: string | number;
  value: string | number;
  name: string;
  label?: string;
  className?: string;
  onSave?: (value: string) => Promise<void>;
}

export function EditableCell({
  id,
  value,
  name,
  label = name,
  className = "hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent",
  onSave,
}: EditableCellProps) {
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (onSave) {
      toast.promise(onSave(inputValue.toString()), {
        loading: `Saving ${name}...`,
        success: "Saved successfully",
        error: "Failed to save",
      });
    } else {
      toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
        loading: `Saving ${name}...`,
        success: "Saved successfully",
        error: "Failed to save",
      });
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener("blur", () => {
        handleSubmit({ preventDefault: () => {} } as FormEvent);
      });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor={`${id}-${name}`} className="sr-only">
        {label}
      </Label>
      <Input
        ref={inputRef}
        className={className}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        id={`${id}-${name}`}
      />
    </form>
  );
}
