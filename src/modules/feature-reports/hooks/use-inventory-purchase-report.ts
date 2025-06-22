import { useState, useEffect, useMemo } from "react";
import type { ReportType, DateRange, BaseReportParams, InventoryPurchaseReport } from "../domain";
import { getDateRange } from "../components/product-sales/helpers";
import { useReportStore } from "../stores";
import { downloadInventoryPDF } from "../components/inventory-purchase/inventory-purchase-pdf";
import { generateInventoryPurchaseExcel } from "../components/inventory-purchase/inventory-purchase-excel";

export const useInventoryPurchaseReport = () => {
    const { inventoryPurchase, resetInventoryPurchaseState } = useReportStore();
    const [reportType, setReportType] = useState<ReportType>("DAILY");
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    const isLoading = useMemo(() => inventoryPurchase.state.state === "loading", [inventoryPurchase.state]);

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

            await inventoryPurchase.generateInventoryPurchaseReport(params);
        } catch (error) {
            console.error("Error fetching sales data:", error);
        }
    };

    const exportExcel = async () => {
        try {
            const data = inventoryPurchaseData;

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

            const fileName = `inventory-purchase-report-${reportTypeStr}-${dateStr}-${timeStr}.xlsx`;

            await generateInventoryPurchaseExcel(data, dateRange.label, fileName);

            console.log("Excel file downloaded successfully");
        } catch (error) {
            console.error("Error generating Excel:", error);
        }
    };

    const exportPDF = async () => {
        try {
            const data = inventoryPurchaseData;

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

            const fileName = `inventory-purchase-report-${reportTypeStr}-${dateStr}-${timeStr}.pdf`;

            await downloadInventoryPDF(data, dateRange.label, fileName);

            console.log("PDF downloaded successfully");
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    useEffect(() => {
        generateReport();
    }, []);

    const inventoryPurchaseData: InventoryPurchaseReport[] = useMemo(() => {
        if (inventoryPurchase.state.state === "success") {
            return inventoryPurchase.state.data as InventoryPurchaseReport[];
        }
        return [];
    }, [inventoryPurchase.state]);

    return {
        reportType,
        setReportType,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        isLoading,
        dateRange,
        inventoryPurchaseData,

        generateReport,
        exportExcel,
        exportPDF,
        resetState: resetInventoryPurchaseState,
    };
};
