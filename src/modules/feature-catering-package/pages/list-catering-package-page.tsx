import { CateringPackageTable } from "../components";

export const ListCateringPackagePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Catering Package</h1>
        <CateringPackageTable />
      </div>
  );
};
