import { CheckCircle, Loader } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StatusCellProps {
    value: string;
    variants?: Record<
        string,
        {
            label?: string;
            icon?: React.ReactNode;
            variant?: "default" | "secondary" | "destructive" | "outline";
        }
    >;
}

export function StatusCell({
    value,
    variants = {
        Done: {
            icon: <CheckCircle className="fill-green-500 dark:fill-green-400" />,
            variant: "outline",
        },
        "In Progress": {
            icon: <Loader />,
            variant: "outline",
        },
    },
}: StatusCellProps) {
    const config = variants[value] || {};
    const label = config.label || value;

    return (
        <Badge variant={config.variant || "outline"} className="text-muted-foreground px-1.5">
            {config.icon}
            {label}
        </Badge>
    );
}
