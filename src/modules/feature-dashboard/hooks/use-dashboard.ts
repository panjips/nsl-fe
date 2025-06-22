import { useEffect, useMemo } from "react";
import { dashboardColumnHelper, setupDashboardColumns } from "../components/dashboard-column";
import { useDashboardStore } from "../stores";

export const useDashboard = () => {
    const { statistics, topProducts, resetStatisticsState, resetTopProductsState } = useDashboardStore();

    const statisticsData = useMemo(() => {
        if (statistics.state.state === "success") {
            return statistics.state.data;
        }
        return [];
    }, [statistics.state]);

    const topProductsData = useMemo(() => {
        if (topProducts.state.state === "success") {
            return topProducts.state.data;
        }
        return [];
    }, [topProducts.state]);

    useEffect(() => {
        if (statistics.state.state === "init" || statistics.state.state === "error") {
            statistics.getStatistics();
        }

        if (topProducts.state.state === "init" || topProducts.state.state === "error") {
            topProducts.getTopProducts();
        }

        return () => {
            resetStatisticsState();
            resetTopProductsState();
        };
    }, []);

    const handleEdit = (id: number) => {
        console.log("Edit item with ID:", id);
    };

    const handleDelete = (id: number) => {
        console.log("Delete item with ID:", id);
    };

    const handleStatusChange = (id: number, status: string) => {
        console.log("Change status:", id, status);
    };

    const columns = useMemo(() => {
        return setupDashboardColumns({
            columnHelper: dashboardColumnHelper,
            onEdit: handleEdit,
            onDelete: handleDelete,
            onStatusChange: handleStatusChange,
        });
    }, [dashboardColumnHelper]);

    return {
        statisticsData,
        topProductsData,
        columns,
    };
};
