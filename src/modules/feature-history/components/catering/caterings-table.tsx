import { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { useHistoryStore } from "../../stores";
import { useCaterings } from "../../hooks";
import { CateringDetailModal } from "./caterings-detail-modal";
import { cateringsColumnHelper, setupCateringsColumns, statusIcons } from "./caterings-column";
import {
    ReservationStatus,
    statusDisplayNames,
    type ReservationWithOrderCateringAndPackage,
} from "@/modules/feature-reservation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Filter, FilterX } from "lucide-react";

export const CateringTable = () => {
    const { data, isLoading, setSearchTerm, searchTerm, statusFilter, setStatusFilter } = useCaterings();
    const { modal } = useHistoryStore();

    const handleOpenDetail = (id: number | string, data?: ReservationWithOrderCateringAndPackage) => {
        modal.onOpen("detail", data, id);
    };

    const columns = useMemo(() => {
        return setupCateringsColumns({
            columnHelper: cateringsColumnHelper,
            onDetail: handleOpenDetail,
        });
    }, []);

    const handleStatusFilterChange = (value: string) => {
        setStatusFilter(value === "ALL" ? null : value);
    };

    const currentStatusDisplay = statusFilter
        ? statusDisplayNames[statusFilter as keyof typeof ReservationStatus]
        : "All Statuses";

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-9">
                                <Filter className="mr-2 h-4 w-4" />
                                <span className="hidden lg:inline">
                                    {statusFilter ? `Status: ${currentStatusDisplay}` : "Filter by Status"}
                                </span>
                                <span className="lg:hidden">Status</span>
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56">
                            <DropdownMenuItem
                                onClick={() => handleStatusFilterChange("ALL")}
                                className="flex items-center gap-2"
                            >
                                <FilterX className="h-4 w-4 text-gray-500" />
                                <span>All Statuses</span>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            {Object.values(ReservationStatus).map((status) => (
                                <DropdownMenuItem
                                    key={status}
                                    onClick={() => handleStatusFilterChange(status)}
                                    className="flex items-center gap-2"
                                >
                                    {statusIcons[status]}
                                    <span>{statusDisplayNames[status]}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <DataTable
                key={data?.length}
                isLoading={isLoading}
                data={data || []}
                columns={columns}
                enablePagination={true}
                enableSearch={true}
                onSearch={setSearchTerm}
                searchValue={searchTerm}
                searchPlaceholder="Search caterings..."
            />

            <CateringDetailModal />
        </>
    );
};
