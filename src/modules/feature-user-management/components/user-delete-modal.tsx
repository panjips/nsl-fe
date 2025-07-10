import { Modal } from "@/components/modal";
import { useDeleteUser } from "../hooks/use-delete-user";

export const UserDeleteModal = ({
    id,
}: {
    id: number | string | undefined;
}) => {
    const { isLoading, isOpen, handleSubmitDelete, onOpenChange } = useDeleteUser();

    return (
        <Modal
            open={isOpen}
            onOpenChange={onOpenChange}
            title="Delete User"
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
                <p>Are you sure you want to delete this user?</p>
                <p className="text-sm text-muted-foreground">
                    This action cannot be undone and will permanently remove the user account.
                </p>
            </div>
        </Modal>
    );
};