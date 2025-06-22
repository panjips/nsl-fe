import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useGlobalAuthStore } from "@/stores";

export const NotFound = () => {
    const isAuthenticated = useGlobalAuthStore.getState().isAuthenticated;

    return (
        <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-8">
                <div className="space-y-4">
                    <h1 className="text-6xl font-bold text-gray-800">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-700">Not Found</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Oops! It looks like the page you are looking for does not exist. Please contact your
                        administrator or try again later.
                    </p>
                </div>

                <div className="space-y-4">
                    <Link to={isAuthenticated ? "/dashboard" : "/login"}>
                        <Button className="text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Go Back
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
