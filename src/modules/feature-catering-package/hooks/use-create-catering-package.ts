import { useEffect } from "react";
import { useCateringPackageStore } from "../stores";
import { toast } from "sonner";
import type { CreateCateringPackageDTOType } from "../data";

export const useCreateCateringPackage = () => {
    const { modal, createCateringPackage, cateringPackages, resetCreateCateringPackageState, resetModal } =
        useCateringPackageStore();

    const handleSubmitCreate = async (data: CreateCateringPackageDTOType) => {
        try {
            await createCateringPackage.createCateringPackage(data);
            await cateringPackages.getAllCateringPackages();
        } finally {
            modal.onClose();
            resetModal();
        }
    };

    useEffect(() => {
        if (createCateringPackage.state.state === "success") {
            toast.success("Catering package created successfully");
        }
        if (createCateringPackage.state.state === "error") {
            toast.error(createCateringPackage.state.error || "Failed to create catering package");
        }

        return () => {
            resetCreateCateringPackageState();
        };
    }, [createCateringPackage.state.state]);

    const isLoading = createCateringPackage.state.state === "loading";

    return {
        isOpen: modal.isOpen && modal.mode === "create",
        onOpenChange: (isOpen: boolean) => {
            if (!isOpen) {
                modal.onClose();
                resetModal();
            }
        },
        handleSubmitCreate,
        isLoading,
    };
};
