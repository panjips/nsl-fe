import { PageHeader } from "@/components/page-header";
import { ProductForm } from "../components/product-form";

export const UpdateProductPage = () => {

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Update Product"
        showBackButton
        backTo="/dashboard/product"
      />
      <ProductForm />
    </div>
  );
};
