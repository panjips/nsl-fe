import { Modal } from "@/components/modal";
import { useEditInventory, useCreateInventory } from "../hooks";
import { useForm } from "react-hook-form";
import { CreateInventoryDTO, type CreateInventoryDTOType } from "../data";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export const InventoryMutationModal = ({
    id,
}: {
    id: number | string | undefined;
}) => {
    const isEdit = !!id;

    const forms = useForm<CreateInventoryDTOType>({
        resolver: zodResolver(CreateInventoryDTO),
        defaultValues: {
            name: "",
            quantity: 0,
            unit: "",
            min_quantity: 0,
        },
    });

    const { isOpen: isOpenCreate, handleSubmitCreate, isLoading: isLoadingCreate, onOpenChange } = useCreateInventory();

    const { isOpen: isOpenEdit, data, handleSubmitEdit, isLoading: isLoadingEdit } = useEditInventory();

    useEffect(() => {
        if (isEdit && data) {
            forms.reset({
                name: data.name || "",
                quantity: Number.parseInt(data.quantity) || 0,
                unit: data.unit || "",
                min_quantity: Number.parseInt(data.min_quantity) || 0,
            });
        } else if (!isEdit && isOpenCreate) {
            forms.reset({
                name: "",
                quantity: 0,
                unit: "",
                min_quantity: 0,
            });
        }
    }, [data, isEdit, forms, isOpenCreate]);

    return (
        <Modal
            open={isOpenEdit || isOpenCreate}
            onOpenChange={onOpenChange}
            title={isEdit ? "Edit Inventory" : "Create Inventory"}
            size="md"
            actionText={isEdit ? "Save Changes" : "Create"}
            actionVariant="default"
        >
            <Form {...forms}>
                <form
                    onSubmit={forms.handleSubmit((data) => {
                        if (isEdit) {
                            return handleSubmitEdit({
                                id: Number(id),
                                ...data,
                            });
                        }

                        return handleSubmitCreate(data);
                    })}
                    className="space-y-4"
                >
                    <FormField
                        control={forms.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Inventory Name" {...field} className="input" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={forms.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quantity</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Quantity"
                                            {...field}
                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                            className="input"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={forms.control}
                            name="unit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Unit</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Unit (e.g., pcs, kg)"
                                            {...field}
                                            className="input"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={forms.control}
                        name="min_quantity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Minimum Quantity</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Minimum Quantity"
                                        {...field}
                                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                        className="input"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <DialogFooter className="mt-8">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="default" disabled={forms.formState.isSubmitting}>
                            {isEdit
                                ? isLoadingEdit
                                    ? "Saving..."
                                    : "Save Changes"
                                : isLoadingCreate
                                  ? "Creating..."
                                  : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </Modal>
    );
};
