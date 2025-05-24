import { Modal } from "@/components/modal";
import { useDeleteCategory } from "../hooks";

export const CategoryDeleteModal = ({
  id,
}: {
  id: number | string | undefined;
}) => {
  const { isLoading, isOpen, handleSubmitDelete, onOpenChange } =
    useDeleteCategory();

  console.log(id);

  return (
    <Modal
      open={isOpen}
      onOpenChange={onOpenChange}
      title="Delete Category"
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
        <p>Are you sure you want to delete this category?</p>
      </div>
    </Modal>
  );
};
