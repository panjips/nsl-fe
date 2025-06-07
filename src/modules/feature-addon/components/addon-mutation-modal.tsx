import { Modal } from "@/components/modal";
import { useEditAddon, useCreateAddon } from "../hooks";
import { useForm } from "react-hook-form";
import { CreateAddonDTO, type CreateAddonDTOType } from "../data";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export const AddonMutationModal = ({
    id,
}: {
    id: number | string | undefined;
}) => {
    const isEdit = !!id;

    const forms = useForm<CreateAddonDTOType>({
        resolver: zodResolver(CreateAddonDTO),
        defaultValues: {
            name: "",
            description: "",
            cost: 0,
            price: 0,
        },
    });

    const {
        isOpen: isOpenCreate,
        handleSubmitCreate,
        isLoading: isLoadingCreate,
        onOpenChange: onOpenChangeCreate,
    } = useCreateAddon();

    const {
        isOpen: isOpenEdit,
        data,
        handleSubmitEdit,
        isLoading: isLoadingEdit,
        onOpenChange: onOpenChangeEdit,
    } = useEditAddon();

    const onOpenChange = isEdit ? onOpenChangeEdit : onOpenChangeCreate;

    useEffect(() => {
        if (isEdit && data) {
            forms.reset({
                name: data.name || "",
                description: data.description || "",
                cost: Number(data.cost || 0),
                price: Number(data.price || 0),
            });
        } else if (!isEdit && isOpenCreate) {
            forms.reset({
                name: "",
                description: "",
                cost: 0,
                price: 0,
            });
        }
    }, [data, isEdit, forms, isOpenCreate]);

    return (
        <Modal
            open={isOpenEdit || isOpenCreate}
            onOpenChange={onOpenChange}
            title={isEdit ? "Edit Add-on" : "Create Add-on"}
            size="md"
            actionText={isEdit ? "Save Changes" : "Create"}
            actionVariant="default"
        >
            <Form {...forms}>
                <form
                    onSubmit={forms.handleSubmit((data) => {
                        if (isEdit) {
                            return handleSubmitEdit({ ...data });
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
                                    <Input type="text" placeholder="Add-on Name" {...field} className="input" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={forms.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        style={{ minHeight: "80px" }}
                                        placeholder="Optional Add-on Description"
                                        {...field}
                                        className="input"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={forms.control}
                            name="cost"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cost</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            prefix={<span>Rp.</span>}
                                            placeholder="Cost"
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                                            className="input"
                                            min={0}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={forms.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            prefix={<span>Rp.</span>}
                                            placeholder="Selling Price"
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                                            className="input"
                                            min={0}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

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
