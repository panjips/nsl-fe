import { OnlineOrderTable } from "../components/";
import { PageHeader } from "@/components/page-header";

export const ListOnlineOrderPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <PageHeader title="Processing Online Order" />
            <OnlineOrderTable />
        </div>
    );
};
