import { useState, useEffect, useMemo } from "react";
import type { ReportType, DateRange, BaseReportParams, RevenueReport } from "../domain";
import { getDateRange } from "../components/product-sales/helpers";
import { useReportStore } from "../stores";
import { downloadRevenuePDF } from "../components/revenue/revenue-pdf";
import { generateRevenueExcel } from "../components/revenue/revenue-excel";

export const useRevenueReport = () => {
    const { revenue, resetRevenueState } = useReportStore();
    const [reportType, setReportType] = useState<ReportType>("DAILY");
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    const isLoading = useMemo(() => revenue.state.state === "loading", [revenue.state]);

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

            await revenue.generateRevenueReport(params);
        } catch (error) {
            console.error("Error fetching sales data:", error);
        }
    };

    const exportExcel = async () => {
        try {
            const data = revenueData;

            if (!data) {
                console.error("No data available to export");
                return;
            }

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

            const fileName = `revenue-report-${reportTypeStr}-${dateStr}-${timeStr}.xlsx`;

            await generateRevenueExcel(data, dateRange.label, fileName);

            console.log("Excel file downloaded successfully");
        } catch (error) {
            console.error("Error generating Excel:", error);
        }
    };

    const exportPDF = async () => {
        try {
            const data = revenueData;

            if (!data) {
                console.error("No data available to export");
                return;
            }

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

            const fileName = `revenue-report-${reportTypeStr}-${dateStr}-${timeStr}.pdf`;

            await downloadRevenuePDF(data, dateRange.label, fileName);

            console.log("PDF downloaded successfully");
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    useEffect(() => {
        generateReport();
    }, []);

    const revenueData: RevenueReport | null = useMemo(() => {
        if (revenue.state.state === "success") {
            return revenue.state.data as RevenueReport;
        }
        return null;
    }, [revenue.state]);

    return {
        reportType,
        setReportType,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        isLoading,
        dateRange,
        revenueData,

        generateReport,
        exportExcel,
        exportPDF,
        resetState: resetRevenueState,
    };
};
