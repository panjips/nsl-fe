import { FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { DateRange } from "../../domain";

interface ReportHeaderProps {
    title: string;
    dateRange: DateRange;
    onExportExcel: () => void;
    onExportPDF: () => void;
}

export function ReportHeader({ title, dateRange, onExportExcel, onExportPDF }: ReportHeaderProps) {
    return (
        <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div>
                <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
                <p className="text-gray-500">{dateRange.label}</p>
            </div>

            <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={onExportExcel}>
                    <FileText className="mr-2 h-4 w-4" />
                    Export Excel
                </Button>
                <Button variant="outline" size="sm" onClick={onExportPDF}>
                    <FileText className="mr-2 h-4 w-4" />
                    Export PDF
                </Button>
            </div>
        </div>
    );
}
