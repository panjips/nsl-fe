import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import type { ReportType } from "../../domain";
import { cn } from "@/lib/utils";

interface InventoryReportFiltersProps {
    reportType: ReportType;
    setReportType: (type: ReportType) => void;
    startDate?: Date;
    setStartDate?: (date: Date) => void;
    endDate?: Date;
    setEndDate?: (date: Date) => void;
    onGenerateReport: () => void;
}

export function InventoryReportFilters({
    reportType,
    setReportType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    onGenerateReport,
}: InventoryReportFiltersProps) {
    const [startDateOpen, setStartDateOpen] = useState(false);
    const [endDateOpen, setEndDateOpen] = useState(false);

    return (
        <div className="space-y-4">
            <div
                className={cn("grid grid-cols-1 gap-4", reportType === "CUSTOM" ? "md:grid-cols-3" : "md:grid-cols-1")}
            >
                <div>
                    <Label htmlFor="report-type" className="mb-2 block">
                        Report Type
                    </Label>
                    <Select value={reportType} onValueChange={(value) => setReportType(value as ReportType)}>
                        <SelectTrigger id="report-type" className="w-full">
                            <SelectValue placeholder="Select Report Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="DAILY">Daily</SelectItem>
                            <SelectItem value="WEEKLY">Weekly</SelectItem>
                            <SelectItem value="MONTHLY">Monthly</SelectItem>
                            <SelectItem value="YEARLY">Yearly</SelectItem>
                            <SelectItem value="CUSTOM">Custom</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {reportType === "CUSTOM" && (
                    <>
                        <div>
                            <Label htmlFor="start-date" className="mb-2 block">
                                Start Date
                            </Label>
                            <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="start-date"
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {startDate ? format(startDate, "PPP") : "Select date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={startDate}
                                        onSelect={(date) => {
                                            setStartDate?.(date || new Date());
                                            setStartDateOpen(false);
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div>
                            <Label htmlFor="end-date" className="mb-2 block">
                                End Date
                            </Label>
                            <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="end-date"
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {endDate ? format(endDate, "PPP") : "Select date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={endDate}
                                        onSelect={(date) => {
                                            setEndDate?.(date || new Date());
                                            setEndDateOpen(false);
                                        }}
                                        disabled={(date) => (startDate ? date < startDate : false)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </>
                )}
            </div>

            <div className="flex justify-end">
                <Button onClick={onGenerateReport}>Generate Report</Button>
            </div>
        </div>
    );
}
