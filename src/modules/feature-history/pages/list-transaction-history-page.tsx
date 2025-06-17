import { PageHeader } from "@/components/page-header";
import { AllOrderTable } from "../components";

export const ListTransactionsHistoryPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <PageHeader title="Transaction History" />
            <AllOrderTable />
        </div>
    );
};
