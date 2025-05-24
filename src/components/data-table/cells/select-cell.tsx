import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  value: string;
  label: string;
}

interface SelectCellProps {
  id: string | number;
  value: string;
  name: string;
  label?: string;
  placeholder?: string;
  options: Option[];
  onChange?: (value: string) => void;
}

export function SelectCell({
  id,
  value,
  name,
  label = name,
  placeholder = "Select an option",
  options,
  onChange,
}: SelectCellProps) {
  return (
    <>
      <Label htmlFor={`${id}-${name}`} className="sr-only">
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
          size="sm"
          id={`${id}-${name}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent align="end">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
