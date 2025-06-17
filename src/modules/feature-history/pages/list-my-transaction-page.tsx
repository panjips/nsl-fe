import { OnlineOrderTable } from "../components/";
import { PageHeader } from "@/components/page-header";

export const ListMyTransactionsPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <PageHeader title="My Transaction History" />
            <OnlineOrderTable />
        </div>
    );
};
