import { Modal } from "@/components/modal";
import { useEditCateringPackage, useCreateCateringPackage } from "../hooks";
import { useForm } from "react-hook-form";
import { CreateCateringPackageDTO, type CreateCateringPackageDTOType } from "../data";
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
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export const CateringPackageMutationModal = ({
  id,
}: {
  id: number | string | undefined;
}) => {
  const isEdit = !!id;

  const forms = useForm<CreateCateringPackageDTOType>({
    resolver: zodResolver(CreateCateringPackageDTO),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      free_cup: 0,
      size_unit: "",
      size_volume: 0,
      quantity_cup: 0,
    },
  });

  const {
    isOpen: isOpenCreate,
    handleSubmitCreate,
    isLoading: isLoadingCreate,
    onOpenChange: onOpenChangeCreate,
  } = useCreateCateringPackage();

  const {
    isOpen: isOpenEdit,
    data,
    handleSubmitEdit,
    isLoading: isLoadingEdit,
    onOpenChange: onOpenChangeEdit,
  } = useEditCateringPackage();

  const onOpenChange = isEdit ? onOpenChangeEdit : onOpenChangeCreate;

  useEffect(() => {
    if (isEdit && data) {
      forms.reset({
        name: data.name || "",
        description: data.description || "",
        price: Number(data.price || 0),
        free_cup: Number(data.free_cup || 0),
        size_unit: data.size_unit || "",
        size_volume: Number(data.size_volume || 0),
        quantity_cup: Number(data.quantity_cup || 0),
      });
    } else if (!isEdit && isOpenCreate) {
      forms.reset({
        name: "",
        description: "",
        price: 0,
        free_cup: 0,
        size_unit: "",
        size_volume: 0,
        quantity_cup: 0,
      });
    }
  }, [data, isEdit, forms, isOpenCreate]);

  return (
    <Modal
      open={isOpenEdit || isOpenCreate}
      onOpenChange={onOpenChange}
      title={isEdit ? "Edit Catering Package" : "Create Catering Package"}
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
                  <Input
                    type="text"
                    placeholder="Package Name"
                    {...field}
                    className="input"
                  />
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
                    placeholder="Package Description"
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      prefix={<span>Rp.</span>}
                      placeholder="Price"
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
          
            <FormField
              control={forms.control}
              name="free_cup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Free Cup</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Free Cup"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
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
          
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={forms.control}
              name="size_unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size Unit</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g., ml, L"
                      {...field}
                      className="input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={forms.control}
              name="size_volume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size Volume</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Volume"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
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
              name="quantity_cup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity Cup</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Quantity"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
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
