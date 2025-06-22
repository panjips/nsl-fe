import { RevenueSummary } from "../components/revenue/revenue-summary";

export const RevenueReportPage = () => {
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold pb-4">Revenue Report</h1>
            <RevenueSummary />
        </div>
    );
};