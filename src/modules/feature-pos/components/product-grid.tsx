import type { Product } from "../domain";
import { ProductCard } from "./product-card";

interface ProductGridProps {
    products: Product[];
    onProductClick: (product: Product) => void;
}

export function ProductGrid({ products, onProductClick }: ProductGridProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onProductClick={onProductClick} />
            ))}
        </div>
    );
}
