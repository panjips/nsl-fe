import { Modal } from "@/components/modal";
import { useForm } from "react-hook-form";
import { CreateInventoryOpnameDTO, type CreateInventoryOpnameDTOType } from "../data";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useInventoryStore } from "../stores";
import { useCreateInventoryOpname } from "../hooks";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const InventoryOpnameModal = () => {
    const { modalOpname, resetModalOpname, inventories } = useInventoryStore();
    const { isLoading, handleSubmitCreate, onOpenChange } = useCreateInventoryOpname();
    const [inventoryData, setInventoryData] = useState<any[]>([]);

    // Fetch inventory data when modal opens
    useEffect(() => {
        if (modalOpname.isOpen && inventoryData.length === 0) {
            inventories.getAllInventories();
        }
    }, [modalOpname.isOpen]);

    // Update inventory data when fetched
    useEffect(() => {
        if (inventories.state.state === "success") {
            setInventoryData(inventories.state.data);
        }
    }, [inventories.state.state]);

    const form = useForm<CreateInventoryOpnameDTOType>({
        resolver: zodResolver(CreateInventoryOpnameDTO),
        defaultValues: {
            inventory_id: 0,
            actual_quantity: 0,
            notes: "",
        },
    });

    // Reset form when modal opens or closes
    useEffect(() => {
        if (modalOpname.isOpen) {
            form.reset({
                inventory_id: 0,
                actual_quantity: 0,
                notes: "",
            });
        }
    }, [modalOpname.isOpen, form]);

    // Get current quantity for selected inventory
    const selectedInventory = form.watch("inventory_id");
    const currentInventory = inventoryData.find((item) => item.id === selectedInventory);
    const currentQuantity = currentInventory ? Number(currentInventory.quantity) : 0;

    return (
        <Modal open={modalOpname.isOpen} onOpenChange={onOpenChange} title="Create Inventory Opname" size="md">
            <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => handleSubmitCreate(data))} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="inventory_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select Inventory</FormLabel>
                                <Select
                                    onValueChange={(value) => field.onChange(Number(value))}
                                    defaultValue={field.value.toString()}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an inventory item" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {inventoryData.map((item) => (
                                            <SelectItem key={item.id} value={item.id.toString()}>
                                                {item.name} ({item.quantity} {item.unit})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {currentInventory && (
                        <div className="px-3 py-2 rounded-md bg-muted/50">
                            <p className="text-sm">
                                <span className="font-medium">Current quantity:</span> {currentQuantity}{" "}
                                {currentInventory.unit}
                            </p>
                        </div>
                    )}

                    <FormField
                        control={form.control}
                        name="actual_quantity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Actual Quantity</FormLabel>
                                <FormControl>
                                    <Input
                                        suffix={`${currentInventory?.unit || ""}`}
                                        type="number"
                                        placeholder="Enter actual quantity"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        className="input"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Notes (Optional)</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter notes or reason for adjustment"
                                        {...field}
                                        className="resize-none"
                                        rows={3}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <DialogFooter className="mt-8">
                        <Button type="button" variant="outline" onClick={() => resetModalOpname()}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="default" disabled={isLoading}>
                            {isLoading ? "Submitting..." : "Submit Opname"}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </Modal>
    );
};
