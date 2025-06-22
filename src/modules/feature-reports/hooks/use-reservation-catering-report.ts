import { useState, useEffect, useMemo } from "react";
import type { ReportType, DateRange, BaseReportParams, ReservationReport } from "../domain";
import { getDateRange } from "../components/product-sales/helpers";
import { useReportStore } from "../stores";
import { downloadReservationCateringPDF } from "../components/reservation-catering/reservation-catering-pdf";
import { generateReservationCateringExcel } from "../components/reservation-catering/reservation-catering-excel";

export const useReservationCateringReport = () => {
    const { reservationCatering, resetReservationCatering } = useReportStore();
    const [reportType, setReportType] = useState<ReportType>("DAILY");
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    const isLoading = useMemo(() => reservationCatering.state.state === "loading", [reservationCatering.state]);

    const dateRange: DateRange =
        reportType === "CUSTOM"
            ? {
                  start: startDate,
                  end: endDate,
                  label: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
              }
            : getDateRange(reportType, new Date());

    const generateReport = async () => {
        if (reportType === "CUSTOM" && (!startDate || !endDate)) {
            console.error("Please select both start and end dates");
            return;
        }

        try {
            const params: BaseReportParams = {
                startDate: reportType !== "CUSTOM" ? undefined : dateRange.start.toISOString(),
                endDate: reportType !== "CUSTOM" ? undefined : dateRange.end.toISOString(),

                type: reportType,
            };

            await reservationCatering.generateReservationCateringReport(params);
        } catch (error) {
            console.error("Error fetching sales data:", error);
        }
    };

    const exportExcel = async () => {
        try {
            const data = reservationCateringData;

            const now = new Date();
            const dateStr = now.toISOString().slice(0, 10);
            const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, "-");

            let reportTypeStr = "";
            switch (reportType) {
                case "DAILY":
                    reportTypeStr = "daily";
                    break;
                case "WEEKLY":
                    reportTypeStr = "weekly";
                    break;
                case "MONTHLY":
                    reportTypeStr = "monthly";
                    break;
                case "YEARLY":
                    reportTypeStr = "yearly";
                    break;
                case "CUSTOM":
                    reportTypeStr = "custom";
                    break;
            }

            const fileName = `reservation-catering-report-${reportTypeStr}-${dateStr}-${timeStr}.xlsx`;

            await generateReservationCateringExcel(data, dateRange.label, fileName);

            console.log("Excel file downloaded successfully");
        } catch (error) {
            console.error("Error generating Excel:", error);
        }
    };

    const exportPDF = async () => {
        try {
            const data = reservationCateringData;

            const now = new Date();
            const dateStr = now.toISOString().slice(0, 10);
            const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, "-");

            let reportTypeStr = "";
            switch (reportType) {
                case "DAILY":
                    reportTypeStr = "daily";
                    break;
                case "WEEKLY":
                    reportTypeStr = "weekly";
                    break;
                case "MONTHLY":
                    reportTypeStr = "monthly";
                    break;
                case "YEARLY":
                    reportTypeStr = "yearly";
                    break;
                case "CUSTOM":
                    reportTypeStr = "custom";
                    break;
            }

            const fileName = `reservation-catering-report-${reportTypeStr}-${dateStr}-${timeStr}.pdf`;

            await downloadReservationCateringPDF(data, dateRange.label, fileName);

            console.log("PDF downloaded successfully");
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    useEffect(() => {
        generateReport();
    }, []);

    const reservationCateringData: ReservationReport[] = useMemo(() => {
        if (reservationCatering.state.state === "success") {
            return reservationCatering.state.data as ReservationReport[];
        }
        return [];
    }, [reservationCatering.state]);

    return {
        reportType,
        setReportType,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        isLoading,
        dateRange,
        reservationCateringData,

        generateReport,
        exportExcel,
        exportPDF,
        resetState: resetReservationCatering,
    };
};
