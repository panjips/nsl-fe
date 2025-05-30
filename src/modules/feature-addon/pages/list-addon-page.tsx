import { AddonTable } from "../components/addon-table";

export const ListAddonPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Add-ons Management</h1>
      <AddonTable />
    </div>
  );
};