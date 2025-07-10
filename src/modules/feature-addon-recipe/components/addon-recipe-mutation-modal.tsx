import { Modal } from "@/components/modal";
import { useEditAddonRecipe } from "../hooks/use-edit-addon-recipe";
import { useCreateAddonRecipe } from "../hooks/use-create-addon-recipe";
import { useForm, useFieldArray } from "react-hook-form";
import { BulkCreateAddonRecipeDTO, type BulkCreateAddonRecipeDTOType } from "../data/addon-recipe-dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus } from "lucide-react";
import { useInventoryStore } from "@/modules/feature-inventory";
import { useAddonStore } from "@/modules/feature-addon/stores";
import { Separator } from "@/components/ui/separator";

export const AddonRecipeMutationModal = ({
    addonId,
}: {
    addonId: number | string | undefined;
}) => {
    const isEdit = !!addonId;
    const [selectedInventories, setSelectedInventories] = useState<Record<number, any>>({});

    const { inventories, resetInventoriesState } = useInventoryStore();
    const { addons, resetAddonsState } = useAddonStore();

    useEffect(() => {
        inventories.getAllInventories();
        if (!isEdit) {
            addons.getAllAddons();
        }

        return () => {
            resetInventoriesState();
            if (!isEdit) {
                resetAddonsState();
            }
        };
    }, [addonId]);

    const listInventory = useMemo(() => {
        if (inventories.state.state === "success") {
            return inventories.state.data;
        }
        return [];
    }, [inventories.state.state, addonId]);

    const listAddon = useMemo(() => {
        if (addons.state.state === "success") {
            return addons.state.data;
        }
        return [];
    }, [addons.state.state]);

    const form = useForm<BulkCreateAddonRecipeDTOType>({
        resolver: zodResolver(BulkCreateAddonRecipeDTO),
        defaultValues: {
            addon_id: addonId ? Number(addonId) : 0,
            recipes: [
                {
                    inventory_id: 0,
                    quantity_used: 0,
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "recipes",
    });

    const {
        isOpen: isOpenCreate,
        handleSubmitCreate,
        isLoading: isLoadingCreate,
        addonId: createAddonId,
    } = useCreateAddonRecipe();

    const { isOpen: isOpenEdit, onOpenChange, data, handleSubmitEdit, isLoading: isLoadingEdit } = useEditAddonRecipe();

    const isOpen = isOpenCreate || isOpenEdit;
    const isLoading = isLoadingCreate || isLoadingEdit;

    useEffect(() => {
        if (isEdit && data) {
            form.setValue("addon_id", Number(data.id));

            if (data.recipes && data.recipes.length > 0) {
                form.setValue(
                    "recipes",
                    data.recipes.map((recipe) => ({
                        inventory_id: recipe.inventory_id,
                        quantity_used: recipe.quantity_used,
                    })),
                );

                const newSelectedInventories: Record<number, any> = {};
                data.recipes.forEach((recipe, index) => {
                    const inventory = listInventory.find((inv) => inv.id === recipe.inventory_id);
                    if (inventory) {
                        newSelectedInventories[index] = inventory;
                    }
                });
                setSelectedInventories(newSelectedInventories);
            }
        }
    }, [data, isEdit, form, listInventory]);

    const onSubmit = async (values: BulkCreateAddonRecipeDTOType) => {
        if (isEdit) {
            await handleSubmitEdit(values);
        } else {
            await handleSubmitCreate(values);
        }
        form.reset();
    };

    const onOpenChangeHandler = (isOpen: boolean) => {
        if (!isOpen) {
            onOpenChange?.(false);
            form.reset();
            resetInventoriesState();
        }
    };

    const addRecipe = () => {
        append({ inventory_id: 0, quantity_used: 0 });
    };

    const updateSelectedInventory = (index: number, inventoryId: number) => {
        const inventory = listInventory.find((inv) => inv.id === inventoryId);
        setSelectedInventories((prev) => ({
            ...prev,
            [index]: inventory,
        }));
    };

    return (
        <Modal
            closeOnOutsideClick={false}
            title={isEdit ? "Edit Addon Recipe" : "Add Addon Recipe"}
            open={isOpen}
            onOpenChange={onOpenChangeHandler}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="addon_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Addon</FormLabel>
                                    <div className="flex items-center gap-4 w-full">
                                        <div className="flex-1">
                                            {isEdit ? (
                                                <Select value={field.value?.toString()} disabled={true}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue>
                                                                {listAddon.find((addon) => addon.id === field.value)
                                                                    ?.name ||
                                                                    data?.name ||
                                                                    "Selected Addon"}
                                                            </SelectValue>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value={field.value?.toString() || "0"}>
                                                            {listAddon.find((addon) => addon.id === field.value)
                                                                ?.name ||
                                                                data?.name ||
                                                                "Selected Addon"}
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            ) : (
                                                <Select
                                                    onValueChange={(value) => field.onChange(Number(value))}
                                                    value={field.value ? field.value.toString() : ""}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select addon item" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="w-full">
                                                        {listAddon.map((addon) => (
                                                            <SelectItem
                                                                className="w-full"
                                                                key={addon.id}
                                                                value={addon.id.toString()}
                                                            >
                                                                {addon.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        </div>
                                        <Button type="button" onClick={addRecipe} className="flex items-center gap-1">
                                            <Plus size={16} /> Add Recipe
                                        </Button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Separator />

                        {fields.map((field, index) => (
                            <>
                                <div key={field.id} className="flex gap-4 items-end">
                                    <div className="w-1/2">
                                        <FormField
                                            control={form.control}
                                            name={`recipes.${index}.inventory_id`}
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormLabel>Inventory Item</FormLabel>
                                                    <Select
                                                        onValueChange={(value) => {
                                                            const inventoryId = Number(value);
                                                            field.onChange(inventoryId);
                                                            updateSelectedInventory(index, inventoryId);
                                                        }}
                                                        value={field.value ? field.value.toString() : ""}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select inventory item" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {listInventory.map((inventory) => (
                                                                <SelectItem
                                                                    key={inventory.id}
                                                                    value={inventory.id.toString()}
                                                                >
                                                                    {inventory.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="w-1/2">
                                        <FormField
                                            control={form.control}
                                            name={`recipes.${index}.quantity_used`}
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormLabel>Quantity Used</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min="0"
                                                            suffix={
                                                                <span>{selectedInventories[index]?.unit ?? null}</span>
                                                            }
                                                            step="0.01"
                                                            placeholder="Enter quantity"
                                                            className="w-full"
                                                            {...form.register(`recipes.${index}.quantity_used`, {
                                                                setValueAs: (v) => (v === "" ? 0 : Number(v)),
                                                            })}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {fields.length > 1 && (
                                        <Button type="button" variant={"destructive"} onClick={() => remove(index)}>
                                            <X size={16} />
                                        </Button>
                                    )}
                                </div>
                            </>
                        ))}
                    </div>
                    <Separator />

                    <DialogFooter className="mt-8">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => (onOpenChangeHandler ? onOpenChangeHandler(false) : {})}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : isEdit ? "Save Changes" : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </Modal>
    );
};
