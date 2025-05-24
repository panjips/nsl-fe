import { Modal } from "@/components/modal";
import { useEditCategory, useCreateCategory } from "../hooks";
import { useForm } from "react-hook-form";
import { CreateCategoryDTO, type CreateCategoryDTOType } from "../data";
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

export const CategoryMutationModal = ({
  id,
}: {
  id: number | string | undefined;
}) => {
  const isEdit = !!id;

  const forms = useForm<CreateCategoryDTOType>({
    resolver: zodResolver(CreateCategoryDTO),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const {
    isOpen: isOpenCreate,
    handleSubmitCreate,
    isLoading: isLoadingCreate,
  } = useCreateCategory();
  const {
    isOpen: isOpenEdit,
    onOpenChange,
    data,
    handleSubmitEdit,
    isLoading: isLoadingEdit,
  } = useEditCategory();

  useEffect(() => {
    if (isEdit && data) {
      forms.reset({
        name: data.name || "",
        description: data.description || "",
      });
    }
  }, [data, isEdit, forms]);

  return (
    <Modal
      open={isOpenEdit || isOpenCreate}
      onOpenChange={onOpenChange}
      title={isEdit ? "Edit Category" : "Create Category"}
      size="md"
      actionText={isEdit ? "Save Change" : "Create"}
      actionVariant="default"
    >
      <Form {...forms}>
        <form
          onSubmit={forms.handleSubmit((data) => {
            if (isEdit) {
              return handleSubmitEdit({ ...data, id: Number(id) });
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
                    placeholder="Category Name"
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
                    style={{ minHeight: "120px" }}
                    placeholder="Optional Category Description"
                    {...field}
                    className="input"
                  />
                </FormControl>
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
                  ? "Loading..."
                  : "Save Change"
                : isLoadingCreate
                  ? "Loading..."
                  : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </Modal>
  );
};
