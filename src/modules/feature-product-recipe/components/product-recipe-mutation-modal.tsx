import { Modal } from "@/components/modal";
import { useEditProductRecipe } from "../hooks/use-edit-product-recipe";
import { useCreateProductRecipe } from "../hooks/use-create-product-recipe";
import { useForm, useFieldArray } from "react-hook-form";
import {
  BulkCreateProductRecipeDTO,
  type BulkCreateProductRecipeDTOType,
} from "../data/product-recipe-dto";
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
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus } from "lucide-react";
import { useInventoryStore } from "@/modules/feature-inventory";
import { useProductStore } from "@/modules/feature-product";
import { Separator } from "@/components/ui/separator";

export const ProductRecipeMutationModal = ({
  productId,
}: {
  productId: number | string | undefined;
}) => {
  const isEdit = !!productId;
  const [selectedInventories, setSelectedInventories] = useState<
    Record<number, any>
  >({});

  const { inventories, resetInventoriesState } = useInventoryStore();
  const { products, resetProductsState } = useProductStore();

  useEffect(() => {
    inventories.getAllInventories();
    if (!isEdit) {
      products.getProducts();
    }

    return () => {
      resetInventoriesState();
      if (!isEdit) {
        resetProductsState();
      }
    };
  }, [productId]);

  const listInventory = useMemo(() => {
    if (inventories.state.state === "success") {
      return inventories.state.data;
    }
    return [];
  }, [inventories.state.state, productId]);

  const listProduct = useMemo(() => {
    if (products.state.state === "success") {
      return products.state.data;
    }
    return [];
  }, [products.state.state]);

  const form = useForm<BulkCreateProductRecipeDTOType>({
    resolver: zodResolver(BulkCreateProductRecipeDTO),
    defaultValues: {
      product_id: productId ? Number(productId) : 0,
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
    productId: createProductId,
  } = useCreateProductRecipe();

  const {
    isOpen: isOpenEdit,
    onOpenChange,
    data,
    handleSubmitEdit,
    isLoading: isLoadingEdit,
  } = useEditProductRecipe();

  const isOpen = isOpenCreate || isOpenEdit;
  const isLoading = isLoadingCreate || isLoadingEdit;

  useEffect(() => {
    if (isEdit && data) {
      form.setValue("product_id", Number(data.id));

      if (data.recipes && data.recipes.length > 0) {
        form.setValue(
          "recipes",
          data.recipes.map((recipe) => ({
            inventory_id: recipe.inventory_id,
            quantity_used: recipe.quantity_used,
          }))
        );

        const newSelectedInventories: Record<number, any> = {};
        data.recipes.forEach((recipe, index) => {
          const inventory = listInventory.find(
            (inv) => inv.id === recipe.inventory_id
          );
          if (inventory) {
            newSelectedInventories[index] = inventory;
          }
        });
        setSelectedInventories(newSelectedInventories);
      }
    }
  }, [data, isEdit, form, createProductId]);

  const onSubmit = async (values: BulkCreateProductRecipeDTOType) => {
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
      if (!isEdit) {
        resetProductsState();
      }
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
      title={isEdit ? "Edit Product Recipe" : "Add Product Recipe"}
      open={isOpen}
      onOpenChange={onOpenChangeHandler}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="product_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product</FormLabel>
                  <div className="flex items-center gap-4 w-full">
                    <div className="flex-1">
                      {isEdit ? (
                        <Select value={field.value?.toString()} disabled={true}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue>
                                {listProduct.find(
                                  (product) =>
                                    Number(product.id) === field.value
                                )?.name ||
                                  data?.name ||
                                  "Selected Addon"}
                              </SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={field.value?.toString() || "0"}>
                              {listProduct.find(
                                (product) => Number(product.id) === field.value
                              )?.name ||
                                data?.name ||
                                "Selected Addon"}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          value={field.value ? field.value.toString() : ""}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select product item" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="w-full">
                            {listProduct.map((product) => (
                              <SelectItem
                                className="w-full"
                                key={product.id}
                                value={product.id.toString()}
                              >
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                    <Button
                      type="button"
                      onClick={addRecipe}
                      className="flex items-center gap-1"
                    >
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
                                <span>
                                  {selectedInventories[index]?.unit ?? null}
                                </span>
                              }
                              step="0.01"
                              placeholder="Enter quantity"
                              className="w-full"
                              {...form.register(
                                `recipes.${index}.quantity_used`,
                                {
                                  setValueAs: (v) => (v === "" ? 0 : Number(v)),
                                }
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant={"destructive"}
                      onClick={() => remove(index)}
                    >
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
              onClick={() =>
                onOpenChangeHandler ? onOpenChangeHandler(false) : {}
              }
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
