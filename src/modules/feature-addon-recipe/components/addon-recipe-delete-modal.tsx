import { Modal } from "@/components/modal";
import { useDeleteAddonRecipe } from "../hooks/use-delete-addon-recipe";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const AddonRecipeDeleteModal = () => {
    const { isOpen, onOpenChange, handleSubmitDelete, isLoading, addonId } = useDeleteAddonRecipe();

    const handleDelete = () => {
        if (addonId) {
            handleSubmitDelete(addonId);
        }
    };

    return (
        <Modal closeOnOutsideClick={false} title="Delete Addon Recipe" open={isOpen} onOpenChange={onOpenChange}>
            <div className="pb-4 pt-2 text-sm text-muted-foreground">
                Are you sure you want to delete this addon recipe? This action cannot be undone.
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
