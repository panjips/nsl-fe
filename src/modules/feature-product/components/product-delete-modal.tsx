import { Modal } from "@/components/modal";
import { useDeleteProduct } from "../hooks/use-delete-product";

export const ProductDeleteModal = ({
    id,
}: {
    id: number | string | undefined;
}) => {
    const { isLoading, handleDeleteProduct, isOpen, onOpenChange } = useDeleteProduct();

    return (
        <Modal
            closeOnOutsideClick={false}
            open={isOpen}
            onOpenChange={onOpenChange}
            title="Delete Product"
            size="md"
            actionText={isLoading ? "Deleting..." : "Delete"}
            actionVariant="destructive"
            isFooter={true}
            onAction={() => {
                if (id) {
                    handleDeleteProduct(id);
                }
            }}
        >
            <div className="space-y-4">
                <p>Are you sure you want to delete this product?</p>
                <p className="text-muted-foreground text-sm">This action cannot be undone.</p>
            </div>
        </Modal>
    );
};
