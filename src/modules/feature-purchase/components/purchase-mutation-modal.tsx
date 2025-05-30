import { Modal } from "@/components/modal";
import { useEditPurchase, useCreatePurchase } from "../hooks";
import { useForm } from "react-hook-form";
import { CreatePurchaseDTO, type CreatePurchaseDTOType } from "../data";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useListInventory } from "../../feature-inventory/hooks";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

export const PurchaseMutationModal = ({
  id,
}: {
  id: number | string | undefined;
}) => {
  const isEdit = !!id;
  const { data: inventories, isLoading: isLoadingInventories } =
    useListInventory();

  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const forms = useForm<CreatePurchaseDTOType>({
    resolver: zodResolver(CreatePurchaseDTO),
    defaultValues: {
      inventory_id: 0,
      quantity: 1,
      total: 0,
      purchase_date: new Date(),
    },
  });

  const {
    isOpen: isOpenCreate,
    handleSubmitCreate,
    isLoading: isLoadingCreate,
    onOpenChange,
  } = useCreatePurchase();

  const {
    isOpen: isOpenEdit,
    data,
    handleSubmitEdit,
    isLoading: isLoadingEdit,
  } = useEditPurchase();

  useEffect(() => {
    if (isEdit && data) {
      forms.reset({
        inventory_id: data.inventory_id,
        quantity: Number(data.quantity),
        total: Number(data.total),
        purchase_date: new Date(data.purchase_date),
      });
    } else if (!isEdit && isOpenCreate) {
      forms.reset({
        inventory_id: 0,
        quantity: 1,
        total: 0,
        purchase_date: new Date(),
      });
    }
  }, [data, isEdit, forms, isOpenCreate]);

  console.log(forms.getValues("purchase_date"));

  return (
    <Modal
      open={isOpenEdit || isOpenCreate}
      onOpenChange={onOpenChange}
      title={isEdit ? "Edit Purchase" : "Create Purchase"}
      size="md"
      actionText={isEdit ? "Save Changes" : "Create"}
      actionVariant="default"
      closeOnOutsideClick={false}
    >
      <Form {...forms}>
        <form
          onSubmit={forms.handleSubmit((data) => {
            if (isEdit) {
              return handleSubmitEdit({
                ...data,
              });
            }

            return handleSubmitCreate(data);
          })}
          className="space-y-4"
        >
          <FormField
            control={forms.control}
            name="inventory_id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Select Inventory</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value ? field.value.toString() : ""}
                  disabled={isLoadingInventories}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an inventory item" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {inventories?.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 1)
                      }
                      className="input"
                      min={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={forms.control}
              name="total"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Cost</FormLabel>
                  <FormControl>
                    <Input
                      prefix={<span>Rp.</span>}
                      type="text"
                      placeholder="Total cost"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value) || 0)
                      }
                      className="input"
                      min={0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={forms.control}
            name="purchase_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Purchase Date</FormLabel>
                <Popover
                  modal={datePickerOpen}
                  open={datePickerOpen}
                  onOpenChange={setDatePickerOpen}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                        onClick={() => setDatePickerOpen(true)}
                      >
                        {field.value ? (
                          format(new Date(field.value), "dd MMM yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        console.log(date);

                        if (date) {
                          field.onChange(new Date(date));
                        }

                        setDatePickerOpen(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter className="mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              disabled={forms.formState.isSubmitting}
            >
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
