import { Card } from "@/components/ui/card";
import { useReservationCateringReport } from "../../hooks/use-reservation-catering-report";
import { InventoryReportFilters } from "../inventory-usage/inventory-report-filters";
import { InventoryReportHeader } from "../inventory-usage/inventory-report-header";
import { ReservationCateringTable } from "./reservation-catering-table";

export function ReservationCateringSummary() {
    const {
        // States
        reportType,
        setReportType,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        isLoading,
        dateRange,
        reservationCateringData,

        // Actions
        generateReport,
        exportExcel,
        exportPDF,
    } = useReservationCateringReport();

    return (
        <div className="space-y-6 print:p-6">
            <div className="print:hidden">
                <InventoryReportFilters
                    reportType={reportType}
                    setReportType={setReportType}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    onGenerateReport={generateReport}
                />
            </div>

            <InventoryReportHeader
                title="Reservation Catering Report"
                dateRange={dateRange}
                onExportExcel={exportExcel}
                onExportPDF={exportPDF}
            />

            <div className="space-y-6">
                <Card>
                    <ReservationCateringTable data={reservationCateringData} isLoading={isLoading} />
                </Card>
            </div>
        </div>
    );
}
