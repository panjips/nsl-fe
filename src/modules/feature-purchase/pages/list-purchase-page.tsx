import { PurchaseTable } from "../components/purchase-table";

export const ListPurchasePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Purchase Management</h1>
      <PurchaseTable />
    </div>
  );
};