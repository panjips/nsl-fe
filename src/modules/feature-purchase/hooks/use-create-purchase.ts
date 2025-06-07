import { useEffect } from "react";
import { usePurchaseStore } from "../stores";
import { toast } from "sonner";
import type { CreatePurchaseDTOType } from "../data";

export const useCreatePurchase = () => {
    const { modal, createPurchase, purchases, resetCreatePurchaseState, resetModal } = usePurchaseStore();

    const isLoading = createPurchase.state.state === "loading";

    const handleSubmitCreate = async (data: CreatePurchaseDTOType) => {
        try {
            await createPurchase.createPurchase(data);
            await purchases.getAllPurchases();
        } finally {
            modal.onClose();
            resetModal();
        }
    };

    useEffect(() => {
        if (createPurchase.state.state === "success") {
            toast.success("Purchase created successfully");
        }
        if (createPurchase.state.state === "error") {
            toast.error(createPurchase.state.error || "Failed to create purchase");
        }

        return () => {
            resetCreatePurchaseState();
        };
    }, [createPurchase.state.state, resetCreatePurchaseState]);

    return {
        data: modal.data,
        onOpenChange: (isOpen: boolean) => {
            if (!isOpen) {
                modal.onClose();
                resetModal();
            }
        },
        isOpen: modal.isOpen && modal.mode === "create",
        handleSubmitCreate,
        isLoading,
    };
};
