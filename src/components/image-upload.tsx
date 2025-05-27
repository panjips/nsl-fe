import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UseFormSetError } from "react-hook-form";

interface ImageUploadProps {
  value: string | null;
  onChange: (value: string | null, file?: File | null) => void; // Modified to include File
  className?: string;
  title?: string;
  description?: string;
  setError?: UseFormSetError<any>;
}

export function ImageUpload({
  value,
  onChange,
  className,
  title = "Product Image (optional)",
  description = "JPG/JPEG or PNG. 1200px x 800px (3:2 ratio) recommended size. Max size of 1MB.",
  setError,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const validateImage = useCallback(
    async (file: File): Promise<string | null> => {
      if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
        return "Only .jpg, .jpeg, and .png formats are supported";
      }

      if (file.size > 1024 * 1024) {
        return "Image size should not exceed 1MB";
      }

      return new Promise((resolve) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
          URL.revokeObjectURL(img.src);
          resolve(null);
        };

        img.onerror = () => {
          resolve("Failed to load image");
        };
      });
    },
    []
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileUpload = useCallback(
    async (file: File) => {
      const error = await validateImage(file);

      if (error) {
        if (setError) {
          setError("image", {
            type: "manual",
            message: error,
          });
        }
        return;
      }

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          onChange(reader.result as string, file);
        };
        reader.readAsDataURL(file);
      }
    },
    [onChange, setError, validateImage]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileUpload(e.dataTransfer.files[0]);
      }
    },
    [handleFileUpload]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        handleFileUpload(e.target.files[0]);
      }
    },
    [handleFileUpload]
  );

  const handleRemove = useCallback(() => {
    onChange(null, null);
  }, [onChange]);

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "flex flex-col sm:flex-row gap-6 items-center",
          className
        )}
      >
        <div
          className={cn(
            "relative w-full sm:w-[240px] aspect-[3/2] overflow-hidden rounded-md border bg-background",
            isDragging && "border-primary bg-primary/10"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {value ? (
            <img
              src={value}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted/20">
              <ImageIcon
                className={cn(
                  "h-10 w-10 text-muted-foreground",
                  isDragging && "text-primary"
                )}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-3">
          <div>
            <h3 className="text-sm font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <label className="cursor-pointer">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-sm font-medium bg-card"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                {value ? "Change image" : "Upload image"}
              </Button>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleChange}
              />
            </label>

            {value && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRemove}
                className="text-sm font-medium text-destructive bg-card"
              >
                Remove
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
