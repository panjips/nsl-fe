import { useMemo } from "react";
import { dashboardColumnHelper, setupDashboardColumns } from "../components/dashboard-column";

export function useDashboard() {
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
        columns,
    };
}
