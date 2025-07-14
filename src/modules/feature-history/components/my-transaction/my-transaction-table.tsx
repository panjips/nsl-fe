import { useMemo } from "react";
import { orderStatusIcons, paymentStatusIcons } from "../shared";
import { DataTable } from "@/components/data-table";
import { useHistoryStore } from "../../stores";
import { myTransactionColumnHelper, setupMyTransactionColumns } from "./my-transaction-column";
import type { OnlineOrder } from "@/modules/feature-online-order";
import { useMyTransaction, useRepayment } from "../../hooks";
import { MyTransactionDetailModal } from "./my-transaction-detail-modal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Filter, FilterX } from "lucide-react";
import { orderStatusDisplayNames, paymentStatusDisplayNames } from "../../domain";
import { MidtransPayment } from "@/modules/feature-shared";

const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

export const OnlineOrderTable = () => {
    const { data, isLoading, setSearchTerm, searchTerm, setStatusFilter, statusFilter } = useMyTransaction();
    const { modal, modalRepayment } = useHistoryStore();
    const { token, state, handleOpenRepayment, handlePaymentSuccess, handlePaymentError, handlePaymentClose } =
        useRepayment();

    const handleOpenDetail = (id: number | string, data?: OnlineOrder) => {
        modal.onOpen("detail", data, id);
    };

    const columns = useMemo(() => {
        return setupMyTransactionColumns({
            columnHelper: myTransactionColumnHelper,
            onDetail: handleOpenDetail,
            onRepayment: handleOpenRepayment,
        });
    }, []);

    const handlePaymentStatusFilterChange = (value: string) => {
        setStatusFilter((prev) => ({
            ...prev,
            payment: value,
            order: prev?.order || "ALL",
        }));
    };

    const handleOrderStatusFilterChange = (value: string) => {
        setStatusFilter((prev) => ({
            ...prev,
            order: value,
            payment: prev?.payment || "ALL",
        }));
    };

    const currentPaymentStatusDisplay = statusFilter?.payment
        ? paymentStatusDisplayNames[statusFilter.payment as keyof typeof paymentStatusDisplayNames] ||
          statusFilter.payment
        : "All Statuses";

    const currentOrderStatusDisplay = statusFilter?.order
        ? orderStatusDisplayNames[statusFilter.order as keyof typeof orderStatusDisplayNames] || statusFilter.order
        : "All Statuses";

    return (
        <>
            <div className="flex items-center  gap-2">
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-9">
                                <Filter className="mr-2 h-4 w-4" />
                                <span className="hidden lg:inline">
                                    {statusFilter
                                        ? `Status: ${currentPaymentStatusDisplay}`
                                        : "Filter by Status Payment"}
                                </span>
                                <span className="lg:hidden">Status</span>
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56">
                            <DropdownMenuItem
                                onClick={() => handlePaymentStatusFilterChange("ALL")}
                                className="flex items-center gap-2"
                            >
                                <FilterX className="h-4 w-4 text-gray-500" />
                                <span>All Statuses</span>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            {Object.entries(paymentStatusDisplayNames).map(([key, status]) => (
                                <DropdownMenuItem
                                    key={key}
                                    onClick={() => handlePaymentStatusFilterChange(key)}
                                    className="flex items-center gap-2"
                                >
                                    {paymentStatusIcons[key as keyof typeof paymentStatusIcons]}
                                    <span>{status}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-9">
                                <Filter className="mr-2 h-4 w-4" />
                                <span className="hidden lg:inline">
                                    {statusFilter ? `Status: ${currentOrderStatusDisplay}` : "Filter by Status Order"}
                                </span>
                                <span className="lg:hidden">Status</span>
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56">
                            <DropdownMenuItem
                                onClick={() => handleOrderStatusFilterChange("ALL")}
                                className="flex items-center gap-2"
                            >
                                <FilterX className="h-4 w-4 text-gray-500" />
                                <span>All Statuses</span>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            {Object.entries(orderStatusDisplayNames).map(([key, status]) => (
                                <DropdownMenuItem
                                    key={key}
                                    onClick={() => handleOrderStatusFilterChange(key)}
                                    className="flex items-center gap-2"
                                >
                                    {orderStatusIcons[key as keyof typeof orderStatusIcons]}
                                    <span>{status}</span>
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

            <MyTransactionDetailModal />
            {modalRepayment.isOpen &&
                modalRepayment.mode === "repayment" &&
                modalRepayment.data &&
                state.state === "success" && (
                    <MidtransPayment
                        clientKey={clientKey}
                        transactionToken={token as string}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                        onClose={handlePaymentClose}
                    />
                )}
        </>
    );
};
