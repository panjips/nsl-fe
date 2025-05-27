import { useForm } from "react-hook-form";
import { CreateProductDTO, type CreateProductDTOType } from "../data";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useCategoryStore } from "@/modules/feature-category";
import { useCreateProduct } from "./use-create-product";
import { useProductStore } from "../stores";
import { convertUrlToFile } from "@/lib/utils";
import { useEditProduct } from "./use-edit-product";

export const useFormProduct = () => {
  const { handleCreateProduct, isLoading: isLoadingCreate } =
    useCreateProduct();
  const { handleUpdateProduct, isLoading: isLoadingEdit } = useEditProduct();
  const { categories, resetCategoriesState } = useCategoryStore();
  const { getProduct } = useProductStore();
  const formData = new FormData();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const id =
    getProduct.state.state === "success"
      ? getProduct.state.data.data?.id
      : null;

  useEffect(() => {
    const setupEditForm = async () => {
      if (id && getProduct.state.state === "success") {
        const product = getProduct.state.data.data;

        let imageFile: File | undefined;
        if (product?.image_url) {
          imageFile = await convertUrlToFile(product.image_url);
          setImageFile(imageFile || null);
          setImagePreview(product.image_url);
        }

        form.reset({
          name: product?.name,
          category_id: Number(product?.category_id),
          description: product?.description,
          cost: Number(product?.cost),
          price: Number(product?.price),
          image: imageFile || undefined,
        });
      }
    };

    setupEditForm();
  }, [id, getProduct.state.state, categories.state.state]);

  useEffect(() => {
    categories.getAllCategories();

    return () => {
      resetCategoriesState();
    };
  }, []);

  const listCategory = useMemo(() => {
    if (categories.state.state === "success") {
      return categories.state.data;
    }
  }, [categories.state.state]);

  const form = useForm<CreateProductDTOType>({
    resolver: zodResolver(CreateProductDTO),
    defaultValues: {
      name: "",
      category_id: undefined,
      description: "",
      cost: undefined,
      price: undefined,
      image: undefined,
    },
  });

  const handleSubmit = async (data: CreateProductDTOType) => {
    try {
      formData.append("name", data.name);
      formData.append("category_id", data.category_id?.toString() || "");
      formData.append("cost", data.cost.toString());
      formData.append("price", data.price.toString());
      formData.append("description", data.description || "");

      if (imageFile) {
        formData.append("image", imageFile);
      }

      console.log("Form Data:", Object.fromEntries(formData));
      if (id) {
        await handleUpdateProduct(id, formData);
      } else {
        await handleCreateProduct(formData);
      }
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  const handleImageChange = (value: string | null, file?: File | null) => {
    setImagePreview(value);
    setImageFile(file || null);
  };

  return {
    id,
    form,
    isLoadingCreate,
    isLoadingEdit,
    handleSubmit,
    imageFile,
    imagePreview,
    listCategory,
    handleImageChange,
  };
};
