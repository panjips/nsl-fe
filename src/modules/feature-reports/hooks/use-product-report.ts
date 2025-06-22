import { useState, useEffect, useMemo } from "react";
import type {
    ReportType,
    PaymentTypeValue,
    OrderTypeValue,
    SalesData,
    DateRange,
    ProductSalesReportParams,
} from "../domain";
import { OrderType, PaymentType } from "../domain";
import { getDateRange } from "../components/product-sales/helpers";
import { useReportStore } from "../stores";
import { downloadPDF } from "../components/product-sales/product-sales-pdf";
import { generateSalesExcel } from "../components/product-sales/product-sales-excel";

export const useProductReport = () => {
    const { productSales, resetProductSalesState } = useReportStore();

    const [reportType, setReportType] = useState<ReportType>("DAILY");
    const [paymentType, setPaymentType] = useState<PaymentTypeValue>(PaymentType.ALL);
    const [orderType, setOrderType] = useState<OrderTypeValue>(OrderType.ALL);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    const isLoading = useMemo(() => productSales.state.state === "loading", [productSales.state]);

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
            const params: ProductSalesReportParams = {
                startDate: reportType !== "CUSTOM" ? undefined : dateRange.start.toISOString(),
                endDate: reportType !== "CUSTOM" ? undefined : dateRange.end.toISOString(),
                paymentType: paymentType === PaymentType.ALL ? undefined : paymentType,
                orderType: orderType === OrderType.ALL ? undefined : orderType,
                type: reportType,
            };

            await productSales.generateProductReport(params);
        } catch (error) {
            console.error("Error fetching sales data:", error);
        }
    };

    const exportExcel = async () => {
        try {
            const data = salesData;

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

            const fileName = `sales-report-${reportTypeStr}-${dateStr}-${timeStr}.xlsx`;
            
            await generateSalesExcel(data, dateRange.label, fileName);
            
            console.log("Excel file downloaded successfully");
        } catch (error) {
            console.error("Error generating Excel:", error);
        }
    };

    const exportPDF = async () => {
        try {
            const data = salesData;

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

            const fileName = `sales-report-${reportTypeStr}-${dateStr}-${timeStr}.pdf`;

            downloadPDF(data, dateRange.label, fileName);

            console.log("PDF downloaded successfully");
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    useEffect(() => {
        generateReport();
    }, []);

    const salesData: SalesData = useMemo(() => {
        if (productSales.state.state === "success") {
            return productSales.state.data as SalesData;
        }
        return { productSales: [], addonSales: [] };
    }, [productSales.state]);

    return {
        reportType,
        setReportType,
        paymentType,
        setPaymentType,
        orderType,
        setOrderType,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        isLoading,
        dateRange,
        salesData,

        generateReport,
        exportExcel,
        exportPDF,
        resetState: resetProductSalesState,
    };
};
