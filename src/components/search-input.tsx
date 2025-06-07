import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    onSearch?: (value: string) => void;
    placeholder?: string;
    className?: string;
    value?: string;
    iconSize?: number;
    debounceTime?: number;
}

export function SearchInput({
    onSearch,
    placeholder = "Search...",
    className,
    value: controlledValue,
    iconSize = 18,
    debounceTime = 300,
    ...props
}: SearchInputProps) {
    const [value, setValue] = React.useState<string>(controlledValue || props.defaultValue?.toString() || "");
    const timeoutRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

    React.useEffect(() => {
        if (controlledValue !== undefined) {
            setValue(controlledValue);
        }
    }, [controlledValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            if (onSearch) {
                onSearch(newValue);
            }
        }, debounceTime);
    };

    React.useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleSearch = (e?: React.FormEvent) => {
        if (e) {
            e.preventDefault();
        }

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (onSearch) {
            onSearch(value);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative">
            <Input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className={cn("pr-10", className)}
                {...props}
            />
            <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => handleSearch()}
            >
                <Search size={iconSize} className="text-gray-400 hover:text-gray-600 transition-colors" />
            </div>
        </form>
    );
}
