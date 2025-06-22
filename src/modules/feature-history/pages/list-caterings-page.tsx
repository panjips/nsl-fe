import { PageHeader } from "@/components/page-header";
import { CateringTable } from "../components";

export const ListCateringsPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <PageHeader title="My Transaction History" />
            <CateringTable />
        </div>
    );
};
