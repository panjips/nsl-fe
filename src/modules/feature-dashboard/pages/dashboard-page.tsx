import { useState } from "react";
import { DashboardCard } from "../components/dashboard-card";
import { InteractiveChart } from "../components/interactive-chart";
import { useDashboard } from "../hooks";
import { TopProducts } from "../components/top-products";
import type { DateFilterPeriod } from "../domain";

export const DashboardPage = () => {
    const { statisticsData, topProductsData } = useDashboard();
    const [selectedPeriod, setSelectedPeriod] = useState<DateFilterPeriod>("7days");

    const handlePeriodChange = (period: DateFilterPeriod) => {
        setSelectedPeriod(period);
    };

    
    const getFilteredData = () => {
        if (selectedPeriod === "custom") {
            return statisticsData;
        } else if (selectedPeriod === "7days") {
            return statisticsData.slice(-7);
        }
        return statisticsData;
    };

    const filteredData = getFilteredData();

    return (
        <div className="flex flex-col gap-4">
            <DashboardCard data={filteredData} selectedPeriod={selectedPeriod} setSelectedPeriod={handlePeriodChange} />
            <div className="grid grid-cols-1 gap-0 lg:grid-cols-3 lg:gap-4">
                <div className="col-span-2 mb-4 lg:mb-0">
                    <InteractiveChart
                        data={filteredData}
                        selectedPeriod={selectedPeriod}
                        setSelectedPeriod={handlePeriodChange}
                    />
                </div>
                <TopProducts productsData={topProductsData} />
            </div>
        </div>
    );
};
