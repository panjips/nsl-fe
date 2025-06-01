import { Modal } from "@/components/modal";
import { useDeleteProductRecipe } from "../hooks/use-delete-product-recipe";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const ProductRecipeDeleteModal = () => {
  const { isOpen, onOpenChange, handleSubmitDelete, isLoading, productId } =
    useDeleteProductRecipe();

  const handleDelete = () => {
    if (productId) {
      handleSubmitDelete(productId);
    }
  };

  return (
    <Modal
      title="Delete Product Recipe"
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <div className="pb-4 pt-2 text-sm text-muted-foreground">
        Are you sure you want to delete this product recipe? This action cannot be
        undone.
      </div>

      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
      </DialogFooter>
    </Modal>
  );
};
