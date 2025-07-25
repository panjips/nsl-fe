import { useEffect } from "react";
import { useCategoryStore } from "../stores";
import { toast } from "sonner";
import type { CreateCategoryDTOType } from "../data";

export const useCreateCategory = () => {
    const { modal, createCategory, categories, resetCreateCategoryState, resetModal } = useCategoryStore();

    const isLoading = createCategory.state.state === "loading";

    const handleSubmitCreate = async (data: CreateCategoryDTOType) => {
        try {
            await createCategory.createCategory(data);
            await categories.getAllCategories();
        } finally {
            modal.onClose();
            resetModal();
        }
    };

    useEffect(() => {
        if (createCategory.state.state === "success") {
            toast.success("Category created successfully");
            resetCreateCategoryState();
        }
        if (createCategory.state.state === "error") {
            toast.error(createCategory.state.error || "Failed to create category");
            resetCreateCategoryState();
        }
    }, [createCategory.state.state, resetCreateCategoryState]);

    return {
        data: modal.data,
        isOpen: modal.isOpen && modal.mode === "create",
        handleSubmitCreate,
        isLoading,
    };
};
