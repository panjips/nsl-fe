import React from "react";
import { useLocation } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const SiteHeader = React.memo(function SiteHeader() {
    const location = useLocation();
    const currentPath = location.pathname;

    const pathSegments = currentPath.split("/").filter((segment) => segment !== "");

    return (
        <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {pathSegments.map((segment, index) => {
                            const isLast = index === pathSegments.length - 1;
                            const href = `/${pathSegments.slice(0, index + 1).join("/")}`;

                            return (
                                <React.Fragment key={href}>
                                    <BreadcrumbItem>
                                        {isLast ? (
                                            <BreadcrumbPage>{formatBreadcrumb(segment)}</BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink href={href}>{formatBreadcrumb(segment)}</BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                    {!isLast && <BreadcrumbSeparator />}
                                </React.Fragment>
                            );
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
});

function formatBreadcrumb(segment: string): string {
    return segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
