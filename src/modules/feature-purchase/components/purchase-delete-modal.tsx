import { Modal } from "@/components/modal";
import { useDeletePurchase } from "../hooks";

export const PurchaseDeleteModal = ({
  id,
}: {
  id: number | string | undefined;
}) => {
  const { isLoading, isOpen, handleSubmitDelete, onOpenChange } =
    useDeletePurchase();

  return (
    <Modal
      open={isOpen}
      onOpenChange={onOpenChange}
      title="Delete Purchase"
      size="md"
      actionText={isLoading ? "Deleting..." : "Delete"}
      actionVariant="destructive"
      isFooter={true}
      onAction={() => {
        if (id) {
          handleSubmitDelete(id);
        }
      }}
    >
      <div className="space-y-4">
        <p>Are you sure you want to delete this purchase record?</p>
        <p>This action cannot be undone.</p>
      </div>
    </Modal>
  );
};