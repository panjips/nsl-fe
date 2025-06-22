import { useProductReport } from "../../hooks/use-product-report";

import { ReportFilters } from "./report-filters";
import { ReportHeader } from "./report-header";
import { SummaryCards } from "./summary-card";
import { ProductSalesTable } from "./product-sales-table";
import { AddonSalesTable } from "./addon-sales-table";
import { GrandTotal } from "./grand-total";
import { Card } from "@/components/ui/card";

export function ProductSalesSummary() {
    const {
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
    } = useProductReport();

    return (
        <div className="space-y-6 print:p-6">
            <div className="print:hidden">
                <ReportFilters
                    reportType={reportType}
                    setReportType={setReportType}
                    paymentType={paymentType}
                    setPaymentType={setPaymentType}
                    orderType={orderType}
                    setOrderType={setOrderType}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    onGenerateReport={generateReport}
                />
            </div>

            <ReportHeader title="Preview" dateRange={dateRange} onExportExcel={exportExcel} onExportPDF={exportPDF} />

            <SummaryCards productSales={salesData.productSales} addonSales={salesData.addonSales} />

            <div className="space-y-6">
                <Card>
                    <ProductSalesTable products={salesData.productSales} isLoading={isLoading} />
                </Card>

                <Card>
                    <AddonSalesTable addons={salesData.addonSales} isLoading={isLoading} />
                </Card>

                <GrandTotal productSales={salesData.productSales} addonSales={salesData.addonSales} />
            </div>
        </div>
    );
}
