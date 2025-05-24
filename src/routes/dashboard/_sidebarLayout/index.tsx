import { DashboardTable } from "@/modules/feature-dashboard/components/dashboard-table";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { createFileRoute } from "@tanstack/react-router";

import dataEc from "@/app/dashboard/data.json";
import { useEffect, useState } from "react";
import type { TableDashboardSchemaType } from "@/modules/feature-dashboard/data";

export const Route = createFileRoute("/dashboard/_sidebarLayout/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [data, setData] = useState<TableDashboardSchemaType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(dataEc);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <SectionCards />
      <ChartAreaInteractive />
      <DashboardTable data={dataEc} isLoading={isLoading} />
    </>
  );
}
