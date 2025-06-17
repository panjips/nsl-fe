import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ProductSearchBarProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}

export function ProductSearchBar({ searchTerm, setSearchTerm }: ProductSearchBarProps) {
    return (
        <div className="my-4 md:my-8 max-w-2xl mx-auto">
            <div className="relative group">
                <Search
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 
                    transition-colors group-hover:text-primary"
                />
                <Input
                    type="text"
                    placeholder="Search coffee, tea, or drinks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 h-14 text-lg rounded-lg border-2 
                    hover:border-primary/50 focus:border-primary transition-colors
                    bg-card shadow-sm hover:shadow-md"
                />
            </div>
        </div>
    );
}
