import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MapPinIcon, PackageIcon, PlusIcon, TrashIcon } from "lucide-react";
import { CreateReservationDTO, type CreateReservationDTOType } from "@/modules/feature-reservation/data";
import { useCreateReservation } from "@/modules/feature-reservation";
import { useListCateringPackage } from "@/modules/feature-catering-package";
import { cn, formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ReservationOrderModal } from "./reservation-tnc-modal";
import { ReservationCreateModal } from "./reservation-create-modal";

export const ReservationForm = () => {
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [isTncChecked, setIsTncChecked] = useState(false);
    const [modalTnc, setModalTnc] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(false);
    const [formDataToSubmit, setFormDataToSubmit] = useState<CreateReservationDTOType | null>(null);

    const form = useForm<CreateReservationDTOType>({
        resolver: zodResolver(CreateReservationDTO),
        defaultValues: {
            location: "",
            event_date: "",
            notes: "",
            is_use_cart: false,
            packages: [
                {
                    id: undefined,
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "packages",
    });

    const { handleSubmitCreate, isLoading: isLoadingCreate } = useCreateReservation();

    const { data: dataPackage } = useListCateringPackage();

    const addPackage = () => {
        append({ id: 0 });
    };

    const removePackage = (index: number) => {
        if (fields.length > 1) {
            remove(index);
        }
    };

    const getPackageInfo = (id: number | undefined) => {
        if (!id || !dataPackage) return null;
        return dataPackage.find((pkg) => pkg.id === id);
    };

    const prepareSubmission = (formData: CreateReservationDTOType) => {
        setFormDataToSubmit(formData);
        setConfirmationModal(true);
    };

    const finalizeSubmission = () => {
        if (formDataToSubmit) {
            handleSubmitCreate(formDataToSubmit);
            form.reset();
            setConfirmationModal(false);
            setIsTncChecked(false);
        }
    };

    const calculateTotalAmount = () => {
        const packageTotal = form.getValues("packages").reduce((total, pkg) => {
            if (!pkg.id) return total;

            const packageInfo = getPackageInfo(Number(pkg.id));
            const price = packageInfo?.price ? Number(packageInfo.price) : 0;

            return total + price;
        }, 0);

        const cartFee = form.watch("is_use_cart") ? 500000 : 0;

        return packageTotal + cartFee;
    };

    const handleActionTnc = () => {
        setIsTncChecked(!isTncChecked);
        setModalTnc(!modalTnc);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Reservation Details
                </CardTitle>
                <CardDescription>
                    Please provide all the necessary information for your event reservation.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(prepareSubmission)} className="space-y-6">
                        {/* All existing form fields remain unchanged */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="flex items-center gap-2">
                                            <MapPinIcon className="h-4 w-4" />
                                            Event Location
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the event location" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="event_date"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="flex items-center gap-2">
                                            <CalendarIcon className="h-4 w-4" />
                                            Event Date
                                        </FormLabel>
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
                                                            "w-full pl-3 text-left font-normal bg-white hover:bg-white",
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
                                                        if (date) {
                                                            const safeDateObject = new Date(date);
                                                            safeDateObject.setHours(12, 0, 0, 0);
                                                            field.onChange(safeDateObject.toISOString());
                                                        } else {
                                                            field.onChange("");
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
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <FormLabel className="flex items-center gap-2 text-base font-medium">
                                    <PackageIcon className="h-4 w-4" />
                                    Selected Packages
                                </FormLabel>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addPackage}
                                    className="flex items-center gap-2"
                                >
                                    <PlusIcon className="h-4 w-4" />
                                    Add Package
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Package fields remain unchanged */}
                                {fields.map((field, index) => (
                                    <Card key={field.id} className="border-2 border-dashed">
                                        <CardContent>
                                            <div className="flex items-start gap-4">
                                                <div className="flex-1">
                                                    <FormField
                                                        control={form.control}
                                                        name={`packages.${index}.id`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Select
                                                                        onValueChange={(value) =>
                                                                            field.onChange(Number(value))
                                                                        }
                                                                        value={
                                                                            field.value ? field.value.toString() : ""
                                                                        }
                                                                    >
                                                                        <SelectTrigger className="w-full">
                                                                            <SelectValue placeholder="Select catering package" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {dataPackage?.map((pkg) => (
                                                                                <SelectItem
                                                                                    key={pkg.id}
                                                                                    value={pkg.id.toString()}
                                                                                >
                                                                                    {pkg.name} -{" "}
                                                                                    {formatCurrency(pkg.price)}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    {getPackageInfo(form.watch(`packages.${index}.id`)) && (
                                                        <div className="mt-2">
                                                            <Badge variant="secondary" className="mb-1">
                                                                {
                                                                    getPackageInfo(form.watch(`packages.${index}.id`))
                                                                        ?.name
                                                                }
                                                            </Badge>
                                                            <p className="text-sm text-gray-600">
                                                                {
                                                                    getPackageInfo(form.watch(`packages.${index}.id`))
                                                                        ?.description
                                                                }
                                                            </p>
                                                            <p className="text-sm font-medium mt-1">
                                                                {formatCurrency(
                                                                    getPackageInfo(form.watch(`packages.${index}.id`))
                                                                        ?.price || 0,
                                                                )}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                                {fields.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="icon"
                                                        onClick={() => removePackage(index)}
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                            {form.formState.errors.packages?.message && (
                                <p className="text-sm text-destructive">{form.formState.errors.packages.message}</p>
                            )}
                        </div>

                        <FormField
                            control={form.control}
                            name="is_use_cart"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Include Cart</FormLabel>
                                        <FormDescription>
                                            Check this if you want to include the cart in your venue reservation.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Additional Notes</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Any special requirements or additional information..."
                                            className="min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Separator />

                        <div className="flex justify-between items-center text-lg font-semibold">
                            <span>Total Amount</span>
                            <span>{formatCurrency(calculateTotalAmount())}</span>
                        </div>

                        <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4 bg-muted/50">
                            <Checkbox
                                id="tnc"
                                className="bg-white"
                                checked={isTncChecked}
                                onCheckedChange={() => {
                                    if (isTncChecked) {
                                        setIsTncChecked(false);
                                    } else {
                                        setModalTnc(true);
                                    }
                                }}
                            />
                            <div className="space-y-1 leading-none">
                                <label
                                    htmlFor="tnc"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Terms and Conditions
                                </label>
                                <p className="text-sm text-muted-foreground">
                                    I agree to the Terms of Service and Privacy Policy.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button
                                type="submit"
                                size="lg"
                                disabled={isLoadingCreate || form.formState.isSubmitting || !isTncChecked}
                                className="min-w-[150px]"
                            >
                                {isLoadingCreate ? "Creating..." : "Create Reservation"}
                            </Button>
                        </div>
                    </form>
                </Form>

                {/* TNC Modal */}
                <ReservationOrderModal isOpen={modalTnc} onOpenChange={setModalTnc} onAction={handleActionTnc} />

                {/* Confirmation Modal */}
                <ReservationCreateModal
                    isOpen={confirmationModal}
                    onOpenChange={setConfirmationModal}
                    onConfirm={finalizeSubmission}
                    formData={formDataToSubmit}
                    totalAmount={calculateTotalAmount()}
                    getPackageInfo={getPackageInfo}
                    isLoading={isLoadingCreate}
                />
            </CardContent>
        </Card>
    );
};
