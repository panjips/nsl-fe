import { DataTable } from "@/components/data-table/data-table";
import { useDashboard } from "../hooks/use-dashboard";
import type { TableDashboardSchemaType } from "../data";

interface DashboardTableProps {
  data: TableDashboardSchemaType[];
  isLoading?: boolean;
}

export function DashboardTable({ data, isLoading }: DashboardTableProps) {
  const { columns } = useDashboard();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Dashboard Items</h2>
      </div>

      <DataTable
        isLoading={isLoading}
        data={data}
        columns={columns}
        enableDragDrop={false}
        enableRowSelection={false}
        enablePagination={true}
      />
    </div>
  );
}
