import { Modal } from "@/components/modal";
import { useDeleteCateringPackage } from "../hooks";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const CateringPackageDeleteModal = () => {
    const { isOpen, onOpenChange, handleSubmitDelete, id, isLoading } = useDeleteCateringPackage();

    const handleDelete = () => {
        if (id) {
            handleSubmitDelete(id);
        }
    };

    return (
        <Modal title="Delete Catering Package" open={isOpen} onOpenChange={onOpenChange}>
            <div className="pb-4 pt-2 text-sm text-muted-foreground">
                Are you sure you want to delete this catering package? This action cannot be undone.
            </div>

            <DialogFooter>
                <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                    Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
                    {isLoading ? "Deleting..." : "Delete"}
                </Button>
            </DialogFooter>
        </Modal>
    );
};
