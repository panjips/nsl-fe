import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { type DateRangeFilter } from "../domain";

interface DateRangeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (range: DateRangeFilter) => void;
    initialRange?: DateRangeFilter;
}

export function DateRangeModal({ isOpen, onClose, onApply, initialRange }: DateRangeModalProps) {
    const [startDate, setStartDate] = useState<Date | undefined>(
        initialRange?.startDate ? new Date(initialRange.startDate) : undefined,
    );
    const [endDate, setEndDate] = useState<Date | undefined>(
        initialRange?.endDate ? new Date(initialRange.endDate) : undefined,
    );
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setStartDate(initialRange?.startDate ? new Date(initialRange.startDate) : undefined);
            setEndDate(initialRange?.endDate ? new Date(initialRange.endDate) : undefined);
            setError(null);
        }
    }, [isOpen, initialRange]);

    useEffect(() => {
        if (startDate && endDate && startDate > endDate) {
            setError("End date cannot be earlier than start date");
        } else {
            setError(null);
        }
    }, [startDate, endDate]);

    const handleApply = () => {
        if (startDate && endDate) {
            if (startDate > endDate) {
                setError("End date cannot be earlier than start date");
                return;
            }

            onApply({
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
            });
            onClose();
        } else {
            setError("Please select both start and end dates");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Select Date Range</DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="space-y-2">
                        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Start Date
                        </p>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !startDate && "text-muted-foreground",
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {startDate ? format(startDate, "PPP") : "Select start date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={startDate}
                                    onSelect={(date) => setStartDate(date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* End Date Picker */}
                    <div className="space-y-2">
                        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            End Date
                        </p>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !endDate && "text-muted-foreground",
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {endDate ? format(endDate, "PPP") : "Select end date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={endDate}
                                    onSelect={(date) => setEndDate(date)}
                                    disabled={(date) => (startDate ? date < startDate : false)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-sm text-destructive">{error}</p>}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleApply} disabled={!startDate || !endDate || Boolean(error)}>
                        Apply Range
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
