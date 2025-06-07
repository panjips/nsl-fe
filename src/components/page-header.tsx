import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

interface PageHeaderProps {
    title: string;
    showBackButton?: boolean;
    backTo?: string;
    className?: string;
}

export function PageHeader({ title, showBackButton = false, backTo, className = "" }: PageHeaderProps) {
    const navigate = useNavigate();

    const handleBack = () => {
        if (backTo) {
            navigate({ to: backTo });
        } else {
            navigate({ to: ".." });
        }
    };

    return (
        <div className={`flex items-center gap-3 mb-4 ${className}`}>
            {showBackButton && (
                <Button variant="ghost" size="icon" onClick={handleBack} className="h-9 w-9 border shadow-xs bg-card">
                    <ChevronLeft className="h-5 w-5" />
                    <span className="sr-only">Go back</span>
                </Button>
            )}
            <h1 className="text-2xl font-bold">{title}</h1>
        </div>
    );
}
