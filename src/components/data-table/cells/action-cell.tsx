import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import React from "react";

export interface ActionItem {
    label: string;
    onClick: () => void;
    variant?: "default" | "destructive";
}

interface ActionCellProps {
    actions: ActionItem[];
}

export function ActionCell({ actions }: ActionCellProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                    size="icon"
                >
                    <MoreVertical />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
                {actions.map((action, index) => (
                    <React.Fragment key={action.label}>
                        <DropdownMenuItem onClick={action.onClick} variant={action.variant}>
                            {action.label}
                        </DropdownMenuItem>
                        {index < actions.length - 1 && action.variant === "destructive" && <DropdownMenuSeparator />}
                    </React.Fragment>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
