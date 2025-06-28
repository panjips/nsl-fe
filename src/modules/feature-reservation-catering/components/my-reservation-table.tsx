import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
    ReservationStatus,
    type ReservationWithOrderCateringAndPackage,
    reservationColumnHelper,
    setupReservationColumns,
    useUserReservations,
    statusIcons,
    statusDisplayNames,
    ReservationStatusUpdateModal,
    ReservationMutationModal,
    ReservationDeleteModal,
    ReservationViewModal,
    useReservationStore,
} from "@/modules/feature-reservation";
import { useMemo } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Filter, FilterX } from "lucide-react";
import { toast } from "sonner";
import { useGlobalAuthStore } from "@/stores";

export const MyReservationTable = () => {
    const { user } = useGlobalAuthStore();
    const { data, isLoading, setSearchTerm, searchTerm, statusFilter, setStatusFilter } = useUserReservations(
        user?.id || 1,
    );
    const { modal } = useReservationStore();

    const handleOpenModalView = (id: string | number) => {
        modal.onOpen("view", null, id);
    };

    const handleOpenModalEdit = (data: ReservationWithOrderCateringAndPackage) => {
        if (data.status !== ReservationStatus.PENDING) {
            toast.error("You can only edit reservations with PENDING status.");
            return;
        }
        modal.onOpen("edit", data);
    };

    const handleOpenModalDelete = (id: string | number, data: ReservationWithOrderCateringAndPackage) => {
        if (data.status !== ReservationStatus.PENDING && data.status !== ReservationStatus.CANCELLED) {
            toast.error("You can only delete reservations with PENDING or CANCELLED status.");
            return;
        }
        modal.onOpen("delete", null, id);
    };

    const columns = useMemo(() => {
        return setupReservationColumns({
            columnHelper: reservationColumnHelper,
            onEdit: handleOpenModalEdit,
            onDelete: handleOpenModalDelete,
            onView: handleOpenModalView,
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
            />
            <ReservationMutationModal id={modal.data?.id} />
            <ReservationDeleteModal id={modal.id ?? undefined} />
            <ReservationViewModal id={modal.id ?? undefined} />
            <ReservationStatusUpdateModal id={modal.id ?? undefined} data={modal.data ?? undefined} />
        </>
    );
};
