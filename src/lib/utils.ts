import { useLocation } from "@tanstack/react-router";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getInitials(name: string) {
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
}

export function formatCurrency(value: string | number, currency = "IDR") {
    const numberValue = typeof value === "string" ? Number.parseFloat(value) : value;
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency,
    }).format(numberValue);
}

export async function convertUrlToFile(url: string): Promise<File | undefined> {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const fileName = url.split("/").pop() || "image.jpg";
        return new File([blob], fileName, { type: blob.type });
    } catch (error) {
        console.error("Error converting URL to File:", error);
        return undefined;
    }
}

export function useLastCurrentLocation() {
    const location = useLocation();

    const pathname = location.pathname.split("/");
    const currentLocation = pathname[pathname.length - 1];

    return currentLocation;
}
