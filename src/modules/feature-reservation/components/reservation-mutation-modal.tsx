import { Modal } from "@/components/modal";
import { useEditReservation, useCreateReservation } from "../hooks";
import { useForm, useFieldArray } from "react-hook-form";
import { CreateReservationDTO, type CreateReservationDTOType } from "../data";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { cn, formatCurrency } from "@/lib/utils";
import { useListCateringPackage } from "@/modules/feature-catering-package";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export const ReservationMutationModal = ({
    id,
}: {
    id: number | string | undefined;
}) => {
    const isEdit = !!id;
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const form = useForm<CreateReservationDTOType>({
        resolver: zodResolver(CreateReservationDTO),
        defaultValues: {
            location: "",
            event_date: "",
            notes: "",
            is_use_cart: false,
            packages: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "packages",
    });

    const {
        isOpen: isOpenCreate,
        handleSubmitCreate,
        onOpenChange: onOpenChangeCreate,
        isLoading: isLoadingCreate,
    } = useCreateReservation();

    const { data: dataPackage } = useListCateringPackage();

    const {
        isOpen: isOpenEdit,
        onOpenChange: onOpenChangeEdit,
        data,
        handleSubmitEdit,
        isLoading: isLoadingEdit,
    } = useEditReservation();

    const isOpen = isOpenCreate || isOpenEdit;
    const onOpenChange = isEdit ? onOpenChangeEdit : onOpenChangeCreate;
    const isLoading = isEdit ? isLoadingEdit : isLoadingCreate;

    useEffect(() => {
        if (isEdit && data) {
            form.reset({
                location: data.location || "",
                event_date: data.event_date || "",
                notes: data.notes || "",
                is_use_cart: data.is_use_cart || false,
                packages: data.orderCaterings?.map((order) => ({ id: order.catering_package_id })) || [],
            });
        } else if (!isEdit && isOpenCreate) {
            form.reset({
                location: "",
                event_date: "",
                notes: "",
                is_use_cart: false,
                packages: [],
            });
        }
    }, [data, isEdit, form, isOpenCreate]);

    const onSubmit = (formData: CreateReservationDTOType) => {
        if (isEdit && data) {
            return handleSubmitEdit({ ...formData });
        }
        return handleSubmitCreate(formData);
    };

    const addPackage = () => {
        append({ id: 0 });
    };

    return (
        <Modal
            open={isOpen}
            onOpenChange={onOpenChange}
            title={isEdit ? "Edit Reservation" : "Create Reservation"}
            size="xl"
            isFooter={true}
            footerContent={
                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button form="reservation-form" type="submit" disabled={form.formState.isSubmitting || isLoading}>
                        {isLoading
                            ? isEdit
                                ? "Saving..."
                                : "Creating..."
                            : isEdit
                              ? "Save Changes"
                              : "Create Reservation"}
                    </Button>
                </div>
            }
        >
            <Form {...form}>
                <form id="reservation-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Event Location" {...field} className="input" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="event_date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Event Date</FormLabel>
                                <Popover modal={datePickerOpen} open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground",
                                                )}
                                                onClick={() => setDatePickerOpen(true)}
                                            >
                                                {field.value ? (
                                                    format(new Date(field.value), "PPP")
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
                                                field.onChange(date?.toISOString());
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

                    <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Notes</FormLabel>
                                <FormControl>
                                    <Textarea
                                        style={{ minHeight: "120px" }}
                                        placeholder="Optional Additional Notes"
                                        {...field}
                                        className="input"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="is_use_cart"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Use Cart</FormLabel>
                                    <p className="text-sm text-muted-foreground">
                                        Check this if the event requires a coffee cart
                                    </p>
                                </div>
                            </FormItem>
                        )}
                    />

                    <Separator />

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-medium">Catering Packages</h3>
                                {form.formState.errors.packages?.message && (
                                    <p className="text-sm text-destructive ">
                                        {form.formState.errors.packages.message}
                                    </p>
                                )}
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addPackage}
                                className="flex items-center gap-1"
                            >
                                <Plus size={16} /> Add Package
                            </Button>
                        </div>

                        {fields.length === 0 ? (
                            <div className="text-sm text-muted-foreground">
                                No catering packages added. Click "Add Package" to include one.
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex items-start gap-3">
                                        <div className="flex-1">
                                            <FormField
                                                control={form.control}
                                                name={`packages.${index}.id`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <Select
                                                            onValueChange={(value) => field.onChange(Number(value))}
                                                            value={field.value ? field.value.toString() : ""}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select catering package" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {dataPackage?.map((pkg) => (
                                                                    <SelectItem key={pkg.id} value={pkg.id.toString()}>
                                                                        {pkg.name} - {formatCurrency(pkg.price)}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => remove(index)}
                                        >
                                            <X size={16} />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </form>
            </Form>
        </Modal>
    );
};
