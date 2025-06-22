import { ProductSalesSummary } from "../components/product-sales/product-sales-summary";

export default function ProductSalesReportPage() {
    return (
        <div className="container mx-auto ">
            <h1 className="text-2xl font-bold pb-4">Product Sales Report</h1>
            <ProductSalesSummary />
        </div>
    );
}
