import { Button } from "@/components/ui/button";
import { ProductTable } from "../components/";
import { useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";

export const ListProductPage = () => {
  const navigate = useNavigate();
  const handleCreateProduct = () => {
    navigate({ to: "/dashboard/product/create" });
  };
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Products" />
      <div className="flex items-center justify-between">
        <div className="flex-1"></div>
        <Button
          variant="default"
          onClick={handleCreateProduct}
          className="w-fit"
        >
          Create Product
        </Button>
      </div>
      <ProductTable />
    </div>
  );
};
